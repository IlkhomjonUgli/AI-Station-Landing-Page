import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buildURL, API_ENDPOINTS } from '../../config/api';

const TeamEditorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        image: '',
        linkedin: '',
        twitter: '',
        github: '',
        order: 0
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (isEditMode) {
            fetchTeamMember();
        }
    }, [id]);

    const fetchTeamMember = async () => {
        try {
            setLoading(true);
            const response = await fetch(buildURL(API_ENDPOINTS.teamById(id)));
            const data = await response.json();
            if (data.success) {
                const member = data.data.teamMember;
                setFormData({
                    name: member.name,
                    role: member.role,
                    bio: member.bio || '',
                    image: member.image || '',
                    linkedin: member.linkedin || '',
                    twitter: member.twitter || '',
                    github: member.github || '',
                    order: member.order || 0
                });
            }
        } catch (err) {
            setError('Failed to load team member');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError('Image size must be less than 5MB');
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setError('Only JPEG, PNG, GIF, and WebP images are allowed');
            return;
        }

        setUploading(true);
        setError('');

        try {
            const uploadFormData = new FormData();
            uploadFormData.append('image', file);

            const token = localStorage.getItem('admin_token');
            const response = await fetch(buildURL(API_ENDPOINTS.uploadImage), {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: uploadFormData
            });

            const data = await response.json();

            if (data.success) {
                setFormData(prev => ({
                    ...prev,
                    image: data.data.url
                }));
                setSuccess('Image uploaded successfully!');
                setTimeout(() => setSuccess(''), 3000);
            } else {
                setError(data.error || 'Upload failed');
            }
        } catch (err) {
            setError('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setFormData(prev => ({
            ...prev,
            image: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const token = localStorage.getItem('admin_token');
            const url = isEditMode
                ? buildURL(API_ENDPOINTS.teamById(id))
                : buildURL(API_ENDPOINTS.team);

            const response = await fetch(url, {
                method: isEditMode ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(isEditMode ? 'Team member updated successfully!' : 'Team member created successfully!');
                setTimeout(() => navigate('/admin/team'), 1500);
            } else {
                setError(data.error || 'Failed to save team member');
            }
        } catch (err) {
            setError(err.message || 'Failed to save team member');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) {
        return <div style={styles.loading}>Loading team member...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                {/* Header */}
                <div style={styles.header}>
                    <button onClick={() => navigate('/admin/team')} style={styles.backButton}>
                        ← Back to Team
                    </button>
                    <h1 style={styles.title}>
                        {isEditMode ? 'Edit Team Member' : 'Add Team Member'}
                    </h1>
                </div>

                {/* Messages */}
                {error && <div style={styles.errorMessage}>{error}</div>}
                {success && <div style={styles.successMessage}>{success}</div>}

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Name */}
                    <div style={styles.field}>
                        <label style={styles.label}>Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter full name"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div style={styles.field}>
                        <label style={styles.label}>Role *</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="e.g., CEO, CTO, Lead Developer"
                            required
                        />
                    </div>

                    {/* Bio */}
                    <div style={styles.field}>
                        <label style={styles.label}>Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            style={styles.textarea}
                            rows="4"
                            placeholder="Brief bio or description (optional)"
                        />
                    </div>

                    {/* Image Upload */}
                    <div style={styles.field}>
                        <label style={styles.label}>Profile Image</label>

                        {formData.image && (
                            <div style={styles.imagePreview}>
                                <img
                                    src={formData.image}
                                    alt="Profile"
                                    style={styles.previewImage}
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    style={styles.removeImageBtn}
                                >
                                    ✕ Remove Image
                                </button>
                            </div>
                        )}

                        {!formData.image && (
                            <div style={styles.uploadContainer}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={styles.fileInput}
                                    id="imageUpload"
                                    disabled={uploading}
                                />
                                <label htmlFor="imageUpload" style={styles.uploadLabel}>
                                    {uploading ? '⏳ Uploading...' : '📷 Upload Image'}
                                </label>
                                <p style={styles.hint}>
                                    JPEG, PNG, GIF, or WebP • Max 5MB
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Social Links */}
                    <div style={styles.field}>
                        <label style={styles.label}>LinkedIn</label>
                        <input
                            type="url"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Twitter</label>
                        <input
                            type="url"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="https://twitter.com/username"
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>GitHub</label>
                        <input
                            type="url"
                            name="github"
                            value={formData.github}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="https://github.com/username"
                        />
                    </div>

                    {/* Order */}
                    <div style={styles.field}>
                        <label style={styles.label}>Display Order</label>
                        <input
                            type="number"
                            name="order"
                            value={formData.order}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="0"
                            min="0"
                        />
                        <p style={styles.hint}>Lower numbers appear first</p>
                    </div>

                    {/* Actions */}
                    <div style={styles.actions}>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/team')}
                            style={styles.cancelButton}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={styles.submitButton}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : isEditMode ? 'Update Member' : 'Add Member'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        background: '#FAFAFA'
    },
    loading: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        color: '#737373'
    },
    content: {
        maxWidth: '900px',
        margin: '0 auto'
    },
    header: {
        marginBottom: '32px'
    },
    backButton: {
        padding: '8px 16px',
        background: '#FFFFFF',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer',
        marginBottom: '16px'
    },
    title: {
        fontSize: '28px',
        fontWeight: 700,
        color: '#000000',
        margin: 0
    },
    errorMessage: {
        padding: '12px',
        background: '#FEE2E2',
        color: '#DC2626',
        borderRadius: '4px',
        marginBottom: '20px',
        fontSize: '14px'
    },
    successMessage: {
        padding: '12px',
        background: '#DCFCE7',
        color: '#16A34A',
        borderRadius: '4px',
        marginBottom: '20px',
        fontSize: '14px'
    },
    form: {
        background: '#FFFFFF',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    field: {
        marginBottom: '24px'
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
        padding: '12px',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        fontSize: '14px',
        outline: 'none'
    },
    textarea: {
        width: '100%',
        padding: '12px',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        fontSize: '14px',
        outline: 'none',
        resize: 'vertical',
        fontFamily: 'inherit'
    },
    hint: {
        fontSize: '12px',
        color: '#737373',
        marginTop: '8px'
    },
    uploadContainer: {
        padding: '20px',
        border: '2px dashed #E5E5E5',
        borderRadius: '8px',
        textAlign: 'center',
        background: '#FAFAFA'
    },
    fileInput: {
        display: 'none'
    },
    uploadLabel: {
        display: 'inline-block',
        padding: '12px 24px',
        background: '#2563EB',
        color: '#FFFFFF',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer'
    },
    imagePreview: {
        marginBottom: '16px',
        border: '1px solid #E5E5E5',
        borderRadius: '8px',
        padding: '12px',
        background: '#FAFAFA',
        textAlign: 'center'
    },
    previewImage: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    removeImageBtn: {
        marginTop: '12px',
        padding: '8px 16px',
        background: '#DC2626',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        cursor: 'pointer'
    },
    actions: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end',
        marginTop: '32px'
    },
    cancelButton: {
        padding: '12px 24px',
        background: '#FFFFFF',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer'
    },
    submitButton: {
        padding: '12px 24px',
        background: '#000000',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer'
    }
};

export default TeamEditorPage;
