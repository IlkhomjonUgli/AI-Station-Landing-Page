import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buildURL, API_ENDPOINTS } from '../../config/api';

const ProgramEditorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        level: 'Beginner',
        features: [],
        price: '',
        icon: '',
        popular: false,
        order: 0,
        isActive: true
    });

    const [featureInput, setFeatureInput] = useState('');

    useEffect(() => {
        if (isEditing) {
            fetchProgram();
        }
    }, [id]);

    const fetchProgram = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(buildURL(API_ENDPOINTS.programById(id)), {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setFormData(data.data.program);
            }
        } catch (error) {
            console.error('Error fetching program:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('admin_token');
            const url = isEditing
                ? buildURL(API_ENDPOINTS.programById(id))
                : buildURL(API_ENDPOINTS.programs);

            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                navigate('/admin/programs');
            } else {
                alert('Error saving program');
            }
        } catch (error) {
            console.error('Error saving program:', error);
            alert('Error saving program');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const addFeature = () => {
        if (featureInput.trim()) {
            setFormData(prev => ({
                ...prev,
                features: [...prev.features, featureInput.trim()]
            }));
            setFeatureInput('');
        }
    };

    const removeFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>{isEditing ? 'Edit Program' : 'Add New Program'}</h1>
                <button onClick={() => navigate('/admin/programs')} className="btn">
                    ← Back to Programs
                </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGrid}>
                    {/* Title */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            placeholder="e.g., AI Fundamentals"
                        />
                    </div>

                    {/* Duration */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Duration *</label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            placeholder="e.g., 12 weeks"
                        />
                    </div>

                    {/* Level */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Level *</label>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            required
                            style={styles.input}
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Price</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="e.g., $120"
                        />
                    </div>

                    {/* Icon */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Icon (emoji)</label>
                        <input
                            type="text"
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="e.g., 🤖"
                        />
                    </div>

                    {/* Order */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Display Order</label>
                        <input
                            type="number"
                            name="order"
                            value={formData.order}
                            onChange={handleChange}
                            style={styles.input}
                            min="0"
                        />
                    </div>
                </div>

                {/* Description */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Description *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        style={{ ...styles.input, minHeight: '100px' }}
                        placeholder="Enter program description..."
                    />
                </div>

                {/* Features */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Features</label>
                    <div style={styles.featureInput}>
                        <input
                            type="text"
                            value={featureInput}
                            onChange={(e) => setFeatureInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                            style={styles.input}
                            placeholder="Add a feature..."
                        />
                        <button type="button" onClick={addFeature} className="btn btn-secondary">
                            Add
                        </button>
                    </div>
                    {formData.features.length > 0 && (
                        <ul style={styles.featureList}>
                            {formData.features.map((feature, index) => (
                                <li key={index} style={styles.featureItem}>
                                    <span>{feature}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        style={styles.removeButton}
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Checkboxes */}
                <div style={styles.checkboxGroup}>
                    <label style={styles.checkbox}>
                        <input
                            type="checkbox"
                            name="popular"
                            checked={formData.popular}
                            onChange={handleChange}
                        />
                        <span style={{ marginLeft: '8px' }}>Mark as Popular</span>
                    </label>
                    <label style={styles.checkbox}>
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                        />
                        <span style={{ marginLeft: '8px' }}>Active</span>
                    </label>
                </div>

                {/* Submit Button */}
                <div style={styles.submitRow}>
                    <button type="submit" className="btn btn-primary" style={{ minWidth: '200px' }}>
                        {isEditing ? 'Update Program' : 'Create Program'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: { padding: '20px' },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
    },
    title: { fontSize: '28px', fontWeight: 700, margin: 0 },
    form: {
        background: '#FFFFFF',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #E5E5E5'
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginBottom: '16px'
    },
    formGroup: { marginBottom: '16px' },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 600,
        fontSize: '14px',
        color: '#000000'
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #E5E5E5',
        borderRadius: '6px',
        fontSize: '14px',
        fontFamily: 'inherit'
    },
    featureInput: {
        display: 'flex',
        gap: '8px',
        marginBottom: '12px'
    },
    featureList: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    featureItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        background: '#F5F5F5',
        borderRadius: '4px',
        marginBottom: '4px'
    },
    removeButton: {
        background: 'none',
        border: 'none',
        color: '#DC2626',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '4px'
    },
    checkboxGroup: {
        display: 'flex',
        gap: '24px',
        marginBottom: '24px'
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },
    submitRow: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
};

export default ProgramEditorPage;
