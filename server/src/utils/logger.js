import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log directory
const logDir = path.join(__dirname, '../../logs');

// Define log format
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

// Console format for development
const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        let msg = `${timestamp} [${level}]: ${message}`;
        if (Object.keys(meta).length > 0) {
            msg += ` ${JSON.stringify(meta)}`;
        }
        return msg;
    })
);

// Create the logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    defaultMeta: { service: 'ai-station-backend' },
    transports: [
        // Error log - only errors
        new DailyRotateFile({
            filename: path.join(logDir, 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            maxSize: '20m',
            maxFiles: '30d',
            zippedArchive: true
        }),

        // Combined log - all logs
        new DailyRotateFile({
            filename: path.join(logDir, 'combined-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '30d',
            zippedArchive: true
        }),

        // API log - specific for API requests
        new DailyRotateFile({
            filename: path.join(logDir, 'api-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            level: 'info',
            maxSize: '20m',
            maxFiles: '14d',
            zippedArchive: true,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
});

// Add console transport in development
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: consoleFormat
    }));
}

// Helper functions for structured logging
export const logInfo = (message, meta = {}) => {
    logger.info(message, meta);
};

export const logError = (message, error = null, meta = {}) => {
    const errorMeta = error ? {
        error: {
            message: error.message,
            stack: error.stack,
            ...error
        },
        ...meta
    } : meta;

    logger.error(message, errorMeta);
};

export const logWarn = (message, meta = {}) => {
    logger.warn(message, meta);
};

export const logDebug = (message, meta = {}) => {
    logger.debug(message, meta);
};

// API-specific logging
export const logApiRequest = (req, meta = {}) => {
    logger.info('API Request', {
        requestId: req.id,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('user-agent'),
        userId: req.user?.id || null,
        ...meta
    });
};

export const logApiResponse = (req, res, duration, meta = {}) => {
    logger.info('API Response', {
        requestId: req.id,
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        userId: req.user?.id || null,
        ...meta
    });
};

// Authentication logging
export const logAuthSuccess = (email, userId, ip) => {
    logger.info('Authentication Success', {
        event: 'AUTH_SUCCESS',
        email,
        userId,
        ip
    });
};

export const logAuthFailure = (email, reason, ip) => {
    logger.warn('Authentication Failed', {
        event: 'AUTH_FAILURE',
        email,
        reason,
        ip
    });
};

export const logAuthLogout = (userId, email) => {
    logger.info('User Logout', {
        event: 'AUTH_LOGOUT',
        userId,
        email
    });
};

// CRUD operation logging
export const logCreate = (resource, data, userId) => {
    logger.info(`${resource} Created`, {
        event: 'CREATE',
        resource,
        resourceId: data.id,
        userId,
        data: sanitizeLogData(data)
    });
};

export const logUpdate = (resource, resourceId, changes, userId) => {
    logger.info(`${resource} Updated`, {
        event: 'UPDATE',
        resource,
        resourceId,
        userId,
        changes: sanitizeLogData(changes)
    });
};

export const logDelete = (resource, resourceId, userId) => {
    logger.info(`${resource} Deleted`, {
        event: 'DELETE',
        resource,
        resourceId,
        userId
    });
};

// Sanitize sensitive data from logs
const sanitizeLogData = (data) => {
    const sanitized = { ...data };
    const sensitiveFields = ['password', 'token', 'accessToken', 'refreshToken', 'apiKey', 'secret'];

    sensitiveFields.forEach(field => {
        if (sanitized[field]) {
            sanitized[field] = '[REDACTED]';
        }
    });

    return sanitized;
};

export default logger;
