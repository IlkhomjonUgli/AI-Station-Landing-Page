import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buildURL, API_ENDPOINTS } from '../../config/api';

const PortfolioEditorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const gradientOptions = [
        { value: 'var(--gradient-primary)', label: 'Primary (Blue → Cyan)' },
        { value: 'var(--gradient-secondary)', label: 'Secondary (Indigo → Purple)' },
        { value: 'var(--gradient-accent)', label: 'Accent (Emerald → Teal)' },
        { value: 'var(--gradient-purple)', label: 'Purple' },
        { value: 'var(--gradient-sunset)', label: 'Sunset (Orange → Pink)' }
    ];

    const [formData, setFormData] = useState({
        title: '',
        client: '',
        category: '',
        description: '',
        challenge: '',
        solution: '',
        results: [''],
        technologies: [''],
        image: '',
        gradient: 'var(--gradient-primary)',
        featured: false,
        order: 0,
        isActive: true
    });
    const [loading, setLoading] = useState(isEditing);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isEditing) {
            fetchPortfolio();
        }
    }, [id]);

    const fetchPortfolio = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch(buildURL(API_ENDPOINTS.portfolioById(id)), {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                const portfolio = data.data.portfolio;
                setFormData({
                    ...portfolio,
                    results: Array.isArray(portfolio.results) ? portfolio.results : [''],
                    technologies: Array.isArray(portfolio.technologies) ? portfolio.technologies : ['']
                });
            }
        } catch (error) {
            console.error('Error fetching portfolio:', error);
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

    const handleArrayChange = (field, index, value) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData({ ...formData, [field]: newArray });
    };

    const addArrayItem = (field) => {
        setFormData({ ...formData, [field]: [...formData[field], ''] });
    };

    const removeArrayItem = (field, index) => {
        const newArray = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: newArray.length > 0 ? newArray : [''] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem('admin_token');
            const url = isEditing
                ? buildURL(API_ENDPOINTS.portfolioById(id))
                : buildURL(API_ENDPOINTS.portfolio);

            // Filter out empty strings from arrays
            const payload = {
                ...formData,
                results: formData.results.filter(r => r.trim() !== ''),
                technologies: formData.technologies.filter(t => t.trim() !== ''),
                order: parseInt(formData.order) || 0
            };

            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                navigate('/admin/portfolio');
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to save portfolio');
            }
        } catch (error) {
            console.error('Error saving portfolio:', error);
            alert('Error saving portfolio');
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
                <h1 style={styles.title}>{isEditing ? 'Edit Portfolio' : 'Add New Portfolio'}</h1>
                <button onClick={() => navigate('/admin/portfolio')} style={styles.backButton}>
                    ← Back to Portfolio
                </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Basic Info */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Basic Information</h3>

                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                placeholder="e.g., Smart Banking Analytics Platform"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Client *</label>
                            <input
                                type="text"
                                name="client"
                                value={formData.client}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                placeholder="e.g., Major Financial Institution"
                            />
                        </div>
                    </div>

                    <div style={styles.formRow}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Category *</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                placeholder="e.g., finance, healthcare, retail"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Icon (Emoji)</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="e.g., 🏦"
                                maxLength={2}
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

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Gradient Theme</label>
                        <select
                            name="gradient"
                            value={formData.gradient}
                            onChange={handleChange}
                            style={styles.select}
                        >
                            {gradientOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Content */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Project Details</h3>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={3}
                            style={styles.textarea}
                            placeholder="Brief overview of the project..."
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Challenge *</label>
                        <textarea
                            name="challenge"
                            value={formData.challenge}
                            onChange={handleChange}
                            required
                            rows={3}
                            style={styles.textarea}
                            placeholder="What problem did the client face?"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Solution *</label>
                        <textarea
                            name="solution"
                            value={formData.solution}
                            onChange={handleChange}
                            required
                            rows={3}
                            style={styles.textarea}
                            placeholder="How did you solve it?"
                        />
                    </div>
                </div>

                {/* Results */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Results / Outcomes</h3>
                    {formData.results.map((result, index) => (
                        <div key={index} style={styles.arrayRow}>
                            <input
                                type="text"
                                value={result}
                                onChange={(e) => handleArrayChange('results', index, e.target.value)}
                                style={styles.input}
                                placeholder="e.g., $12M annual savings in fraud prevention"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayItem('results', index)}
                                style={styles.removeButton}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('results')} style={styles.addItemButton}>
                        + Add Result
                    </button>
                </div>

                {/* Technologies */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Technologies Used</h3>
                    {formData.technologies.map((tech, index) => (
                        <div key={index} style={styles.arrayRow}>
                            <input
                                type="text"
                                value={tech}
                                onChange={(e) => handleArrayChange('technologies', index, e.target.value)}
                                style={styles.input}
                                placeholder="e.g., Python, TensorFlow, React"
                            />
                            <button
                                type="button"
                                onClick={() => removeArrayItem('technologies', index)}
                                style={styles.removeButton}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addArrayItem('technologies')} style={styles.addItemButton}>
                        + Add Technology
                    </button>
                </div>

                {/* Settings */}
                <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Settings</h3>
                    <div style={styles.checkboxRow}>
                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                style={styles.checkbox}
                            />
                            <span>Mark as Featured Project</span>
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
                </div>

                {/* Actions */}
                <div style={styles.actions}>
                    <button type="button" onClick={() => navigate('/admin/portfolio')} style={styles.cancelButton}>
                        Cancel
                    </button>
                    <button type="submit" disabled={saving} style={styles.saveButton}>
                        {saving ? 'Saving...' : (isEditing ? 'Update Portfolio' : 'Create Portfolio')}
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
        maxWidth: '900px'
    },
    section: {
        background: '#FFFFFF',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #E5E5E5',
        marginBottom: '20px'
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: 600,
        color: '#000000',
        marginTop: 0,
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '1px solid #E5E5E5'
    },
    formGroup: {
        marginBottom: '16px'
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '16px'
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: 600,
        color: '#000000',
        marginBottom: '8px'
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #E5E5E5',
        borderRadius: '6px',
        fontSize: '14px',
        boxSizing: 'border-box'
    },
    select: {
        width: '100%',
        padding: '10px',
        border: '1px solid #E5E5E5',
        borderRadius: '6px',
        fontSize: '14px',
        boxSizing: 'border-box',
        background: '#FFFFFF'
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
    arrayRow: {
        display: 'flex',
        gap: '8px',
        marginBottom: '8px'
    },
    removeButton: {
        padding: '10px 14px',
        background: '#FEE2E2',
        color: '#DC2626',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        cursor: 'pointer'
    },
    addItemButton: {
        padding: '8px 16px',
        background: '#F5F5F5',
        color: '#737373',
        border: '1px dashed #D4D4D4',
        borderRadius: '6px',
        fontSize: '14px',
        cursor: 'pointer',
        width: '100%'
    },
    checkboxRow: {
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap'
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

export default PortfolioEditorPage;
