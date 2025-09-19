import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { articleApi } from "../api";

const ArticleForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.content.trim()) {
            alert("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const newArticle = await articleApi.create(formData);
            navigate("/", {
                state: {
                    refresh: true,
                    message: "Article created successfully!",
                },
            });
        } catch (err) {
            const errorMsg = "Failed to create article";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="article-form">
            <h1>Create New Article</h1>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter article title"
                        className="form-input"
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Write your article content here..."
                        rows={8}
                        className="form-textarea"
                        disabled={loading}
                    />
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="cancel-button"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Create Article"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ArticleForm;