import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        {
            path: '/admin/dashboard',
            label: 'Dashboard',
            icon: '📊'
        },
        {
            path: '/admin/blog',
            label: 'Blog',
            icon: '📝'
        },
        {
            path: '/admin/news',
            label: 'News',
            icon: '📰'
        },
        {
            path: '/admin/services',
            label: 'Services',
            icon: '🛠️'
        },
        {
            path: '/admin/programs',
            label: 'Programs',
            icon: '📚'
        },
        {
            path: '/admin/campaigns',
            label: 'Campaigns',
            icon: '🎯'
        },
        {
            path: '/admin/team',
            label: 'Team',
            icon: '👥'
        },
        {
            path: '/admin/portfolio',
            label: 'Portfolio',
            icon: '💼'
        }
    ];

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <div style={styles.sidebar}>
            {/* Logo/Title */}
            <div style={styles.header}>
                <h2 style={styles.logo}>AI Station</h2>
                <p style={styles.subtitle}>Admin Panel</p>
            </div>

            {/* Navigation Menu */}
            <nav style={styles.nav}>
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        style={{
                            ...styles.menuItem,
                            ...(isActive(item.path) && styles.menuItemActive)
                        }}
                    >
                        <span style={styles.icon}>{item.icon}</span>
                        <span style={styles.label}>{item.label}</span>
                    </Link>
                ))}
            </nav>

            {/* Logout Button */}
            <button onClick={handleLogout} style={styles.logoutBtn}>
                <span style={styles.icon}>🚪</span>
                <span style={styles.label}>Logout</span>
            </button>
        </div>
    );
};

const styles = {
    sidebar: {
        width: '250px',
        height: '100vh',
        background: '#FFFFFF',
        borderRight: '1px solid #E5E5E5',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0
    },
    header: {
        padding: '24px 20px',
        borderBottom: '1px solid #E5E5E5'
    },
    logo: {
        fontSize: '20px',
        fontWeight: 700,
        color: '#000000',
        margin: 0,
        marginBottom: '4px'
    },
    subtitle: {
        fontSize: '12px',
        color: '#737373',
        margin: 0
    },
    nav: {
        flex: 1,
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 20px',
        textDecoration: 'none',
        color: '#737373',
        fontSize: '14px',
        transition: 'all 0.2s',
        cursor: 'pointer'
    },
    menuItemActive: {
        background: '#F5F5F5',
        color: '#000000',
        fontWeight: 600,
        borderLeft: '3px solid #000000'
    },
    icon: {
        fontSize: '18px'
    },
    label: {
        fontSize: '14px'
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 20px',
        margin: '20px',
        background: '#FAFAFA',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        color: '#737373',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s'
    }
};

export default Sidebar;
