import React from 'react';
import { motion } from 'framer-motion';

const InnovationGallery = () => {
    const galleryItems = [
        {
            id: 1,
            title: 'Hackathons & Demo Days',
            description: 'Teams presenting innovative AI solutions',
            category: 'events',
            size: 'large'
        },
        {
            id: 2,
            title: 'Hands-on Workshops',
            description: 'Intensive classroom sessions',
            category: 'learning',
            size: 'medium'
        },
        {
            id: 3,
            title: 'Corporate Partnerships',
            description: 'Networking with Aloqabank & partners',
            category: 'networking',
            size: 'medium'
        },
        {
            id: 4,
            title: 'Mentor Sessions',
            description: 'One-on-one guidance from experts',
            category: 'mentorship',
            size: 'small'
        },
        {
            id: 5,
            title: 'Team Building',
            description: 'Collaborative problem solving',
            category: 'community',
            size: 'small'
        },
        {
            id: 6,
            title: 'Award Ceremonies',
            description: 'Celebrating innovation achievements',
            category: 'events',
            size: 'small'
        }
    ];

    const categoryColors = {
        events: 'linear-gradient(135deg, #5458FF 0%, #6B97FC 100%)',
        learning: 'linear-gradient(135deg, #6B97FC 0%, #9B8AFF 100%)',
        networking: 'linear-gradient(135deg, #FFB6E1 0%, #767DFB 100%)',
        mentorship: 'linear-gradient(135deg, #7FE5F0 0%, #6B97FC 100%)',
        community: 'linear-gradient(135deg, #C7B8EA 0%, #5458FF 100%)'
    };

    const categoryIcons = {
        events: '🎪',
        learning: '📚',
        networking: '🤝',
        mentorship: '🎯',
        community: '👥'
    };

    return (
        <section style={styles.section}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={styles.header}
                >
                    <span style={styles.kicker}>LIFE AT STATION</span>
                    <h2 style={styles.title}>The Innovation Atmosphere</h2>
                    <p style={styles.subtitle}>
                        Where ideas transform into reality, one workshop at a time
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <div style={styles.gallery}>
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{ scale: 1.03, y: -4 }}
                            style={{
                                ...styles.galleryItem,
                                ...(item.size === 'large' ? styles.itemLarge : {}),
                                ...(item.size === 'medium' ? styles.itemMedium : {}),
                                ...(item.size === 'small' ? styles.itemSmall : {})
                            }}
                        >
                            {/* Placeholder Background */}
                            <div style={{
                                ...styles.imagePlaceholder,
                                background: categoryColors[item.category]
                            }}>
                                <span style={styles.placeholderIcon}>
                                    {categoryIcons[item.category]}
                                </span>
                                <span style={styles.placeholderText}>📷</span>
                            </div>

                            {/* Content Overlay */}
                            <div style={styles.overlay}>
                                <span style={styles.category}>{item.category}</span>
                                <h3 style={styles.itemTitle}>{item.title}</h3>
                                <p style={styles.itemDesc}>{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={styles.cta}
                >
                    <p style={styles.ctaText}>
                        🎥 Want to see more? Follow us on social media for live updates from our community.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: 'var(--space-12) 0',
        background: 'linear-gradient(135deg, rgba(84, 88, 255, 0.03) 0%, rgba(107, 151, 252, 0.05) 100%)'
    },
    header: {
        textAlign: 'center',
        marginBottom: 'var(--space-6)',
        maxWidth: '700px',
        margin: '0 auto var(--space-6)'
    },
    kicker: {
        display: 'inline-block',
        fontSize: 'var(--text-tiny)',
        fontWeight: 700,
        letterSpacing: '0.2em',
        color: '#5458FF',
        marginBottom: 'var(--space-2)'
    },
    title: {
        fontSize: 'var(--text-h1)',
        fontWeight: 800,
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-3)',
        fontFamily: 'var(--font-display)',
        lineHeight: 1.2
    },
    subtitle: {
        fontSize: 'var(--text-h4)',
        color: 'var(--text-secondary)',
        lineHeight: 1.6
    },
    gallery: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: '180px',
        gap: 'var(--space-3)'
    },
    galleryItem: {
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    itemLarge: {
        gridColumn: 'span 2',
        gridRow: 'span 2'
    },
    itemMedium: {
        gridColumn: 'span 1',
        gridRow: 'span 2'
    },
    itemSmall: {
        gridColumn: 'span 1',
        gridRow: 'span 1'
    },
    imagePlaceholder: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)'
    },
    placeholderIcon: {
        fontSize: '3rem',
        opacity: 0.5
    },
    placeholderText: {
        fontSize: '1.5rem',
        opacity: 0.3
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
        padding: 'var(--space-4)',
        color: 'white'
    },
    category: {
        fontSize: 'var(--text-tiny)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        opacity: 0.8,
        marginBottom: '4px',
        display: 'block'
    },
    itemTitle: {
        fontSize: 'var(--text-body)',
        fontWeight: 700,
        margin: 0,
        fontFamily: 'var(--font-display)'
    },
    itemDesc: {
        fontSize: 'var(--text-tiny)',
        opacity: 0.8,
        margin: '4px 0 0 0'
    },
    cta: {
        textAlign: 'center',
        marginTop: 'var(--space-6)',
        padding: 'var(--space-4)',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed rgba(84, 88, 255, 0.3)'
    },
    ctaText: {
        fontSize: 'var(--text-body)',
        color: 'var(--text-secondary)',
        margin: 0
    }
};

export default InnovationGallery;
