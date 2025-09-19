import React from 'react';
import { Link } from 'react-router-dom';

// Simplified interface for Article
interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  comments: Array<{
    id: number;
    article_id: number;
    author_name: string;
    content: string;
    created_at: string;
    updated_at: string;
  }>;
}

interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getPreview = (content: string, maxLength: number = 150) => {
    try {
      if (!content) return '';
      if (content.length <= maxLength) return content;
      return content.substring(0, maxLength) + '...';
    } catch (error) {
      return '';
    }
  };

  return (
    <div className="article-list">
      {articles.map((article) => {
        return (
          <div key={article.id} className="article-card">
            <h2 className="article-title">
              <Link to={`/article/${article.id}`}>{article.title || 'Untitled'}</Link>
            </h2>
            <p className="article-date">
              Published on {formatDate(article.created_at || new Date().toISOString())}
            </p>
            <p className="article-preview">
              {getPreview(article.content || '')}
            </p>
            <div className="article-meta">
              <span className="comment-count">
                {Array.isArray(article.comments) ? article.comments.length : 0} comment{Array.isArray(article.comments) && article.comments.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleList;