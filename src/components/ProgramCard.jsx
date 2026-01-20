import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProgramCard = ({ program, index = 0 }) => {
  const {
    title,
    description,
    price,
    duration,
    level,
    features = [],
    popular = false,
    image
  } = program;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8 }}
      style={{
        ...cardStyles.card,
        border: popular ? '2px solid var(--primary-cyan)' : '1px solid var(--border-color)'
      }}
    >
      {popular && (
        <div style={cardStyles.badge}>
          <span>⭐ Most Popular</span>
        </div>
      )}

      <div style={cardStyles.imageContainer}>
        <div style={{ ...cardStyles.imagePlaceholder, background: image || 'var(--gradient-primary)' }}>
          <div style={cardStyles.imageOverlay}>
            {program.icon && program.icon.startsWith('/') ? (
              <img src={program.icon} alt={title} style={{ width: '64px', height: '64px' }} />
            ) : (
              <span style={{ fontSize: '3rem' }}>{program.icon || '🤖'}</span>
            )}
          </div>
        </div>
      </div>

      <div style={cardStyles.content}>
        <div style={cardStyles.header}>
          <h3 style={cardStyles.title}>{title}</h3>
          <div style={cardStyles.meta}>
            <span style={cardStyles.metaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {duration}
            </span>
            <span style={cardStyles.metaItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              {level}
            </span>
          </div>
        </div>

        <p style={cardStyles.description}>{description}</p>

        <div style={cardStyles.features}>
          {features.slice(0, 4).map((feature, idx) => (
            <div key={idx} style={cardStyles.feature}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--secondary-emerald)' }}>
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div style={cardStyles.footer}>
          <div style={cardStyles.pricing}>
            <span style={cardStyles.price}>${price}</span>
            <span style={cardStyles.period}>/month</span>
          </div>
          <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
            Enroll Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const cardStyles = {
  card: {
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  badge: {
    position: 'absolute',
    top: 'var(--space-2)',
    right: 'var(--space-2)',
    background: 'var(--gradient-accent)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-small)',
    fontWeight: 600,
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden'
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.2)'
  },
  content: {
    padding: 'var(--space-4)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
    flex: 1
  },
  header: {
    marginBottom: 'var(--space-2)'
  },
  title: {
    fontSize: 'var(--text-h3)',
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    marginBottom: 'var(--space-2)',
    color: 'var(--text-primary)'
  },
  meta: {
    display: 'flex',
    gap: 'var(--space-3)',
    flexWrap: 'wrap'
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: 'var(--text-small)',
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-mono)'
  },
  description: {
    fontSize: 'var(--text-body)',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    flex: 1
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    fontSize: 'var(--text-small)',
    color: 'var(--text-secondary)'
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
    paddingTop: 'var(--space-3)',
    borderTop: '1px solid var(--border-color)',
    marginTop: 'auto'
  },
  pricing: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px'
  },
  price: {
    fontSize: 'var(--text-h2)',
    fontWeight: 800,
    fontFamily: 'var(--font-display)',
    background: 'var(--gradient-primary)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  period: {
    fontSize: 'var(--text-small)',
    color: 'var(--text-secondary)'
  }
};

export default ProgramCard;
