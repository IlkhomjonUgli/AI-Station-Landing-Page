import React from 'react';
import { motion } from 'framer-motion';

const FutureCampus = () => {
    const floors = [
        {
            floor: 5,
            title: 'Corporate Innovation Sandbox',
            description: 'Where industry partners co-create solutions',
            icon: '🏢',
            color: '#5458FF'
        },
        {
            floor: 4,
            title: 'AIS Studio',
            description: 'The startup foundry for building MVPs',
            icon: '🚀',
            color: '#6B97FC'
        },
        {
            floor: 3,
            title: 'AIS Academy',
            description: 'Dedicated classrooms for deep tech education',
            icon: '🎓',
            color: '#767DFB'
        },
        {
            floor: 2,
            title: 'Creative Industries',
            description: 'Media and content creation labs',
            icon: '🎨',
            color: '#9B8AFF'
        },
        {
            floor: 1,
            title: 'Events Center',
            description: 'A community space for hackathons and demo days',
            icon: '🎪',
            color: '#B8A8FF'
        }
    ];

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
                    <span style={styles.visionBadge}>
                        <span style={styles.pulsingDot} />
                        THE VISION • COMING SOON
                    </span>
                    <h2 style={styles.title}>The Future Home of Innovation</h2>
                    <p style={styles.subtitle}>
                        We are designing a state-of-the-art 5-story facility to house
                        the entire AI lifecycle under one roof.
                    </p>
                </motion.div>

                {/* Floor Stack */}
                <div style={styles.floorStack}>
                    {floors.map((floor, index) => (
                        <motion.div
                            key={floor.floor}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.02, x: 10 }}
                            style={{
                                ...styles.floorCard,
                                borderLeftColor: floor.color
                            }}
                        >
                            <div style={styles.floorNumber}>
                                <span style={{ color: floor.color }}>0{floor.floor}</span>
                            </div>
                            <div style={styles.floorContent}>
                                <div style={styles.floorIcon}>{floor.icon}</div>
                                <div style={styles.floorText}>
                                    <h3 style={styles.floorTitle}>{floor.title}</h3>
                                    <p style={styles.floorDescription}>{floor.description}</p>
                                </div>
                            </div>
                            <div style={styles.blueprintPattern} />
                        </motion.div>
                    ))}
                </div>

                {/* Roadmap Note */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={styles.roadmapNote}
                >
                    <div style={styles.roadmapIcon}>📋</div>
                    <div style={styles.roadmapText}>
                        <strong>On The Roadmap:</strong> Our campus vision is currently in the planning phase.
                        We are actively seeking partners and investors to bring this vision to life.
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: 'var(--space-12) 0',
        position: 'relative',
        overflow: 'hidden'
    },
    header: {
        textAlign: 'center',
        marginBottom: 'var(--space-8)',
        maxWidth: '700px',
        margin: '0 auto var(--space-8)'
    },
    visionBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: 'var(--text-tiny)',
        fontWeight: 700,
        letterSpacing: '0.15em',
        color: 'var(--primary-spectrum)',
        background: 'rgba(84, 88, 255, 0.1)',
        padding: '8px 16px',
        borderRadius: '20px',
        marginBottom: 'var(--space-3)',
        border: '1px dashed rgba(84, 88, 255, 0.3)'
    },
    pulsingDot: {
        width: '8px',
        height: '8px',
        background: '#5458FF',
        borderRadius: '50%',
        animation: 'pulse 2s ease-in-out infinite'
    },
    title: {
        fontSize: 'var(--text-h1)',
        fontWeight: 800,
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-3)',
        fontFamily: 'var(--font-display)'
    },
    subtitle: {
        fontSize: 'var(--text-h4)',
        color: 'var(--text-secondary)',
        lineHeight: 1.6
    },
    floorStack: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        maxWidth: '800px',
        margin: '0 auto'
    },
    floorCard: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-4)',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed rgba(107, 151, 252, 0.3)',
        borderLeft: '4px solid',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    floorNumber: {
        fontSize: 'var(--text-h2)',
        fontWeight: 900,
        fontFamily: 'var(--font-mono)',
        opacity: 0.6,
        minWidth: '60px'
    },
    floorContent: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        flex: 1,
        position: 'relative',
        zIndex: 1
    },
    floorIcon: {
        fontSize: '2rem',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(107, 151, 252, 0.1)',
        borderRadius: 'var(--radius-md)'
    },
    floorText: {
        flex: 1
    },
    floorTitle: {
        fontSize: 'var(--text-h4)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '4px',
        fontFamily: 'var(--font-display)'
    },
    floorDescription: {
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)',
        margin: 0
    },
    blueprintPattern: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '150px',
        background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(107, 151, 252, 0.03) 10px, rgba(107, 151, 252, 0.03) 11px)',
        opacity: 0.5
    },
    roadmapNote: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-3)',
        marginTop: 'var(--space-6)',
        padding: 'var(--space-4)',
        background: 'rgba(107, 151, 252, 0.08)',
        borderRadius: 'var(--radius-lg)',
        border: '1px dashed rgba(107, 151, 252, 0.3)',
        maxWidth: '800px',
        margin: 'var(--space-6) auto 0'
    },
    roadmapIcon: {
        fontSize: '1.5rem'
    },
    roadmapText: {
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)',
        lineHeight: 1.6
    }
};

// Add animation keyframes
const animationStyle = document.createElement('style');
animationStyle.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }
`;
document.head.appendChild(animationStyle);

export default FutureCampus;
