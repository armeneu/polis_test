import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useLocation,
} from "react-router-dom";
import { Article } from "./types";
import { articleApi } from "./api";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import ArticleForm from "./components/ArticleForm";
import "../css/react-app.css";

function App() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const location = useLocation();

    const fetchArticles = async () => {
        try {
            setLoading(true);
            setError(null);
            const articlesData = await articleApi.getAll();
            // Validate data structure
            if (!Array.isArray(articlesData)) {
                throw new Error("Invalid data structure received from API");
            }
            setArticles(articlesData);
        } catch (err) {
            const errorMsg = "Failed to load articles";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    useEffect(() => {
        if (location.state?.refresh) {
            fetchArticles();
            if (location.state?.message) {
                setSuccessMessage(location.state.message);
                // Clear message after 3 seconds
                setTimeout(() => setSuccessMessage(null), 3000);
            }
            // Clear the refresh state
            // @ts-ignore
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        <div className="App">
            <header className="app-header">
                <div className="container">
                    <h1 className="app-title">
                        <Link to="/">Simple Blog</Link>
                    </h1>
                    <nav className="app-nav">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                        <Link to="/new-article" className="nav-link">
                            New Article
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="app-main">
                <div className="container">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    {loading && (
                                        <div className="loading">
                                            Loading articles...
                                        </div>
                                    )}
                                    {error && (
                                        <div className="error">
                                            {error}
                                            <button
                                                onClick={fetchArticles}
                                                style={{
                                                    marginLeft: "10px",
                                                    padding: "5px 10px",
                                                }}
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    )}
                                    {successMessage && (
                                        <div className="success-message">
                                            {successMessage}
                                        </div>
                                    )}
                                    {!loading &&
                                        !error &&
                                        articles.length === 0 && (
                                            <div className="loading">
                                                No articles found.
                                            </div>
                                        )}
                                    {!loading &&
                                        !error &&
                                        articles.length > 0 && (
                                            <ArticleList
                                                articles={articles}
                                            />
                                        )}
                                </>
                            }
                        />
                        <Route
                            path="/article/:id"
                            element={<ArticleDetail />}
                        />
                        <Route
                            path="/new-article"
                            element={<ArticleForm />}
                        />
                    </Routes>
                </div>
            </main>
        </div>
    );
}

// Simplified root component
const AppWrapper = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

const container = document.getElementById("root");

if (container) {
    try {
        const root = createRoot(container);
        root.render(<AppWrapper />);
    } catch (error) {
        container.innerHTML = `
            <div style="padding: 20px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; font-family: sans-serif;">
                <h2 style="margin: 0 0 10px 0;">React App Failed to Load</h2>
                <p style="margin: 0 0 10px 0;"><strong>Error:</strong> ${error instanceof Error ? error.message : 'Unknown error'}</p>
                <p style="margin: 0 0 15px 0;">Please check the browser console for details.</p>
                <button onclick="window.location.reload()" style="background: #007bff; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                    Reload Page
                </button>
            </div>
        `;
    }
} else {
    // Create root container if it doesn't exist
    const newContainer = document.createElement("div");
    newContainer.id = "root";
    document.body.appendChild(newContainer);
    const root = createRoot(newContainer);
    root.render(
        <div
            style={{
                padding: "20px",
                color: "#856404",
                backgroundColor: "#fff3cd",
                border: "1px solid #ffeeba",
                borderRadius: "4px",
                fontFamily: "sans-serif",
            }}
        >
            <h2 style={{ margin: "0 0 10px 0" }}>
                Root container was missing
            </h2>
            <p style={{ margin: 0 }}>
                Created root container dynamically.
            </p>
        </div>
    );
}