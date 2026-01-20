// Frontend Logger Utility
// Usage: import logger from '@/utils/logger';

const LOG_LEVELS = {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error'
};

class Logger {
    constructor() {
        this.isDevelopment = import.meta.env.MODE === 'development';
        this.apiEndpoint = import.meta.env.VITE_API_URL || 'http://localhost:5001';
    }

    // Format log message with timestamp and context
    formatLog(level, message, context = {}) {
        return {
            timestamp: new Date().toISOString(),
            level,
            message,
            context: {
                url: window.location.href,
                userAgent: navigator.userAgent,
                ...context
            }
        };
    }

    // Send critical logs to backend
    async sendToBackend(logData) {
        try {
            // Only send errors and warns to backend
            if (logData.level === LOG_LEVELS.ERROR || logData.level === LOG_LEVELS.WARN) {
                await fetch(`${this.apiEndpoint}/api/logs/frontend`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('admin_token') || ''}`
                    },
                    body: JSON.stringify(logData)
                }).catch(() => {
                    // Silently fail - don't block the app if logging fails
                });
            }
        } catch (err) {
            // Silently fail
        }
    }

    debug(message, context = {}) {
        const logData = this.formatLog(LOG_LEVELS.DEBUG, message, context);

        if (this.isDevelopment) {
            console.debug(`[DEBUG] ${message}`, context);
        }
    }

    info(message, context = {}) {
        const logData = this.formatLog(LOG_LEVELS.INFO, message, context);

        console.log(`[INFO] ${message}`, context);

        // Store in sessionStorage for debugging
        this.storeLog(logData);
    }

    warn(message, context = {}) {
        const logData = this.formatLog(LOG_LEVELS.WARN, message, context);

        console.warn(`[WARN] ${message}`, context);

        this.storeLog(logData);
        this.sendToBackend(logData);
    }

    error(message, error = null, context = {}) {
        const errorContext = error ? {
            errorMessage: error.message,
            errorStack: error.stack,
            errorName: error.name,
            ...context
        } : context;

        const logData = this.formatLog(LOG_LEVELS.ERROR, message, errorContext);

        console.error(`[ERROR] ${message}`, error || '', errorContext);

        this.storeLog(logData);
        this.sendToBackend(logData);
    }

    // Store logs in sessionStorage (last 50 logs)
    storeLog(logData) {
        try {
            const logs = JSON.parse(sessionStorage.getItem('app_logs') || '[]');
            logs.push(logData);

            // Keep only last 50 logs
            if (logs.length > 50) {
                logs.shift();
            }

            sessionStorage.setItem('app_logs', JSON.stringify(logs));
        } catch (err) {
            // Silently fail
        }
    }

    // Get stored logs (for debugging)
    getLogs() {
        try {
            return JSON.parse(sessionStorage.getItem('app_logs') || '[]');
        } catch (err) {
            return [];
        }
    }

    // Clear stored logs
    clearLogs() {
        sessionStorage.removeItem('app_logs');
    }

    // Log user actions
    logAction(action, details = {}) {
        this.info(`User Action: ${action}`, {
            action,
            ...details
        });
    }

    // Log page views
    logPageView(pageName, context = {}) {
        this.info(`Page View: ${pageName}`, {
            page: pageName,
            ...context
        });
    }

    // Log API calls
    logApiCall(method, endpoint, status, duration, error = null) {
        const level = error ? LOG_LEVELS.ERROR : LOG_LEVELS.INFO;
        const message = `API ${method} ${endpoint} - ${status}`;

        const context = {
            apiCall: true,
            method,
            endpoint,
            status,
            duration: `${duration}ms`
        };

        if (error) {
            this.error(message, error, context);
        } else {
            this.info(message, context);
        }
    }
}

// Create singleton instance
const logger = new Logger();

// Expose logger to window for debugging (development only)
if (import.meta.env.MODE === 'development') {
    window.logger = logger;
    window.getLogs = () => logger.getLogs();
    window.clearLogs = () => logger.clearLogs();
}

export default logger;
