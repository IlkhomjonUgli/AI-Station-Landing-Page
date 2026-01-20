import { v4 as uuidv4 } from 'uuid';
import { logApiRequest, logApiResponse } from '../utils/logger.js';

// Request logging middleware
export const requestLogger = (req, res, next) => {
    // Add unique request ID
    req.id = uuidv4();

    // Track request start time
    const startTime = Date.now();

    // Log incoming request
    logApiRequest(req);

    // Capture the original end function
    const originalEnd = res.end;

    // Override res.end to log response
    res.end = function (...args) {
        // Calculate duration
        const duration = Date.now() - startTime;

        // Log response
        logApiResponse(req, res, duration);

        // Call original end function
        originalEnd.apply(res, args);
    };

    next();
};

export default requestLogger;
