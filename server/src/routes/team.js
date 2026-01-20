import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
    getAllTeamMembers,
    getTeamMember,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember
} from '../controllers/teamController.js';

const router = express.Router();

// Public routes
router.get('/', getAllTeamMembers);
router.get('/:id', getTeamMember);

// Protected routes (require authentication)
router.post('/', authMiddleware, createTeamMember);
router.put('/:id', authMiddleware, updateTeamMember);
router.delete('/:id', authMiddleware, deleteTeamMember);

export default router;
