import axios from "axios";
import { Article, Comment } from "./types";

const API_BASE_URL = "/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export const articleApi = {
    // Get all articles
    getAll: async (): Promise<Article[]> => {
        const response = await api.get("/articles");
        return response.data;
    },

    // Get single article by ID
    getById: async (id: number): Promise<Article> => {
        const response = await api.get(`/articles/${id}`);
        return response.data;
    },

    // Create new article
    create: async (article: {
        title: string;
        content: string;
    }): Promise<Article> => {
        const response = await api.post("/articles", article);
        return response.data;
    },
};

export const commentApi = {
    // Add comment to article
    addComment: async (
        articleId: number,
        comment: { author_name: string; content: string },
    ): Promise<Comment> => {
        const response = await api.post(
            `/articles/${articleId}/comments`,
            comment,
        );
        return response.data;
    },
};

export default api;