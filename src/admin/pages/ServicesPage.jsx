import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildURL, API_ENDPOINTS } from '../../config/api';

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(buildURL(API_ENDPOINTS.servicesAll), {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setServices(data.data.services);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        console.log('handleDelete called with id:', id);

        if (!window.confirm('Are you sure you want to delete this service?')) {
            console.log('User cancelled deletion');
            return;
        }

        console.log('User confirmed deletion, proceeding...');

        try {
            const token = localStorage.getItem('admin_token');
            console.log('Token exists:', !!token);

            const url = buildURL(API_ENDPOINTS.serviceById(id));
            console.log('Delete URL:', url);

            const response = await fetch(url, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                console.log('Delete successful');
                setServices(services.filter(s => s.id !== id));
            } else {
                const data = await response.json();
                console.error('Delete failed:', data);
                alert('Failed to delete service: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Error deleting service: ' + error.message);
        }
    };

    const toggleActive = async (service) => {
        try {
            const token = localStorage.getItem('admin_token');
            await fetch(buildURL(API_ENDPOINTS.serviceById(service.id)), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ isActive: !service.isActive })
            });
            fetchServices();
        } catch (error) {
            console.error('Error toggling active status:', error);
        }
    };

    if (loading) {
        return <div style={styles.loading}>Loading services...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Services Management</h1>
                    <p style={styles.subtitle}>Manage your service offerings</p>
                </div>
                <button
                    onClick={() => navigate('/admin/services/new')}
                    style={styles.addButton}
                >
                    + Add New Service
                </button>
            </div>

            {services.length === 0 ? (
                <div style={styles.empty}>
                    <p>No services yet. Click "Add New Service" to create one!</p>
                </div>
            ) : (
                <div style={styles.tableContainer}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Order</th>
                                <th style={styles.th}>Icon</th>
                                <th style={styles.th}>Title</th>
                                <th style={styles.th}>Description</th>
                                <th style={styles.th}>Category</th>
                                <th style={styles.th}>Popular</th>
                                <th style={styles.th}>Status</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service.id} style={styles.tr}>
                                    <td style={styles.td}>{service.order}</td>
                                    <td style={styles.td}><span style={styles.icon}>{service.icon}</span></td>
                                    <td style={styles.td}>{service.title}</td>
                                    <td style={styles.td}>
                                        {service.description.substring(0, 60)}...
                                    </td>
                                    <td style={styles.td}>
                                        {service.category && (
                                            <span style={styles.categoryBadge}>{service.category}</span>
                                        )}
                                    </td>
                                    <td style={styles.td}>
                                        {service.popular && <span style={styles.popularBadge}>Popular</span>}
                                    </td>
                                    <td style={styles.td}>
                                        <button
                                            onClick={() => toggleActive(service)}
                                            style={{
                                                ...styles.statusBadge,
                                                background: service.isActive ? '#DCFCE7' : '#FEE2E2',
                                                color: service.isActive ? '#16A34A' : '#DC2626'
                                            }}
                                        >
                                            {service.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.actions}>
                                            <button
                                                onClick={() => navigate(`/admin/services/edit/${service.id}`)}
                                                style={styles.editButton}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(service.id)}
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
        fontWeight: 600
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

export default ServicesPage;
