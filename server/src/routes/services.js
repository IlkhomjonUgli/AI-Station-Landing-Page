import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    getServices,
    getAllServices,
    getService,
    createService,
    updateService,
    deleteService
} from '../controllers/serviceController.js';

const router = express.Router();

// Public routes
router.get('/', getServices);

// Protected admin routes
router.get('/all', authMiddleware, getAllServices);
router.get('/:id', authMiddleware, getService);
router.post('/', authMiddleware, createService);
router.put('/:id', authMiddleware, updateService);
router.delete('/:id', authMiddleware, deleteService);

export default router;
