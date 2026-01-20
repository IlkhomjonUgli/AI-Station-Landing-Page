import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buildURL, API_ENDPOINTS } from '../../config/api';

const ServiceEditorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        icon: '',
        category: '',
        popular: false,
        order: 0,
        isActive: true
    });
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEditing) {
            fetchService();
        }
    }, [id]);

    const fetchService = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(buildURL(API_ENDPOINTS.serviceById(id)), {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setFormData(data.data.service);
            }
        } catch (error) {
            console.error('Error fetching service:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem('admin_token');
            const url = isEditing
                ? buildURL(API_ENDPOINTS.serviceById(id))
                : buildURL(API_ENDPOINTS.services);

            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate('/admin/services');
            } else {
                alert('Failed to save service');
            }
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Error saving service');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>{isEditing ? 'Edit Service' : 'Add New Service'}</h1>
                <button onClick={() => navigate('/admin/services')} style={styles.backButton}>
                    ← Back to Services
                </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Title *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        placeholder="e.g., AI Consulting"
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Description *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        style={styles.textarea}
                        placeholder="Describe what this service offers..."
                    />
                </div>

                <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Icon (Emoji)</label>
                        <input
                            type="text"
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="e.g., 🎯"
                            maxLength={2}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="e.g., consulting"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Display Order</label>
                        <input
                            type="number"
                            name="order"
                            value={formData.order}
                            onChange={handleChange}
                            style={styles.input}
                            min={0}
                        />
                    </div>
                </div>

                <div style={styles.checkboxRow}>
                    <label style={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="popular"
                            checked={formData.popular}
                            onChange={handleChange}
                            style={styles.checkbox}
                        />
                        <span>Mark as Popular</span>
                    </label>

                    <label style={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            style={styles.checkbox}
                        />
                        <span>Active (visible on website)</span>
                    </label>
                </div>

                <div style={styles.actions}>
                    <button type="button" onClick={() => navigate('/admin/services')} style={styles.cancelButton}>
                        Cancel
                    </button>
                    <button type="submit" disabled={saving} style={styles.saveButton}>
                        {saving ? 'Saving...' : (isEditing ? 'Update Service' : 'Create Service')}
                    </button>
                </div>
            </form>
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
        margin: 0
    },
    backButton: {
        padding: '8px 16px',
        background: '#FFFFFF',
        color: '#000000',
        border: '1px solid #E5E5E5',
        borderRadius: '6px',
        fontSize: '14px',
        cursor: 'pointer'
    },
    form: {
        background: '#FFFFFF',
        padding: '32px',
        borderRadius: '8px',
        border: '1px solid #E5E5E5',
        maxWidth: '800px'
    },
    formGroup: {
        marginBottom: '20px'
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: 600,
        color: '#000000',
        marginBottom: '8px'
    },
    input: {
        width: ' 100%',
        padding: '10px',
        border: '1px solid #E5E5E5',
        borderRadius: '6px',
        fontSize: '14px',
        boxSizing: 'border-box'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #E5E5E5',
        borderRadius: '6px',
        fontSize: '14px',
        fontFamily: 'inherit',
        resize: 'vertical',
        boxSizing: 'border-box'
    },
    checkboxRow: {
        display: 'flex',
        gap: '24px',
        marginBottom: '24px'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        cursor: 'pointer'
    },
    checkbox: {
        width: '18px',
        height: '18px',
        cursor: 'pointer'
    },
    actions: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end'
    },
    cancelButton: {
        padding: '12px 24px',
        background: '#FFFFFF',
        color: '#000000',
        border: '1px solid #E5E5E5',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer'
    },
    saveButton: {
        padding: '12px 24px',
        background: '#2563EB',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer'
    }
};

export default ServiceEditorPage;
