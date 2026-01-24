import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NewsCard from '../components/NewsCard';
import SEO from '../components/SEO';
import { buildURL, API_ENDPOINTS } from '../config/api';
import { useLanguage } from '../utils/contexts';
import { getPageSEO } from '../config/seo';

const AllNewsPage = () => {
    const { language } = useLanguage();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllNews = async () => {
            try {
                const response = await fetch(buildURL(`${API_ENDPOINTS.posts}?type=news&status=published&limit=100`));
                const data = await response.json();
                if (data.success) {
                    setPosts(data.data.posts);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllNews();
    }, []);

    // Get SEO metadata for news page
    const pageSEO = getPageSEO('news', language);

    return (
        <div style={styles.container}>
            {/* SEO Meta Tags */}
            <SEO {...pageSEO} language={language} />

            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={styles.header}
                >
                    <button onClick={() => navigate('/')} style={styles.backButton}>
                        ← Back to Home
                    </button>
                    <h1 style={styles.title}>All News</h1>
                    <p style={styles.subtitle}>
                        Stay updated with the latest announcements and updates
                    </p>
                </motion.div>

                {/* Posts Grid */}
                {loading ? (
                    <p style={styles.loading}>Loading news articles...</p>
                ) : posts.length === 0 ? (
                    <p style={styles.empty}>No news articles available yet.</p>
                ) : (
                    <div style={styles.grid}>
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <NewsCard post={post} />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Post count */}
                {!loading && posts.length > 0 && (
                    <p style={styles.count}>
                        Showing all {posts.length} news article{posts.length !== 1 ? 's' : ''}
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
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

export default AllNewsPage;
