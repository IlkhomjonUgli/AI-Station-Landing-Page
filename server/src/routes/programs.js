import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    getPrograms,
    getAllPrograms,
    getProgram,
    createProgram,
    updateProgram,
    deleteProgram
} from '../controllers/programController.js';

const router = express.Router();

// Public routes
router.get('/', getPrograms);

// Protected admin routes
router.get('/all', authMiddleware, getAllPrograms);
router.get('/:id', authMiddleware, getProgram);
router.post('/', authMiddleware, createProgram);
router.put('/:id', authMiddleware, updateProgram);
router.delete('/:id', authMiddleware, deleteProgram);

export default router;
