import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/helpers';
import { useLanguage } from '../utils/contexts';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section style={heroStyles.section}>
      <div className="container" style={heroStyles.container}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          style={heroStyles.content}
        >
          <motion.h1
            className="hero-title"
            style={heroStyles.title}
            variants={fadeInUp}
          >
            {t('hero.title').split(' ').map((word, i) => (
              <motion.span
                key={i}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            style={heroStyles.subtitle}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            style={heroStyles.ctaButtons}
          >
            <Link to="/programs" className="btn btn-primary">
              <span>{t('hero.getStarted')}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link to="/about" className="btn btn-secondary">
              {t('hero.learnMore')}
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            style={heroStyles.stats}
          >
            <div style={heroStyles.statItem}>
              <div style={heroStyles.statNumber}>300+</div>
              <div style={heroStyles.statLabel}>Students</div>
            </div>
            <div style={heroStyles.statItem}>
              <div style={heroStyles.statNumber}>50+</div>
              <div style={heroStyles.statLabel}>Projects</div>
            </div>
            <div style={heroStyles.statItem}>
              <div style={heroStyles.statNumber}>95%</div>
              <div style={heroStyles.statLabel}>Success Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const heroStyles = {
  section: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '120px',
    paddingBottom: 'var(--space-12)',
    background: 'var(--bg-primary)',  // Responds to theme (white in light, black in dark)
    overflow: 'hidden'
  },
  container: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '900px'
  },
  content: {
    textAlign: 'left',
    color: 'var(--text-primary)'
  },
  title: {
    marginBottom: 'var(--space-4)',
    lineHeight: 1.1,
    color: 'var(--text-primary)',
    fontSize: 'var(--text-hero)',
    fontWeight: 900,
    letterSpacing: '-0.04em'
  },
  subtitle: {
    fontSize: 'var(--text-h3)',
    color: 'var(--text-secondary)',
    marginBottom: 'var(--space-6)',
    maxWidth: '700px',
    lineHeight: 1.6
  },
  ctaButtons: {
    display: 'flex',
    gap: 'var(--space-3)',
    marginBottom: 'var(--space-8)',
    flexWrap: 'wrap'
  },
  stats: {
    display: 'flex',
    gap: 'var(--space-8)',
    paddingTop: 'var(--space-4)',
    borderTop: '1px solid var(--border-color)',
    flexWrap: 'wrap'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)'
  },
  statNumber: {
    fontSize: 'var(--text-h2)',
    fontWeight: 900,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-display)'
  },
  statLabel: {
    fontSize: 'var(--text-small)',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontWeight: 600
  }
};

// Responsive styles
const responsiveStyle = document.createElement('style');
responsiveStyle.textContent = `
  @media (max-width: 768px) {
    .hero-title {
      font-size: 3rem !important;
    }
  }
`;
document.head.appendChild(responsiveStyle);

export default Hero;
