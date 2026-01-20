import React from 'react';

const BlogCard = ({ post }) => {
    return (
        <article style={styles.card}>
            <div style={styles.header}>
                <span style={styles.type}>Blog</span>
                <span style={styles.date}>
                    {new Date(post.publishedAt).toLocaleDateString()}
                </span>
            </div>

            <h3 style={styles.title}>{post.title}</h3>

            <p style={styles.excerpt}>
                {post.excerpt || post.content.substring(0, 150) + '...'}
            </p>

            <div style={styles.footer}>
                <span style={styles.author}>By {post.author.name}</span>
                <span style={styles.views}>👁 {post.views} views</span>
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
    type: {
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        fontWeight: 600,
        letterSpacing: '0.05em'
    },
    date: {
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)'
    },
    title: {
        fontSize: 'var(--text-h3)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-2)',
        lineHeight: 1.3
    },
    excerpt: {
        fontSize: 'var(--text-body)',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        marginBottom: 'var(--space-3)'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 'var(--space-2)',
        borderTop: '1px solid var(--border-color)'
    },
    author: {
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)'
    },
    views: {
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)'
    }
};

export default BlogCard;
