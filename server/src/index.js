import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import uploadRoutes from './routes/upload.js';
import teamRoutes from './routes/team.js';
import analyticsRoutes from './routes/analytics.js';
import serviceRoutes from './routes/services.js';
import programRoutes from './routes/programs.js';
import portfolioRoutes from './routes/portfolio.js';
import sitemapRoutes from './routes/sitemap.js';
import { errorHandler } from './middleware/errorHandler.js';
import logger, { logInfo } from './utils/logger.js';
import requestLogger from './middleware/requestLogger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api', sitemapRoutes); // Sitemap at /api/sitemap.xml

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    // Log the error with full context
    logger.error('Unhandled Error', {
        requestId: req.id,
        error: {
            message: err.message,
            stack: err.stack,
            name: err.name
        },
        request: {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            userId: req.user?.id || null
        }
    });

    // Send error response
    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
});

// Start server
app.listen(PORT, () => {
    logInfo(`Server running on port ${PORT}`, { port: PORT, env: process.env.NODE_ENV || 'development' });
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});
