import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildURL, API_ENDPOINTS } from '../../config/api';

const PortfolioPage = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(buildURL(API_ENDPOINTS.portfolioAll), {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setPortfolios(data.data.portfolios);
            }
        } catch (error) {
            console.error('Error fetching portfolios:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this portfolio item?')) return;

        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(buildURL(API_ENDPOINTS.portfolioById(id)), {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setPortfolios(portfolios.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Error deleting portfolio:', error);
        }
    };

    const toggleActive = async (portfolio) => {
        try {
            const token = localStorage.getItem('admin_token');
            await fetch(buildURL(API_ENDPOINTS.portfolioById(portfolio.id)), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ isActive: !portfolio.isActive })
            });
            fetchPortfolios();
        } catch (error) {
            console.error('Error toggling active status:', error);
        }
    };

    const toggleFeatured = async (portfolio) => {
        try {
            const token = localStorage.getItem('admin_token');
            await fetch(buildURL(API_ENDPOINTS.portfolioById(portfolio.id)), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ featured: !portfolio.featured })
            });
            fetchPortfolios();
        } catch (error) {
            console.error('Error toggling featured status:', error);
        }
    };

    if (loading) {
        return <div style={styles.loading}>Loading portfolios...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Portfolio Management</h1>
                    <p style={styles.subtitle}>Manage your portfolio projects and case studies</p>
                </div>
                <button
                    onClick={() => navigate('/admin/portfolio/new')}
                    style={styles.addButton}
                >
                    + Add New Portfolio
                </button>
            </div>

            {portfolios.length === 0 ? (
                <div style={styles.empty}>
                    <p>No portfolio items yet. Click "Add New Portfolio" to create one!</p>
                </div>
            ) : (
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Order</th>
                                <th style={styles.th}>Icon</th>
                                <th style={styles.th}>Title</th>
                                <th style={styles.th}>Client</th>
                                <th style={styles.th}>Category</th>
                                <th style={styles.th}>Featured</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolios.map((portfolio) => (
                                <tr key={portfolio.id} style={styles.tr}>
                                    <td style={styles.td}>{portfolio.order}</td>
                                    <td style={styles.td}><span style={styles.icon}>{portfolio.image}</span></td>
                                    <td style={styles.td}>{portfolio.title}</td>
                                    <td style={styles.td}>{portfolio.client}</td>
                                    <td style={styles.td}>
                                        <span style={styles.categoryBadge}>{portfolio.category}</span>
                                    </td>
                                    <td style={styles.td}>
                                        <button
                                            onClick={() => toggleFeatured(portfolio)}
                                            style={{
                                                ...styles.featuredBadge,
                                                background: portfolio.featured ? '#FEF3C7' : '#F5F5F5',
                                                color: portfolio.featured ? '#F59E0B' : '#737373'
                                            }}
                                        >
                                            {portfolio.featured ? '⭐ Featured' : 'Not Featured'}
                                        </button>
                                    </td>
                                    <td style={styles.td}>
                                        <button
                                            onClick={() => toggleActive(portfolio)}
                                            style={{
                                                ...styles.statusBadge,
                                                background: portfolio.isActive ? '#DCFCE7' : '#FEE2E2',
                                                color: portfolio.isActive ? '#16A34A' : '#DC2626'
                                            }}
                                        >
                                            {portfolio.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.actions}>
                                            <button
                                                onClick={() => navigate(`/admin/portfolio/edit/${portfolio.id}`)}
                                                style={styles.editButton}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(portfolio.id)}
                                                style={styles.deleteButton}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        background: '#FAFAFA',
        padding: '20px'
    },
    loading: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        color: '#737373'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
    },
    title: {
        fontSize: '28px',
        fontWeight: 700,
        color: '#000000',
        margin: 0,
        marginBottom: '4px'
    },
    subtitle: {
        fontSize: '14px',
        color: '#737373',
        margin: 0
    },
    addButton: {
        padding: '12px 24px',
        background: '#2563EB',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        background: '#FFFFFF',
        borderRadius: '8px',
        color: '#737373'
    },
    tableContainer: {
        background: '#FFFFFF',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #E5E5E5'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    th: {
        textAlign: 'left',
        padding: '16px',
        borderBottom: '2px solid #E5E5E5',
        fontSize: '13px',
        fontWeight: 600,
        color: '#737373',
        background: '#F9FAFB'
    },
    tr: {
        borderBottom: '1px solid #F5F5F5'
    },
    td: {
        padding: '16px',
        fontSize: '14px',
        color: '#000000'
    },
    icon: {
        fontSize: '24px'
    },
    categoryBadge: {
        padding: '4px 8px',
        background: '#DBEAFE',
        color: '#2563EB',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'capitalize'
    },
    featuredBadge: {
        padding: '6px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600,
        border: 'none',
        cursor: 'pointer'
    },
    statusBadge: {
        padding: '6px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600,
        border: 'none',
        cursor: 'pointer'
    },
    actions: {
        display: 'flex',
        gap: '8px'
    },
    editButton: {
        padding: '6px 12px',
        background: '#DBEAFE',
        color: '#2563EB',
        border: 'none',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600,
        cursor: 'pointer'
    },
    deleteButton: {
        padding: '6px 12px',
        background: '#FEE2E2',
        color: '#DC2626',
        border: 'none',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600,
        cursor: 'pointer'
    }
};

export default PortfolioPage;
