import React from 'react';

const NewsCard = ({ post }) => {
    return (
        <article style={styles.card}>
            <div style={styles.header}>
                <span style={styles.badge}>🔥 News</span>
                <span style={styles.date}>
                    {new Date(post.publishedAt).toLocaleDateString()}
                </span>
            </div>

            <h3 style={styles.title}>{post.title}</h3>

            <p style={styles.excerpt}>
                {post.excerpt || post.content.substring(0, 120) + '...'}
            </p>

            <div style={styles.meta}>
                <span>{post.views} views</span>
            </div>
        </article>
    );
};

const styles = {
    card: {
        background: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4)',
        transition: 'all var(--transition-base)',
        cursor: 'pointer'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-2)'
    },
    badge: {
        fontSize: 'var(--text-small)',
        fontWeight: 700,
        color: 'var(--text-primary)'
    },
    date: {
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)'
    },
    title: {
        fontSize: 'var(--text-h4)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-2)',
        lineHeight: 1.3
    },
    excerpt: {
        fontSize: 'var(--text-body)',
        color: 'var(--text-secondary)',
        lineHeight: 1.5,
        marginBottom: 'var(--space-2)'
    },
    meta: {
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)'
    }
};

export default NewsCard;
