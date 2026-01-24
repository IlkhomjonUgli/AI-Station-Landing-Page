import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../utils/contexts';

const CaseStudies = () => {
    const { t, language } = useLanguage();
    const caseStudies = [
        {
            id: 'ministry-of-justice',
            type: 'GOVERNMENT',
            title: 'Ministry of Justice – Digital Transformation',
            client: "O'zbekiston Respublikasi Adliya Vazirligi",
            challenge: 'Need for AI literacy and digital adoption among government staff.',
            solution: 'Comprehensive offline bootcamp and workshops.',
            accentColor: '#5458FF',
            metrics: [
                { value: '30', label: 'Participants' },
                { value: '5', label: 'Day Bootcamp' },
                { value: '20+', label: 'Workshop Hours' }
            ],
            focus: 'AI Adoption & Digital Transformation',
            logo: '⚖️'
        },
        {
            id: 'aloqabank',
            type: 'BANKING',
            title: 'Aloqabank – Corporate AI Upskilling',
            client: 'AloqaBank',
            challenge: 'Modernizing banking operations with AI skills.',
            solution: '3-week Corporate AI Training & Hackathon.',
            accentColor: '#6B97FC',
            metrics: [
                { value: '53', label: 'Participants' },
                { value: '15', label: 'Mentors (7 Local + 8 Int\'l)' },
                { value: '10', label: 'Ready MVPs' },
                { value: '48', label: 'Offline Hours' }
            ],
            focus: 'Corporate AI Upskilling & Innovation',
            logo: '🏦'
        }
    ];

    const trustedPartners = [
        {
            name: 'UNDP',
            fullName: 'United Nations Development Programme',
            description: 'Partner on Ministry project',
            logo: '🌐'
        },
        {
            name: 'Dodson AI',
            fullName: 'Dodson AI',
            description: 'Global Access to US Market',
            logo: '🤖'
        },
        {
            name: 'Accelerate Prosperity',
            fullName: 'Accelerate Prosperity',
            description: 'Gateway to C-Level Mentorship',
            logo: '🚀'
        }
    ];

    return (
        <section id="portfolio" style={styles.section}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={styles.header}
                >
                    <span style={styles.kicker}>{t('caseStudies.kicker')}</span>
                    <h2 style={styles.title}>{t('caseStudies.title')}</h2>
                    <p style={styles.subtitle}>
                        {t('caseStudies.subtitle')}
                    </p>
                </motion.div>

                {/* Case Studies Grid */}
                <div style={styles.caseStudiesGrid}>
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={study.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            style={styles.caseCard}
                        >
                            {/* Card Header */}
                            <div style={styles.cardHeader}>
                                <span style={{
                                    ...styles.typeBadge,
                                    background: study.type === 'GOVERNMENT'
                                        ? 'rgba(84, 88, 255, 0.15)'
                                        : 'rgba(107, 151, 252, 0.15)',
                                    color: study.accentColor
                                }}>
                                    {study.type}
                                </span>
                                <div style={styles.logoCircle}>{study.logo}</div>
                            </div>

                            {/* Title & Client */}
                            <h3 style={styles.cardTitle}>{study.title}</h3>
                            <p style={styles.clientName}>{study.client}</p>

                            {/* Challenge & Solution */}
                            <div style={styles.challengeSection}>
                                <div style={styles.csBlock}>
                                    <span style={styles.csLabel}>{t('caseStudies.challenge')}</span>
                                    <p style={styles.csText}>{study.challenge}</p>
                                </div>
                                <div style={styles.csBlock}>
                                    <span style={styles.csLabel}>{t('caseStudies.solution')}</span>
                                    <p style={styles.csText}>{study.solution}</p>
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div style={styles.metricsGrid}>
                                {study.metrics.map((metric, i) => (
                                    <div key={i} style={styles.metricItem}>
                                        <span style={{
                                            ...styles.metricValue,
                                            color: study.accentColor
                                        }}>{metric.value}</span>
                                        <span style={styles.metricLabel}>{metric.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Focus Tag */}
                            <div style={styles.focusTag}>
                                <span style={styles.focusIcon}>🎯</span>
                                <span style={styles.focusText}>{study.focus}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trusted Partners Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={styles.partnersBanner}
                >
                    <h3 style={styles.partnersTitle}>{t('caseStudies.trustedPartners')}</h3>
                    <div style={styles.partnersGrid}>
                        {trustedPartners.map((partner, index) => (
                            <motion.div
                                key={partner.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -4, scale: 1.02 }}
                                style={styles.partnerCard}
                            >
                                <div style={styles.partnerLogo}>{partner.logo}</div>
                                <div style={styles.partnerInfo}>
                                    <h4 style={styles.partnerName}>{partner.name}</h4>
                                    <p style={styles.partnerDesc}>{partner.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
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
    caseStudiesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--space-6)',
        marginBottom: 'var(--space-8)'
    },
    caseCard: {
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5)',
        border: '1px solid rgba(107, 151, 252, 0.15)',
        boxShadow: '0 4px 24px rgba(84, 88, 255, 0.08)',
        transition: 'all 0.3s ease'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-3)'
    },
    typeBadge: {
        fontSize: 'var(--text-tiny)',
        fontWeight: 700,
        letterSpacing: '0.1em',
        padding: '6px 14px',
        borderRadius: '20px'
    },
    logoCircle: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #5458FF 0%, #6B97FC 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        boxShadow: '0 4px 12px rgba(84, 88, 255, 0.2)'
    },
    cardTitle: {
        fontSize: 'var(--text-h3)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '4px',
        fontFamily: 'var(--font-display)'
    },
    clientName: {
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)',
        fontStyle: 'italic',
        marginBottom: 'var(--space-3)'
    },
    challengeSection: {
        background: 'rgba(107, 151, 252, 0.05)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-3)',
        marginBottom: 'var(--space-4)'
    },
    csBlock: {
        marginBottom: '8px'
    },
    csLabel: {
        fontSize: 'var(--text-tiny)',
        fontWeight: 700,
        color: '#5458FF',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    },
    csText: {
        fontSize: 'var(--text-small)',
        color: 'var(--text-secondary)',
        margin: '4px 0 0 0',
        lineHeight: 1.5
    },
    metricsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--space-2)',
        marginBottom: 'var(--space-3)'
    },
    metricItem: {
        textAlign: 'center',
        padding: '8px 4px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid rgba(107, 151, 252, 0.1)'
    },
    metricValue: {
        display: 'block',
        fontSize: 'var(--text-h3)',
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        lineHeight: 1
    },
    metricLabel: {
        display: 'block',
        fontSize: '10px',
        color: 'var(--text-muted)',
        marginTop: '4px',
        lineHeight: 1.2
    },
    focusTag: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 14px',
        background: 'linear-gradient(135deg, rgba(84, 88, 255, 0.1) 0%, rgba(107, 151, 252, 0.1) 100%)',
        borderRadius: 'var(--radius-md)',
        border: '1px dashed rgba(84, 88, 255, 0.3)'
    },
    focusIcon: {
        fontSize: '1rem'
    },
    focusText: {
        fontSize: 'var(--text-small)',
        fontWeight: 600,
        color: '#5458FF'
    },
    partnersBanner: {
        background: 'linear-gradient(135deg, rgba(84, 88, 255, 0.08) 0%, rgba(107, 151, 252, 0.08) 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-5)',
        border: '1px solid rgba(107, 151, 252, 0.15)'
    },
    partnersTitle: {
        textAlign: 'center',
        fontSize: 'var(--text-h4)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-4)',
        fontFamily: 'var(--font-display)'
    },
    partnersGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-4)'
    },
    partnerCard: {
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-3)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        border: '1px solid rgba(107, 151, 252, 0.1)',
        cursor: 'default',
        transition: 'all 0.3s ease'
    },
    partnerLogo: {
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #5458FF 0%, #9B8AFF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        flexShrink: 0
    },
    partnerInfo: {
        flex: 1
    },
    partnerName: {
        fontSize: 'var(--text-body)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        margin: 0,
        fontFamily: 'var(--font-display)'
    },
    partnerDesc: {
        fontSize: 'var(--text-tiny)',
        color: 'var(--text-secondary)',
        margin: '2px 0 0 0',
        fontStyle: 'italic'
    }
};

// Responsive styles
if (typeof document !== 'undefined') {
    const responsiveStyle = document.createElement('style');
    responsiveStyle.textContent = `
    @media (max-width: 1024px) {
      #portfolio .case-studies-grid {
        grid-template-columns: 1fr !important;
      }
    }
    @media (max-width: 768px) {
      #portfolio .metrics-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
      #portfolio .partners-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `;
    document.head.appendChild(responsiveStyle);
}

export default CaseStudies;
