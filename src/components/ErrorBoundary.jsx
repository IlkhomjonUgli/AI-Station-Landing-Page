import React from 'react';
import logger from '../utils/logger';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error to our logger
        logger.error('React Error Boundary caught an error', error, {
            componentStack: errorInfo.componentStack,
            errorBoundary: true
        });

        // Store error details in state
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div style={styles.container}>
                    <div style={styles.content}>
                        <h1 style={styles.title}>⚠️ Something went wrong</h1>
                        <p style={styles.message}>
                            We're sorry, but something unexpected happened.
                            The error has been logged and we'll look into it.
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            style={styles.button}
                        >
                            Refresh Page
                        </button>

                        {import.meta.env.MODE === 'development' && this.state.error && (
                            <details style={styles.details}>
                                <summary style={styles.summary}>Error Details (Development Only)</summary>
                                <pre style={styles.errorText}>
                                    {this.state.error.toString()}
                                    {'\n\n'}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAFAFA',
        padding: '20px'
    },
    content: {
        maxWidth: '600px',
        background: '#FFFFFF',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
    },
    title: {
        fontSize: '24px',
        fontWeight: 700,
        color: '#DC2626',
        marginBottom: '16px'
    },
    message: {
        fontSize: '16px',
        color: '#737373',
        marginBottom: '24px',
        lineHeight: 1.6
    },
    button: {
        padding: '12px 24px',
        background: '#000000',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'opacity 0.2s'
    },
    details: {
        marginTop: '24px',
        textAlign: 'left',
        background: '#FEF3C7',
        padding: '16px',
        borderRadius: '4px'
    },
    summary: {
        cursor: 'pointer',
        fontWeight: 600,
        marginBottom: '8px'
    },
    errorText: {
        fontSize: '12px',
        color: '#92400E',
        overflow: 'auto',
        maxHeight: '200px'
    }
};

export default ErrorBoundary;
