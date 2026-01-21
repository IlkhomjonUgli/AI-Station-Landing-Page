import React from 'react';
import { motion } from 'framer-motion';

const GlobalContext = () => {
    return (
        <section style={styles.section}>
            <div className="container">
                <div style={styles.grid}>
                    {/* Text Content - Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={styles.textContent}
                    >
                        <span style={styles.kicker}>GLOBAL TREND</span>
                        <h2 style={styles.heading}>The Race to Become an AI Hub</h2>
                        <p style={styles.body}>
                            Nations like France (Station F) serve as global examples of how ecosystems
                            empower innovation. AI Station is Central Eurasia's answer to this global
                            trend—a centralized platform to attract regional talent, international partners,
                            and corporate leaders to build the AI economy of tomorrow.
                        </p>
                        <div style={styles.stats}>
                            <div style={styles.statItem}>
                                <span style={styles.statNumber}>$2.5T</span>
                                <span style={styles.statLabel}>Global AI Market by 2030</span>
                            </div>
                            <div style={styles.statItem}>
                                <span style={styles.statNumber}>35%</span>
                                <span style={styles.statLabel}>Annual Growth Rate</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual - Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={styles.visualContainer}
                    >
                        <div style={styles.mapPlaceholder}>
                            <div style={styles.mapOverlay}>
                                <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Simplified world map silhouette */}
                                    <ellipse cx="200" cy="150" rx="180" ry="120" stroke="rgba(107, 151, 252, 0.3)" strokeWidth="2" strokeDasharray="8 4" fill="none" />
                                    <ellipse cx="200" cy="150" rx="140" ry="90" stroke="rgba(107, 151, 252, 0.2)" strokeWidth="1" strokeDasharray="4 4" fill="none" />
                                    <ellipse cx="200" cy="150" rx="100" ry="60" stroke="rgba(107, 151, 252, 0.15)" strokeWidth="1" strokeDasharray="4 4" fill="none" />

                                    {/* Hub markers */}
                                    <circle cx="120" cy="100" r="8" fill="rgba(107, 151, 252, 0.3)" />
                                    <circle cx="120" cy="100" r="4" fill="#6B97FC" />
                                    <text x="120" y="85" textAnchor="middle" fill="#6B97FC" fontSize="10" fontWeight="600">Station F</text>

                                    <circle cx="280" cy="130" r="8" fill="rgba(107, 151, 252, 0.3)" />
                                    <circle cx="280" cy="130" r="4" fill="#6B97FC" />
                                    <text x="280" y="115" textAnchor="middle" fill="#6B97FC" fontSize="10" fontWeight="600">Singapore</text>

                                    {/* AI Station - Highlighted */}
                                    <circle cx="230" cy="140" r="12" fill="rgba(84, 88, 255, 0.3)" />
                                    <circle cx="230" cy="140" r="6" fill="#5458FF" />
                                    <text x="230" y="165" textAnchor="middle" fill="#5458FF" fontSize="11" fontWeight="700">AI STATION</text>
                                    <text x="230" y="178" textAnchor="middle" fill="var(--text-secondary)" fontSize="9">Central Eurasia</text>
                                </svg>
                            </div>
                            <div style={styles.mapLabel}>
                                <span style={styles.mapLabelIcon}>🌍</span>
                                <span>Global Innovation Ecosystem</span>
                            </div>
                        </div>
                    </motion.div>
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
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-8)',
        alignItems: 'center'
    },
    textContent: {
        maxWidth: '560px'
    },
    kicker: {
        display: 'inline-block',
        fontSize: 'var(--text-tiny)',
        fontWeight: 700,
        letterSpacing: '0.2em',
        color: 'var(--primary-spectrum)',
        marginBottom: 'var(--space-2)',
        textTransform: 'uppercase'
    },
    heading: {
        fontSize: 'var(--text-h1)',
        fontWeight: 800,
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-4)',
        lineHeight: 1.2,
        fontFamily: 'var(--font-display)'
    },
    body: {
        fontSize: 'var(--text-body)',
        color: 'var(--text-secondary)',
        lineHeight: 1.8,
        marginBottom: 'var(--space-6)'
    },
    stats: {
        display: 'flex',
        gap: 'var(--space-6)'
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    statNumber: {
        fontSize: 'var(--text-h2)',
        fontWeight: 800,
        color: 'var(--primary-blue)',
        fontFamily: 'var(--font-display)'
    },
    statLabel: {
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)'
    },
    visualContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    mapPlaceholder: {
        width: '100%',
        maxWidth: '450px',
        aspectRatio: '4/3',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid rgba(107, 151, 252, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(107, 151, 252, 0.1)'
    },
    mapOverlay: {
        flex: 1,
        padding: 'var(--space-4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-2) var(--space-4)',
        background: 'rgba(107, 151, 252, 0.1)',
        borderTop: '1px solid rgba(107, 151, 252, 0.2)',
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)',
        fontWeight: 500
    },
    mapLabelIcon: {
        fontSize: '1.2rem'
    }
};

// Add responsive styles
const responsiveStyle = document.createElement('style');
responsiveStyle.textContent = `
  @media (max-width: 900px) {
    .global-context-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(responsiveStyle);

export default GlobalContext;
