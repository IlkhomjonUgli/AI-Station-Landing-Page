import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    trackPageView,
    getDashboardStats,
    getVisitorTrends,
    getTrafficSources,
    getPopularPages,
    getRealTimeUsers,
    getCampaignPerformance
} from '../controllers/analyticsController.js';

const router = express.Router();

// Public tracking endpoint
router.post('/track', trackPageView);

// Protected admin endpoints
router.get('/dashboard', authMiddleware, getDashboardStats);
router.get('/trends', authMiddleware, getVisitorTrends);
router.get('/sources', authMiddleware, getTrafficSources);
router.get('/pages', authMiddleware, getPopularPages);
router.get('/realtime', authMiddleware, getRealTimeUsers);
router.get('/campaigns', authMiddleware, getCampaignPerformance);

export default router;
