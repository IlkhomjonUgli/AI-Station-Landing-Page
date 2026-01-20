import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildURL, API_ENDPOINTS } from '../../config/api';

const ProgramsPage = () => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('admin_token');
            const response = await fetch(buildURL(API_ENDPOINTS.programsAll), {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setPrograms(data.data.programs);
            }
        } catch (error) {
            console.error('Error fetching programs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this program?')) return;

        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(buildURL(API_ENDPOINTS.programById(id)), {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                fetchPrograms();
            }
        } catch (error) {
            console.error('Error deleting program:', error);
        }
    };

    const toggleActive = async (program) => {
        try {
            const token = localStorage.getItem('admin_token');
            await fetch(buildURL(API_ENDPOINTS.programById(program.id)), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ isActive: !program.isActive })
            });
            fetchPrograms();
        } catch (error) {
            console.error('Error toggling active status:', error);
        }
    };

    if (loading) {
        return <div style={styles.loading}>Loading programs...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Programs Management</h1>
                    <p style={styles.subtitle}>Manage your educational programs</p>
                </div>
                <button
                    onClick={() => navigate('/admin/programs/new')}
                    style={styles.addButton}
                >
                    + Add New Program
                </button>
            </div>

            {programs.length === 0 ? (
                <div style={styles.empty}>
                    <p>No programs yet. Click "Add New Program" to create one!</p>
                </div>
            ) : (
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Order</th>
                                <th style={styles.th}>Icon</th>
                                <th style={styles.th}>Title</th>
                                <th style={styles.th}>Level</th>
                                <th style={styles.th}>Duration</th>
                                <th style={styles.th}>Price</th>
                                <th style={styles.th}>Popular</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programs.map((program) => (
                                <tr key={program.id} style={styles.tr}>
                                    <td style={styles.td}>{program.order}</td>
                                    <td style={styles.td}><span style={styles.icon}>{program.icon || '📚'}</span></td>
                                    <td style={styles.td}>{program.title}</td>
                                    <td style={styles.td}>{program.level}</td>
                                    <td style={styles.td}>{program.duration}</td>
                                    <td style={styles.td}>${program.price || '-'}</td>
                                    <td style={styles.td}>
                                        {program.popular && <span style={styles.popularBadge}>⭐ Popular</span>}
                                    </td>
                                    <td style={styles.td}>
                                        <button
                                            onClick={() => toggleActive(program)}
                                            style={{
                                                ...styles.statusBadge,
                                                background: program.isActive ? '#DCFCE7' : '#FEE2E2',
                                                color: program.isActive ? '#16A34A' : '#DC2626'
                                            }}
                                        >
                                            {program.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.actions}>
                                            <button
                                                onClick={() => navigate(`/admin/programs/edit/${program.id}`)}
                                                style={styles.editButton}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(program.id)}
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
    popularBadge: {
        padding: '4px 8px',
        background: '#FEF3C7',
        color: '#F59E0B',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600
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

export default ProgramsPage;
