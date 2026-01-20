import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildURL, API_ENDPOINTS } from '../../config/api';

const BlogPostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch(buildURL(`${API_ENDPOINTS.posts}?type=blog`));
            const data = await response.json();
            if (data.success) {
                setPosts(data.data.posts);
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            const token = localStorage.getItem('admin_token');
            await fetch(buildURL(API_ENDPOINTS.postById(id)), {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchPosts();
        } catch (error) {
            alert('Error deleting post: ' + error.message);
        }
    };

    const handleTogglePublish = async (post) => {
        try {
            const token = localStorage.getItem('admin_token');
            const action = post.status === 'published' ? 'unpublish' : 'publish';
            const endpoint = buildURL(`${API_ENDPOINTS.postById(post.id)}/${action}`);

            await fetch(endpoint, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchPosts();
        } catch (error) {
            alert('Error updating post: ' + error.message);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Blog Posts</h1>
                    <p style={styles.subtitle}>Manage your blog articles</p>
                </div>
                <button onClick={() => navigate('/admin/blog/new')} style={styles.createBtn}>
                    + Create Blog Post
                </button>
            </div>

            <div style={styles.content}>
                {loading ? (
                    <p>Loading blog posts...</p>
                ) : posts.length === 0 ? (
                    <p>No blog posts found. Create your first blog post!</p>
                ) : (
                    <div style={styles.postsGrid}>
                        {posts.map(post => (
                            <div key={post.id} style={styles.postCard}>
                                <div style={styles.postHeader}>
                                    <h3 style={styles.postTitle}>{post.title}</h3>
                                    <span style={{
                                        ...styles.badge,
                                        ...(post.status === 'published' ? styles.publishedBadge : styles.draftBadge)
                                    }}>
                                        {post.status}
                                    </span>
                                </div>
                                <p style={styles.postExcerpt}>{post.excerpt || 'No excerpt'}</p>
                                <div style={styles.postMeta}>
                                    <span>Views: {post.views}</span>
                                    <span>
                                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Not published'}
                                    </span>
                                </div>
                                <div style={styles.postActions}>
                                    <button onClick={() => navigate(`/admin/blog/edit/${post.id}`)} style={{ ...styles.actionBtn, ...styles.editBtn }}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleTogglePublish(post)} style={styles.actionBtn}>
                                        {post.status === 'published' ? 'Unpublish' : 'Publish'}
                                    </button>
                                    <button onClick={() => handleDelete(post.id)} style={{ ...styles.actionBtn, ...styles.deleteBtn }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        background: '#FAFAFA'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '32px',
        padding: '20px',
        background: '#FFFFFF',
        borderRadius: '8px'
    },
    title: {
        fontSize: '24px',
        fontWeight: 700,
        color: '#000000',
        marginBottom: '4px'
    },
    subtitle: {
        fontSize: '14px',
        color: '#737373'
    },
    createBtn: {
        padding: '12px 24px',
        background: '#16A34A',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer'
    },
    content: {
        background: '#FFFFFF',
        padding: '24px',
        borderRadius: '8px',
        minHeight: '400px'
    },
    postsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
    },
    postCard: {
        padding: '20px',
        border: '1px solid #E5E5E5',
        borderRadius: '8px',
        background: '#FFFFFF'
    },
    postHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: '12px'
    },
    postTitle: {
        fontSize: '16px',
        fontWeight: 600,
        color: '#000000',
        margin: 0
    },
    badge: {
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600
    },
    publishedBadge: {
        background: '#DCFCE7',
        color: '#16A34A'
    },
    draftBadge: {
        background: '#FEF3C7',
        color: '#CA8A04'
    },
    postExcerpt: {
        fontSize: '14px',
        color: '#737373',
        marginBottom: '12px'
    },
    postMeta: {
        display: 'flex',
        gap: '12px',
        fontSize: '12px',
        color: '#A3A3A3',
        marginBottom: '16px'
    },
    postActions: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap'
    },
    actionBtn: {
        padding: '6px 12px',
        background: '#000000',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px'
    },
    editBtn: {
        background: '#2563EB'
    },
    deleteBtn: {
        background: '#DC2626'
    }
};

export default BlogPostsPage;
