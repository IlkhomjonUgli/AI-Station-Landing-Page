// API Configuration - Environment-aware base URL
// Automatically uses the correct backend URL for dev/production

const getAPIBaseURL = () => {
    // Check if we're in development or production
    if (import.meta.env.MODE === 'production') {
        // Production: use environment variable or fallback to same origin
        return import.meta.env.VITE_API_URL || window.location.origin;
    }

    // Development: use localhost backend
    return import.meta.env.VITE_API_URL || 'http://localhost:5001';
};

export const API_BASE_URL = getAPIBaseURL();

// API Endpoints - centralized and relative
export const API_ENDPOINTS = {
    // Auth
    login: '/api/auth/login',

    // Posts
    posts: '/api/posts',
    postById: (id) => `/api/posts/${id}`,

    // Services
    services: '/api/services',
    servicesAll: '/api/services/all',
    serviceById: (id) => `/api/services/${id}`,

    // Team
    team: '/api/team',
    teamById: (id) => `/api/team/${id}`,

    // Programs
    programs: '/api/programs',
    programsAll: '/api/programs/all',
    programById: (id) => `/api/programs/${id}`,

    // Portfolio
    portfolio: '/api/portfolio',
    portfolioAll: '/api/portfolio/all',
    portfolioById: (id) => `/api/portfolio/${id}`,

    // Analytics
    analyticsTrack: '/api/analytics/track',
    analyticsDashboard: '/api/analytics/dashboard',
    analyticsTrends: '/api/analytics/trends',
    analyticsSources: '/api/analytics/sources',
    analyticsPages: '/api/analytics/pages',
    analyticsRealtime: '/api/analytics/realtime',
    analyticsCampaigns: '/api/analytics/campaigns',

    // Upload
    uploadImage: '/api/upload/image'
};

// Helper function to build full URL
export const buildURL = (endpoint) => {
    return `${API_BASE_URL}${endpoint}`;
};

// Helper function for API calls with error handling
export const apiCall = async (endpoint, options = {}) => {
    const url = buildURL(endpoint);

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        return response;
    } catch (error) {
        console.error(`API call failed for ${endpoint}:`, error);
        throw error;
    }
};

export default {
    API_BASE_URL,
    API_ENDPOINTS,
    buildURL,
    apiCall
};
