import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
  // Engagement Models (The 3 Formats)
  const engagementModels = [
    {
      id: 'hybrid',
      icon: '🔄',
      title: 'The Hybrid Bootcamp',
      duration: '3-4 Weeks',
      description: 'Intensive training combining online workshops with offline sessions and a final Demo Day.',
      bestFor: 'Government entities & Large Enterprises',
      features: [
        'Blended learning approach',
        'In-person Demo Day',
        'Dedicated project mentors',
        'Custom curriculum design'
      ],
      highlight: true
    },
    {
      id: 'digital',
      icon: '🌐',
      title: 'The Digital Sprint',
      duration: '3-4 Weeks',
      description: 'Fully remote online training with virtual workshops and digital Demo Day.',
      bestFor: 'Remote teams & International partners',
      features: [
        '100% remote delivery',
        'Virtual Demo Day',
        'Async learning materials',
        'Global time zone flexibility'
      ],
      highlight: false
    },
    {
      id: 'offline',
      icon: '🏢',
      title: 'The Offline Immersion',
      duration: '3-4 Weeks',
      description: 'Hands-on offline training at our Hub with direct mentorship and supervision.',
      bestFor: 'Technical teams requiring deep-dive supervision',
      features: [
        'At our Hub in Tashkent',
        'Direct mentor access',
        'Intensive hands-on labs',
        'Team collaboration focus'
      ],
      highlight: false
    }
  ];

  // Industry Sectors
  const sectors = [
    { icon: '🏦', name: 'Banking & Fintech', caseStudy: 'Aloqabank' },
    { icon: '⚖️', name: 'Public Sector & Government', caseStudy: 'Ministry of Justice' },
    { icon: '📡', name: 'Telecommunications', caseStudy: null },
    { icon: '🏥', name: 'Healthcare', caseStudy: null },
    { icon: '🛡️', name: 'Insurance', caseStudy: null },
    { icon: '🚚', name: 'Logistics & Transport', caseStudy: null },
    { icon: '🎓', name: 'Education', caseStudy: null },
    { icon: '🛒', name: 'Retail & E-commerce', caseStudy: null },
    { icon: '🏭', name: 'Manufacturing & Industrial', caseStudy: null }
  ];

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={styles.heroContent}
          >
            <span style={styles.kicker}>CORPORATE INNOVATION</span>
            <h1 className="hero-title" style={styles.title}>
              Industry Innovation <span className="gradient-text">Tracks</span>
            </h1>
            <p style={styles.subtitle}>
              Tailored AI transformation programs designed for enterprise needs.
              Choose your format, select your industry, and let us drive results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Engagement Models Section */}
      <section className="section" style={styles.modelsSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={styles.sectionHeader}
          >
            <span style={styles.sectionKicker}>CHOOSE YOUR FORMAT</span>
            <h2 style={styles.sectionTitle}>Engagement Models</h2>
            <p style={styles.sectionSubtitle}>
              Three proven delivery formats to match your organization's needs and constraints
            </p>
          </motion.div>

          <div style={styles.modelsGrid}>
            {engagementModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  ...styles.modelCard,
                  ...(model.highlight ? styles.modelCardHighlight : {})
                }}
              >
                {model.highlight && (
                  <div style={styles.recommendedBadge}>RECOMMENDED</div>
                )}

                <div style={styles.modelIcon}>{model.icon}</div>

                <div style={styles.modelHeader}>
                  <h3 style={styles.modelTitle}>{model.title}</h3>
                  <span style={styles.durationBadge}>{model.duration}</span>
                </div>

                <p style={styles.modelDescription}>{model.description}</p>

                <div style={styles.bestForTag}>
                  <span style={styles.bestForLabel}>Best For:</span>
                  <span style={styles.bestForValue}>{model.bestFor}</span>
                </div>

                <div style={styles.featuresList}>
                  {model.features.map((feature, idx) => (
                    <div key={idx} style={styles.featureItem}>
                      <span style={styles.featureCheck}>✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/#contact"
                  className={model.highlight ? "btn btn-primary" : "btn btn-secondary"}
                  style={styles.modelCta}
                >
                  Request Proposal
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section style={styles.sectorsSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={styles.sectionHeader}
          >
            <span style={styles.sectionKicker}>INDUSTRY EXPERTISE</span>
            <h2 style={styles.sectionTitle}>Sectors We Serve</h2>
            <p style={styles.sectionSubtitle}>
              Deep domain knowledge across Central Eurasia's key industries
            </p>
          </motion.div>

          <div style={styles.sectorsGrid}>
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.03 }}
                style={styles.sectorCard}
              >
                <div style={styles.sectorIcon}>{sector.icon}</div>
                <h4 style={styles.sectorName}>{sector.name}</h4>
                {sector.caseStudy && (
                  <span style={styles.caseStudyBadge}>
                    Case Study: {sector.caseStudy}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section style={styles.processSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={styles.sectionHeader}
          >
            <span style={{ ...styles.sectionKicker, color: 'rgba(255,255,255,0.7)' }}>HOW IT WORKS</span>
            <h2 style={{ ...styles.sectionTitle, color: 'white' }}>Our Delivery Process</h2>
          </motion.div>

          <div style={styles.processSteps}>
            {[
              { step: '01', title: 'Discovery Call', desc: 'Understand your goals and challenges' },
              { step: '02', title: 'Custom Proposal', desc: 'Tailored curriculum and timeline' },
              { step: '03', title: 'Training Delivery', desc: 'Execute the chosen format' },
              { step: '04', title: 'Demo Day & MVPs', desc: 'Showcase results and prototypes' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={styles.processStep}
              >
                <div style={styles.stepNumber}>{item.step}</div>
                <h4 style={styles.stepTitle}>{item.title}</h4>
                <p style={styles.stepDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={styles.ctaContent}
          >
            <h2 style={styles.ctaTitle}>Ready to Transform Your Organization?</h2>
            <p style={styles.ctaText}>
              Let's discuss how our Industry Innovation Tracks can drive measurable results for your team.
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/#contact" className="btn btn-ghost" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
                Schedule Discovery Call
              </Link>
              <Link to="/portfolio" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '16px 40px', background: 'white', color: '#5458FF' }}>
                View Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    paddingTop: '80px'
  },
  hero: {
    padding: 'var(--space-12) 0 var(--space-8)',
    position: 'relative',
    overflow: 'hidden'
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: '900px',
    margin: '0 auto'
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
    marginBottom: 'var(--space-3)',
    color: 'var(--text-primary)'
  },
  subtitle: {
    fontSize: 'var(--text-h4)',
    lineHeight: '1.6',
    color: 'var(--text-secondary)',
    maxWidth: '700px',
    margin: '0 auto'
  },
  modelsSection: {
    padding: 'var(--space-8) 0'
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: 'var(--space-6)',
    maxWidth: '700px',
    margin: '0 auto var(--space-6)'
  },
  sectionKicker: {
    display: 'inline-block',
    fontSize: 'var(--text-tiny)',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: '#5458FF',
    marginBottom: 'var(--space-2)'
  },
  sectionTitle: {
    fontSize: 'var(--text-h1)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-2)',
    fontFamily: 'var(--font-display)'
  },
  sectionSubtitle: {
    fontSize: 'var(--text-h4)',
    color: 'var(--text-secondary)',
    lineHeight: 1.6
  },
  modelsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--space-4)',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  modelCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-5)',
    border: '2px solid rgba(107, 151, 252, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'all 0.3s ease'
  },
  modelCardHighlight: {
    border: '2px solid #5458FF',
    boxShadow: '0 8px 32px rgba(84, 88, 255, 0.15)'
  },
  recommendedBadge: {
    position: 'absolute',
    top: '-12px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, #5458FF 0%, #6B97FC 100%)',
    color: 'white',
    fontSize: '10px',
    fontWeight: 700,
    padding: '6px 16px',
    borderRadius: '20px',
    letterSpacing: '0.1em'
  },
  modelIcon: {
    fontSize: '3rem',
    marginBottom: 'var(--space-3)'
  },
  modelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--space-2)'
  },
  modelTitle: {
    fontSize: 'var(--text-h3)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-display)',
    margin: 0
  },
  durationBadge: {
    fontSize: 'var(--text-tiny)',
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: '6px',
    background: 'rgba(84, 88, 255, 0.1)',
    color: '#5458FF'
  },
  modelDescription: {
    fontSize: 'var(--text-body)',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
    marginBottom: 'var(--space-3)'
  },
  bestForTag: {
    background: 'linear-gradient(135deg, rgba(84, 88, 255, 0.08) 0%, rgba(107, 151, 252, 0.08) 100%)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-2)',
    marginBottom: 'var(--space-3)'
  },
  bestForLabel: {
    fontSize: 'var(--text-tiny)',
    fontWeight: 700,
    color: '#5458FF',
    display: 'block',
    marginBottom: '4px'
  },
  bestForValue: {
    fontSize: 'var(--text-small)',
    color: 'var(--text-secondary)',
    fontWeight: 500
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: 'var(--space-4)',
    flex: 1
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: 'var(--text-small)',
    color: 'var(--text-secondary)'
  },
  featureCheck: {
    color: '#5458FF',
    fontWeight: 700
  },
  modelCta: {
    width: '100%',
    marginTop: 'auto'
  },
  sectorsSection: {
    padding: 'var(--space-8) 0',
    background: 'linear-gradient(135deg, rgba(84, 88, 255, 0.03) 0%, rgba(107, 151, 252, 0.05) 100%)'
  },
  sectorsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--space-3)',
    maxWidth: '900px',
    margin: '0 auto'
  },
  sectorCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    textAlign: 'center',
    border: '1px solid rgba(107, 151, 252, 0.15)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  sectorIcon: {
    fontSize: '2.5rem',
    marginBottom: 'var(--space-2)'
  },
  sectorName: {
    fontSize: 'var(--text-body)',
    fontWeight: 600,
    color: 'var(--text-primary)',
    margin: '0 0 8px 0',
    fontFamily: 'var(--font-display)'
  },
  caseStudyBadge: {
    display: 'inline-block',
    fontSize: '10px',
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #5458FF 0%, #6B97FC 100%)',
    color: 'white'
  },
  processSection: {
    padding: 'var(--space-10) 0',
    background: 'linear-gradient(135deg, #5458FF 0%, #6B97FC 100%)'
  },
  processSteps: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--space-4)',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  processStep: {
    textAlign: 'center',
    color: 'white'
  },
  stepNumber: {
    fontSize: 'var(--text-h1)',
    fontWeight: 800,
    fontFamily: 'var(--font-display)',
    opacity: 0.3,
    marginBottom: 'var(--space-2)'
  },
  stepTitle: {
    fontSize: 'var(--text-h4)',
    fontWeight: 700,
    marginBottom: '8px',
    color: 'white'
  },
  stepDesc: {
    fontSize: 'var(--text-small)',
    opacity: 0.85,
    lineHeight: 1.5
  },
  ctaSection: {
    background: 'var(--neutral-darkest)',
    padding: 'var(--space-12) 0',
    color: 'white',
    textAlign: 'center'
  },
  ctaContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  ctaTitle: {
    fontSize: 'var(--text-h1)',
    marginBottom: 'var(--space-3)',
    color: 'white',
    fontFamily: 'var(--font-display)'
  },
  ctaText: {
    fontSize: 'var(--text-h4)',
    marginBottom: 'var(--space-4)',
    opacity: 0.9,
    lineHeight: '1.6'
  },
  ctaButtons: {
    display: 'flex',
    gap: 'var(--space-3)',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
};

export default Services;
