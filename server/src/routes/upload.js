import express from 'express';
import { upload, uploadImage } from '../controllers/uploadController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// POST /api/upload - Upload an image (requires authentication)
router.post('/', authMiddleware, upload.single('image'), uploadImage);

export default router;
