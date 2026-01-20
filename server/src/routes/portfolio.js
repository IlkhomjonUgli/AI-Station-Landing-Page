import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    getPortfolios,
    getAllPortfolios,
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio
} from '../controllers/portfolioController.js';

const router = express.Router();

// Public routes
router.get('/', getPortfolios);

// Protected admin routes
router.get('/all', authMiddleware, getAllPortfolios);
router.get('/:id', authMiddleware, getPortfolio);
router.post('/', authMiddleware, createPortfolio);
router.put('/:id', authMiddleware, updatePortfolio);
router.delete('/:id', authMiddleware, deletePortfolio);

export default router;
