import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { setCurrentUser } from '../utils/auth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.login(email, password);
            setCurrentUser(response.data.user);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>AI Station Admin</h1>
                <p style={styles.subtitle}>Login to manage blog posts and news</p>

                {error && (
                    <div style={styles.error}>{error}</div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            placeholder="admin@aistation.uz"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        style={styles.button}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p style={styles.hint}>
                    Default credentials: admin@aistation.uz / admin123
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F5F5F5',
        padding: '20px'
    },
    card: {
        background: '#FFFFFF',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%'
    },
    title: {
        fontSize: '28px',
        fontWeight: 700,
        color: '#000000',
        marginBottom: '8px',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: '14px',
        color: '#737373',
        marginBottom: '32px',
        textAlign: 'center'
    },
    error: {
        background: '#FEE2E2',
        color: '#DC2626',
        padding: '12px',
        borderRadius: '4px',
        marginBottom: '20px',
        fontSize: '14px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontSize: '14px',
        fontWeight: 600,
        color: '#000000'
    },
    input: {
        padding: '12px',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.2s'
    },
    button: {
        padding: '12px',
        background: '#000000',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'opacity 0.2s'
    },
    hint: {
        marginTop: '20px',
        fontSize: '12px',
        color: '#A3A3A3',
        textAlign: 'center'
    }
};

export default LoginPage;
