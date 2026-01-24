import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/helpers';
import { useLanguage } from '../utils/contexts';

const Hero = () => {
  const { t, language } = useLanguage();

  return (
    <section style={heroStyles.section}>
      {/* Overlay removed - background handled by body */}

      <div className="container" style={heroStyles.container}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          style={heroStyles.content}
        >
          {/* Kicker text */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            style={heroStyles.kicker}
          >
            {t('hero.kicker')}
          </motion.span>

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
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={heroStyles.subtitle}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={heroStyles.ctaButtons}
          >
            <a href="#programs" className="btn btn-primary">
              <span>{t('hero.getStarted')}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#services" className="btn btn-secondary">
              {t('hero.learnMore')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            style={heroStyles.stats}
          >
            <div style={heroStyles.statItem}>
              <div style={heroStyles.statNumber}>10+</div>
              <div style={heroStyles.statLabel}>{t('hero.startupsIncubated')}</div>
            </div>
            <div style={heroStyles.statItem}>
              <div style={heroStyles.statNumber}>250+</div>
              <div style={heroStyles.statLabel}>{t('hero.hoursInnovation')}</div>
            </div>
            <div style={heroStyles.statItem}>
              <div style={heroStyles.statNumber}>15+</div>
              <div style={heroStyles.statLabel}>{t('hero.globalMentors')}</div>
            </div>
            <div style={heroStyles.statItem}>
              <div style={heroStyles.statNumber}>3</div>
              <div style={heroStyles.statLabel}>{t('hero.corporatePartners')}</div>
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
    overflow: 'hidden'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(107, 151, 252, 0.1) 0%, rgba(118, 125, 251, 0.05) 50%, rgba(84, 88, 255, 0.1) 100%)',
    zIndex: 1
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
  kicker: {
    display: 'inline-block',
    fontSize: 'var(--text-small)',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: 'var(--primary-spectrum)',
    marginBottom: 'var(--space-3)',
    background: 'rgba(84, 88, 255, 0.1)',
    padding: '8px 16px',
    borderRadius: 'var(--radius-sm)'
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
    fontSize: 'var(--text-h4)',
    color: 'var(--text-secondary)',
    marginBottom: 'var(--space-6)',
    maxWidth: '700px',
    lineHeight: 1.7
  },
  ctaButtons: {
    display: 'flex',
    gap: 'var(--space-3)',
    marginBottom: 'var(--space-8)',
    flexWrap: 'wrap'
  },
  stats: {
    display: 'flex',
    gap: 'var(--space-6)',
    paddingTop: 'var(--space-4)',
    borderTop: '1px solid rgba(107, 151, 252, 0.2)',
    justifyContent: 'space-between',
    maxWidth: '800px'
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
