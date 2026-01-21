import React from 'react';
import { motion } from 'framer-motion';

const MissionStatement = () => {
    const coreAims = [
        {
            number: '01',
            title: 'Attract Regional Talent',
            description: 'Draw the brightest minds from Central Eurasia and connect them with global partners and opportunities.',
            icon: '🌐'
        },
        {
            number: '02',
            title: 'Co-Create with Corporations',
            description: 'Partner with industry leaders to develop practical AI solutions that address real business challenges.',
            icon: '🤝'
        },
        {
            number: '03',
            title: 'Develop AI Entrepreneurs',
            description: 'Nurture the next generation of AI-driven founders who will build the companies of tomorrow.',
            icon: '🚀'
        }
    ];

    return (
        <section style={styles.section}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={styles.header}
                >
                    <span style={styles.kicker}>OUR MISSION</span>
                    <h2 style={styles.title}>Building the AI Economy of Central Eurasia</h2>
                    <p style={styles.subtitle}>
                        AI Station exists at the intersection of education, innovation, and industry—creating
                        a thriving ecosystem where ideas become reality.
                    </p>
                </motion.div>

                <div style={styles.aimsGrid}>
                    {coreAims.map((aim, index) => (
                        <motion.div
                            key={aim.number}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            whileHover={{ y: -8 }}
                            style={styles.aimCard}
                        >
                            <div style={styles.aimNumber}>{aim.number}</div>
                            <div style={styles.aimIcon}>{aim.icon}</div>
                            <h3 style={styles.aimTitle}>{aim.title}</h3>
                            <p style={styles.aimDescription}>{aim.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: 'var(--space-12) 0',
        position: 'relative'
    },
    header: {
        textAlign: 'center',
        marginBottom: 'var(--space-8)',
        maxWidth: '700px',
        margin: '0 auto var(--space-8)'
    },
    kicker: {
        display: 'inline-block',
        fontSize: 'var(--text-tiny)',
        fontWeight: 700,
        letterSpacing: '0.2em',
        color: 'var(--primary-spectrum)',
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
    aimsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-4)'
    },
    aimCard: {
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        border: '1px solid rgba(107, 151, 252, 0.15)',
        textAlign: 'center',
        position: 'relative',
        transition: 'all 0.3s ease',
        cursor: 'default'
    },
    aimNumber: {
        position: 'absolute',
        top: 'var(--space-4)',
        right: 'var(--space-4)',
        fontSize: 'var(--text-small)',
        fontWeight: 700,
        color: 'var(--primary-blue)',
        fontFamily: 'var(--font-mono)',
        opacity: 0.5
    },
    aimIcon: {
        fontSize: '3rem',
        marginBottom: 'var(--space-3)'
    },
    aimTitle: {
        fontSize: 'var(--text-h4)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-2)',
        fontFamily: 'var(--font-display)'
    },
    aimDescription: {
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        margin: 0
    }
};

// Add responsive styles
const responsiveStyle = document.createElement('style');
responsiveStyle.textContent = `
  @media (max-width: 900px) {
    .mission-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(responsiveStyle);

export default MissionStatement;
