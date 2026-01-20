import { API_BASE_URL } from '../../config/api';

const API_BASE_URL_ADMIN = `${API_BASE_URL}/api`;

class ApiClient {
    constructor() {
        this.token = localStorage.getItem('admin_token');
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('admin_token', token);
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem('admin_token');
    }

    async request(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`;
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }

        return data;
    }

    // Auth endpoints
    async login(email, password) {
        const data = await this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        this.setToken(data.data.token);
        return data;
    }

    async getMe() {
        return this.request('/api/auth/me');
    }

    // Posts endpoints
    async getPosts(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return this.request(`/api/posts?${queryString}`);
    }

    async getPost(id) {
        return this.request(`/api/posts/${id}`);
    }

    async createPost(postData) {
        return this.request('/api/posts', {
            method: 'POST',
            body: JSON.stringify(postData)
        });
    }

    async updatePost(id, postData) {
        return this.request(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(postData)
        });
    }

    async deletePost(id) {
        return this.request(`/api/posts/${id}`, {
            method: 'DELETE'
        });
    }

    async publishPost(id) {
        return this.request(`/api/posts/${id}/publish`, {
            method: 'PATCH'
        });
    }

    async unpublishPost(id) {
        return this.request(`/api/posts/${id}/unpublish`, {
            method: 'PATCH'
        });
    }
}

export default new ApiClient();
