import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { buildURL, API_ENDPOINTS } from '../../config/api';
import api from '../services/api';

const PostEditorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const isEditMode = !!id;

    // Auto-detect type from URL path
    const detectTypeFromPath = () => {
        if (location.pathname.includes('/blog/')) return 'blog';
        if (location.pathname.includes('/news/')) return 'news';
        return 'blog'; // default
    };

    const postType = detectTypeFromPath();

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        type: postType, // Auto-set from URL
        featuredImage: ''
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (isEditMode) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            const response = await api.getPost(id);
            const post = response.data.post;
            setFormData({
                title: post.title,
                content: post.content,
                excerpt: post.excerpt || '',
                type: post.type,
                featuredImage: post.featuredImage || ''
            });
        } catch (err) {
            setError('Failed to load post');
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

        // Check file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size must be less than 5MB');
            return;
        }

        // Check file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setError('Only JPEG, PNG, GIF, and WebP images are allowed');
            return;
        }

        setUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('image', file);

            const token = localStorage.getItem('admin_token');
            const response = await fetch(buildURL(API_ENDPOINTS.uploadImage), {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setFormData(prev => ({
                    ...prev,
                    featuredImage: data.data.url
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
            featuredImage: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (isEditMode) {
                await api.updatePost(id, formData);
                setSuccess('Post updated successfully!');
            } else {
                await api.createPost(formData);
                setSuccess('Post created successfully!');
                setTimeout(() => navigate('/admin/dashboard'), 1500);
            }
        } catch (err) {
            setError(err.message || 'Failed to save post');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) {
        return <div style={styles.loading}>Loading post...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                {/* Header */}
                <div style={styles.header}>
                    <button onClick={() => navigate('/admin/dashboard')} style={styles.backButton}>
                        ← Back to Dashboard
                    </button>
                    <h1 style={styles.title}>
                        {isEditMode ? 'Edit Post' : 'Create New Post'}
                    </h1>
                </div>

                {/* Messages */}
                {error && <div style={styles.errorMessage}>{error}</div>}
                {success && <div style={styles.successMessage}>{success}</div>}

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Title */}
                    <div style={styles.field}>
                        <label style={styles.label}>Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter post title"
                            required
                        />
                    </div>


                    {/* Type - Only show as readonly info for new posts */}
                    {!isEditMode && (
                        <div style={styles.field}>
                            <label style={styles.label}>Type</label>
                            <div style={styles.readOnlyField}>
                                {formData.type === 'blog' ? '📝 Blog Post' : '📰 News Article'}
                            </div>
                            <p style={styles.hint}>
                                {formData.type === 'blog'
                                    ? 'Creating a blog post. Go to Blog section to create blog posts, News section for news articles.'
                                    : 'Creating a news article. Go to News section to create news, Blog section for blog posts.'}
                            </p>
                        </div>
                    )}

                    {/* Type - Editable dropdown in edit mode */}
                    {isEditMode && (
                        <div style={styles.field}>
                            <label style={styles.label}>Type *</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                style={styles.select}
                                required
                            >
                                <option value="blog">Blog</option>
                                <option value="news">News</option>
                            </select>
                        </div>
                    )}

                    {/* Excerpt */}
                    <div style={styles.field}>
                        <label style={styles.label}>Excerpt</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            style={styles.textarea}
                            rows="3"
                            placeholder="Brief summary (optional)"
                        />
                    </div>

                    {/* Content */}
                    <div style={styles.field}>
                        <label style={styles.label}>Content *</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            style={styles.textareaLarge}
                            rows="15"
                            placeholder="Write your content here... (Supports Markdown)"
                            required
                        />
                        <p style={styles.hint}>💡 Tip: Use Markdown for formatting (e.g., # Heading, **bold**, - lists)</p>
                    </div>

                    {/* Featured Image */}
                    <div style={styles.field}>
                        <label style={styles.label}>Featured Image</label>

                        {/* Image Preview */}
                        {formData.featuredImage && (
                            <div style={styles.imagePreview}>
                                <img
                                    src={formData.featuredImage}
                                    alt="Featured"
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

                        {/* Upload Button */}
                        {!formData.featuredImage && (
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

                    {/* Actions */}
                    <div style={styles.actions}>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/dashboard')}
                            style={styles.cancelButton}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={styles.submitButton}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : isEditMode ? 'Update Post' : 'Create Post'}
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
        background: '#FAFAFA',
        paddingTop: '20px',
        paddingBottom: '40px'
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
        margin: '0 auto',
        padding: '20px'
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
        outline: 'none',
        transition: 'border-color 0.2s'
    },
    select: {
        width: '100%',
        padding: '12px',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        fontSize: '14px',
        outline: 'none',
        background: '#FFFFFF',
        cursor: 'pointer'
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
    textareaLarge: {
        width: '100%',
        padding: '12px',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        fontSize: '14px',
        outline: 'none',
        resize: 'vertical',
        fontFamily: 'monospace',
        lineHeight: 1.6
    },
    hint: {
        fontSize: '12px',
        color: '#737373',
        marginTop: '8px'
    },
    readOnlyField: {
        padding: '12px',
        background: '#F5F5F5',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        fontSize: '14px',
        color: '#000000',
        fontWeight: 600
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
        cursor: 'pointer',
        transition: 'background 0.2s'
    },
    imagePreview: {
        position: 'relative',
        marginBottom: '16px',
        border: '1px solid #E5E5E5',
        borderRadius: '8px',
        padding: '12px',
        background: '#FAFAFA'
    },
    previewImage: {
        width: '100%',
        maxHeight: '300px',
        objectFit: 'contain',
        borderRadius: '4px'
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

export default PostEditorPage;
