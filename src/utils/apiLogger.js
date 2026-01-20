import logger from './logger';

// API Logger - wraps fetch to add logging
class ApiLogger {
    // Log API request
    logRequest(method, url, options = {}) {
        const sanitizedBody = options.body ? this.sanitizeBody(JSON.parse(options.body)) : null;

        logger.debug(`API Request: ${method} ${url}`, {
            method,
            url,
            headers: this.sanitizeHeaders(options.headers || {}),
            body: sanitizedBody
        });
    }

    // Log API response
    logResponse(method, url, response, duration) {
        logger.info(`API Response: ${method} ${url}`, {
            method,
            url,
            status: response.status,
            statusText: response.statusText,
            duration: `${duration}ms`
        });
    }

    // Log API error
    logError(method, url, error, duration) {
        logger.error(`API Error: ${method} ${url}`, error, {
            method,
            url,
            duration: `${duration}ms`
        });
    }

    // Sanitize sensitive data
    sanitizeHeaders(headers) {
        const sanitized = { ...headers };
        if (sanitized.Authorization) {
            sanitized.Authorization = '[REDACTED]';
        }
        return sanitized;
    }

    sanitizeBody(body) {
        if (!body || typeof body !== 'object') return body;

        const sanitized = { ...body };
        const sensitiveFields = ['password', 'token', 'apiKey', 'secret'];

        sensitiveFields.forEach(field => {
            if (sanitized[field]) {
                sanitized[field] = '[REDACTED]';
            }
        });

        return sanitized;
    }

    // Wrapped fetch with logging
    async fetch(url, options = {}) {
        const method = options.method || 'GET';
        const startTime = Date.now();

        // Log request
        this.logRequest(method, url, options);

        try {
            const response = await fetch(url, options);
            const duration = Date.now() - startTime;

            // Log response
            this.logResponse(method, url, response, duration);

            return response;
        } catch (error) {
            const duration = Date.now() - startTime;

            // Log error
            this.logError(method, url, error, duration);

            throw error;
        }
    }
}

const apiLogger = new ApiLogger();

export default apiLogger;
