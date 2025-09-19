import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { articleApi, commentApi } from "../api";

// Simplified interfaces
interface Comment {
  id: number;
  article_id: number;
  author_name: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  comments: Comment[];
}

const ArticleDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [commentForm, setCommentForm] = useState({
        author_name: "",
        content: "",
    });

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                if (!id) {
                    throw new Error("No article ID provided");
                }
                
                const articleId = Number(id);
                if (isNaN(articleId)) {
                    throw new Error("Invalid article ID");
                }
                
                const articleData = await articleApi.getById(articleId);
                setArticle(articleData);
            } catch (err) {
                const errorMsg = "Failed to load article";
                setError(errorMsg);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentForm.author_name.trim() || !commentForm.content.trim()) {
            alert("Please fill in all fields");
            return;
        }

        if (!id) {
            alert("Article ID is missing");
            return;
        }

        try {
            const articleId = Number(id);
            if (isNaN(articleId)) {
                throw new Error("Invalid article ID");
            }
            
            const newComment = await commentApi.addComment(
                articleId,
                commentForm,
            );
            setArticle((prev) =>
                prev
                    ? {
                          ...prev,
                          comments: [...prev.comments, newComment],
                      }
                    : null,
            );
            setCommentForm({ author_name: "", content: "" });
        } catch (err) {
            alert("Failed to add comment");
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch (error) {
            return "Invalid Date";
        }
    };

    if (loading) return <div className="loading">Loading article...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!article) return <div className="error">Article not found</div>;

    return (
        <div className="article-detail">
            <Link to="/" className="back-link">
                ← Back to Articles
            </Link>

            <article className="article">
                <h1 className="article-title">{article.title}</h1>
                <p className="article-date">
                    Published on {formatDate(article.created_at)}
                </p>
                <div className="article-content">{article.content}</div>
            </article>

            <section className="comments-section">
                <h2 className="comments-title">
                    Comments ({Array.isArray(article.comments) ? article.comments.length : 0})
                </h2>

                <form onSubmit={handleCommentSubmit} className="comment-form">
                    <h3>Add a Comment</h3>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={commentForm.author_name}
                            onChange={(e) =>
                                setCommentForm((prev) => ({
                                    ...prev,
                                    author_name: e.target.value,
                                }))
                            }
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            placeholder="Your Comment"
                            value={commentForm.content}
                            onChange={(e) =>
                                setCommentForm((prev) => ({
                                    ...prev,
                                    content: e.target.value,
                                }))
                            }
                            rows={4}
                            className="form-textarea"
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Add Comment
                    </button>
                </form>

                <div className="comments-list">
                    {Array.isArray(article.comments) && article.comments.map((comment) => (
                        <div key={comment.id} className="comment">
                            <div className="comment-header">
                                <strong className="comment-author">
                                    {comment.author_name}
                                </strong>
                                <span className="comment-date">
                                    {formatDate(comment.created_at)}
                                </span>
                            </div>
                            <p className="comment-content">{comment.content}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ArticleDetail;