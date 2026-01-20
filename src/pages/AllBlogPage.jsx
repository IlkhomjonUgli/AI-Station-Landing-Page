import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';
import { buildURL, API_ENDPOINTS } from '../config/api';

const AllBlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    // Removed useNavigate as per instruction, replaced with Link component in JSX
    // const navigate = useNavigate(); 

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const response = await fetch(buildURL(`${API_ENDPOINTS.posts}?type=blog&status=published&limit=100`));
                const data = await response.json();
                if (data.success) {
                    setPosts(data.data.posts);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllBlogs();
    }, []);

    return (
        <div style={styles.container}>
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={styles.header}
                >
                    <Link to="/" style={styles.backButton}>
                        ← Back to Home
                    </Link>
                    <h1 style={styles.title}>All Blog Posts</h1>
                    <p style={styles.subtitle}>
                        Insights, tutorials, and updates from our AI experts
                    </p>
                </motion.div>

                {/* Posts Grid */}
                {loading ? (
                    <p style={styles.loading}>Loading blog posts...</p>
                ) : posts.length === 0 ? (
                    <p style={styles.empty}>No blog posts available yet.</p>
                ) : (
                    <div style={styles.grid}>
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <BlogCard post={post} />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Post count */}
                {!loading && posts.length > 0 && (
                    <p style={styles.count}>
                        Showing all {posts.length} blog post{posts.length !== 1 ? 's' : ''}
                    </p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        paddingTop: '120px',
        paddingBottom: 'var(--space-12)',
        background: 'var(--bg-primary)'
    },
    header: {
        textAlign: 'center',
        marginBottom: 'var(--space-8)'
    },
    backButton: {
        display: 'inline-block',
        textDecoration: 'none',
        padding: '8px 16px',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-sm)',
        fontSize: 'var(--text-body)',
        cursor: 'pointer',
        marginBottom: 'var(--space-4)',
        transition: 'all var(--transition-base)'
    },
    title: {
        fontSize: 'var(--text-h1)',
        fontWeight: 900,
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-2)'
    },
    subtitle: {
        fontSize: 'var(--text-h4)',
        color: 'var(--text-secondary)',
        maxWidth: '600px',
        margin: '0 auto'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-6)'
    },
    loading: {
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: 'var(--text-h4)',
        padding: 'var(--space-12)'
    },
    empty: {
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: 'var(--text-h4)',
        padding: 'var(--space-12)'
    },
    count: {
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: 'var(--text-body)'
    }
};

export default AllBlogPage;
