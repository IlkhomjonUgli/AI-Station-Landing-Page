import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import { useLanguage } from '../utils/contexts';
import { getPageSEO } from '../config/seo';
import { generateCourseSchema, generateItemListSchema } from '../utils/structuredData';

const Programs = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('academy');

  // AIS Academy - Professional Tracks
  const professionalTracks = [
    {
      title: 'Design Thinking with AI',
      duration: '1 month',
      level: 'Foundational',
      description: 'Identifying user problems and validating ideas before building.',
      icon: '💡'
    },
    {
      title: 'AI for Students',
      duration: '1 month',
      level: 'Foundational',
      description: 'Mastering existing AI tools for academic and personal productivity.',
      icon: '🎒'
    },
    {
      title: 'AI Practitioners',
      duration: '1.5 months',
      level: 'Foundations',
      description: 'Master the basics of artificial intelligence and practical applications.',
      icon: '🤖'
    },
    {
      title: 'Data Science Foundation',
      duration: '3 months',
      level: 'Analytics & Cleaning',
      description: 'Deep dive into data analysis, cleaning, and visualization techniques.',
      icon: '📊'
    },
    {
      title: 'Machine Learning',
      duration: '3 months',
      level: 'Regression, Classification, Deployment',
      description: 'Build and deploy ML models for real-world applications.',
      icon: '🧠'
    },
    {
      title: 'Deep Learning',
      duration: '3 months',
      level: 'Neural Networks, GenAI',
      description: 'Master neural architectures and generative AI technologies.',
      icon: '⚡'
    },
    {
      title: 'Natural Language Processing',
      duration: '10 months',
      level: 'LLMs, Transformers',
      description: 'Build language models and master transformer architectures.',
      icon: '💬'
    },
    {
      title: 'Computer Vision',
      duration: '10 months',
      level: 'Object Detection, Video Analysis',
      description: 'Develop vision systems for detection and video analytics.',
      icon: '👁️'
    }
  ];

  // AIS Academy - Specialized Bootcamps
  const specializedBootcamps = [
    {
      title: 'AI with Fintech',
      target: 'Banking Professionals',
      description: 'Leverage AI in financial services and strategic decision-making.',
      icon: '🏦'
    },
    {
      title: 'AI with Medics',
      target: 'Healthcare Innovation',
      description: 'Apply AI to healthcare diagnostics and patient care.',
      icon: '🏥'
    },
    {
      title: 'AI in Teaching',
      target: 'Academia & Industry',
      description: 'Bridge educational theory with practical AI implementation.',
      icon: '🎓'
    },
    {
      title: 'AI in Professional Content Creation',
      target: 'Creatives and Marketers',
      description: 'Video generation, editing, and media synthesis using AI tools.',
      icon: '🎬'
    },
    {
      title: 'Vibe Coding A to Z',
      target: 'Modern Rapid Development',
      description: 'Master AI-assisted development for rapid prototyping.',
      icon: '🚀'
    },
    {
      title: 'Executive AI Education',
      target: 'C-Level Leadership',
      description: 'Strategic AI adoption for organizational transformation.',
      icon: '👔'
    }
  ];

  // AIS Studio - 3-Step Process
  const studioSteps = [
    {
      step: 1,
      title: 'AIpreneurship',
      duration: '2 Months',
      focus: 'Idea Validation & Pitching',
      description: 'Transform your AI idea into a validated business concept with investor-ready pitch materials.',
      deliverables: ['Validated Problem-Solution Fit', 'Pitch Deck', 'Business Model Canvas']
    },
    {
      step: 2,
      title: 'Incubation',
      duration: '2 Months',
      focus: 'MVP Development',
      description: 'Build your minimum viable product with hands-on mentorship from industry experts.',
      deliverables: ['Low-Fidelity Prototype', 'High-Fidelity MVP', 'Technical Documentation']
    },
    {
      step: 3,
      title: 'Acceleration',
      duration: '2 Months',
      focus: 'Go-to-Market & Investor Relations',
      description: 'Launch your startup with strategic guidance and connect with investors and partners.',
      deliverables: ['GTM Strategy', 'Investor Network Access', 'Demo Day Presentation']
    }
  ];

  // Get SEO metadata for programs page
  const pageSEO = getPageSEO('programs', language);

  // Generate course schemas for all programs
  const allPrograms = [...professionalTracks, ...specializedBootcamps];
  const courseSchemas = allPrograms.map(program => generateCourseSchema(program, language));

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      {/* SEO Meta Tags */}
      <SEO {...pageSEO} language={language} />

      {/* Structured Data (JSON-LD) for Courses */}
      <StructuredData data={courseSchemas} />

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
          >
            <h1 className="hero-title" style={{ marginBottom: 'var(--space-3)' }}>
              Our <span className="gradient-text">Programs</span>
            </h1>
            <p style={{ fontSize: 'var(--text-h4)', opacity: 0.9, lineHeight: 1.7 }}>
              Two paths to AI excellence: Learn with Academy, Build with Studio
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section style={styles.tabSection}>
        <div className="container">
          <div style={styles.tabContainer}>
            <motion.button
              onClick={() => setActiveTab('academy')}
              style={{
                ...styles.tabButton,
                ...(activeTab === 'academy' ? styles.tabActive : styles.tabInactive)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span style={styles.tabIcon}>🎓</span>
              <div>
                <div style={styles.tabTitle}>AIS Academy</div>
                <div style={styles.tabSubtitle}>Learn & Master</div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => setActiveTab('studio')}
              style={{
                ...styles.tabButton,
                ...(activeTab === 'studio' ? styles.tabActive : styles.tabInactive)
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span style={styles.tabIcon}>🚀</span>
              <div>
                <div style={styles.tabTitle}>AIS Studio</div>
                <div style={styles.tabSubtitle}>Build & Launch</div>
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'academy' ? (
          <motion.div
            key="academy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Academy Hero */}
            <section style={styles.contentHero}>
              <div className="container">
                <div style={styles.contentHeroInner}>
                  <span style={styles.kicker}>AIS ACADEMY</span>
                  <h2 style={styles.contentTitle}>From Zero to Industry-Ready</h2>
                  <p style={styles.contentSubtitle}>
                    Comprehensive AI education pathways designed for every skill level
                  </p>
                </div>
              </div>
            </section>

            {/* Professional Tracks */}
            <section style={styles.trackSection}>
              <div className="container">
                <div style={styles.categoryHeader}>
                  <span style={styles.categoryIcon}>📚</span>
                  <h3 style={styles.categoryTitle}>Professional Tracks</h3>
                </div>
                <div style={styles.tracksGrid}>
                  {professionalTracks.map((track, index) => (
                    <motion.div
                      key={track.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      style={styles.trackCard}
                    >
                      <div style={styles.trackIconWrap}>{track.icon}</div>
                      <div style={styles.trackContent}>
                        <h4 style={styles.trackTitle}>{track.title}</h4>
                        <div style={styles.trackMeta}>
                          <span style={styles.durationBadge}>{track.duration}</span>
                          <span style={styles.levelBadge}>{track.level}</span>
                        </div>
                        <p style={styles.trackDesc}>{track.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Specialized Bootcamps */}
            <section style={styles.bootcampSection}>
              <div className="container">
                <div style={styles.categoryHeader}>
                  <span style={styles.categoryIcon}>⚡</span>
                  <h3 style={styles.categoryTitle}>Specialized Bootcamps</h3>
                  <span style={styles.newBadge}>NEW</span>
                </div>
                <div style={styles.bootcampsGrid}>
                  {specializedBootcamps.map((bootcamp, index) => (
                    <motion.div
                      key={bootcamp.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      style={styles.bootcampCard}
                    >
                      <div style={styles.bootcampIcon}>{bootcamp.icon}</div>
                      <h4 style={styles.bootcampTitle}>{bootcamp.title}</h4>
                      <span style={styles.targetBadge}>{bootcamp.target}</span>
                      <p style={styles.bootcampDesc}>{bootcamp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="studio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Studio Hero */}
            <section style={styles.contentHero}>
              <div className="container">
                <div style={styles.contentHeroInner}>
                  <span style={styles.kicker}>AIS STUDIO</span>
                  <h2 style={styles.contentTitle}>Building the Next Generation of AI Entrepreneurs</h2>
                  <p style={styles.contentSubtitle}>
                    A 6-month journey from idea to market-ready AI startup
                  </p>
                </div>
              </div>
            </section>

            {/* 3-Step Process */}
            <section style={styles.studioSection}>
              <div className="container">
                <div style={styles.processFlow}>
                  {studioSteps.map((step, index) => (
                    <React.Fragment key={step.step}>
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        style={styles.stepCard}
                      >
                        <div style={styles.stepNumber}>
                          <span style={styles.stepNumText}>{step.step}</span>
                        </div>
                        <div style={styles.stepContent}>
                          <div style={styles.stepHeader}>
                            <h3 style={styles.stepTitle}>{step.title}</h3>
                            <span style={styles.stepDuration}>{step.duration}</span>
                          </div>
                          <div style={styles.focusBadge}>
                            <span style={styles.focusIcon}>🎯</span>
                            {step.focus}
                          </div>
                          <p style={styles.stepDesc}>{step.description}</p>
                          <div style={styles.deliverables}>
                            <span style={styles.deliverablesLabel}>Deliverables:</span>
                            <ul style={styles.deliverablesList}>
                              {step.deliverables.map((d, i) => (
                                <li key={i} style={styles.deliverableItem}>✓ {d}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>

                      {index < studioSteps.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + 0.1 }}
                          style={styles.arrowConnector}
                        >
                          <span style={styles.arrowIcon}>→</span>
                        </motion.div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Studio Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={styles.studioStats}
                >
                  <div style={styles.statItem}>
                    <span style={styles.statValue}>6</span>
                    <span style={styles.statLabel}>Months Total</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statValue}>3</span>
                    <span style={styles.statLabel}>Distinct Phases</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statValue}>∞</span>
                    <span style={styles.statLabel}>Mentorship Access</span>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
          >
            <h2 style={{ fontSize: 'var(--text-h1)', fontWeight: 800, marginBottom: 'var(--space-3)' }}>
              Ready to Start Your AI Journey?
            </h2>
            <p style={{ fontSize: 'var(--text-h4)', marginBottom: 'var(--space-6)', opacity: 0.95 }}>
              {activeTab === 'academy'
                ? 'Join hundreds of students transforming their careers with AI Station'
                : 'Turn your AI idea into a funded startup with our expert guidance'
              }
            </p>
            <button className="btn btn-ghost" style={{ fontSize: 'var(--text-h4)', padding: '16px 40px' }}>
              Schedule Free Consultation
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  heroSection: {
    background: 'var(--gradient-dark)',
    padding: 'var(--space-12) 0',
    color: 'white'
  },
  tabSection: {
    padding: 'var(--space-6) 0',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(107, 151, 252, 0.15)',
    position: 'sticky',
    top: '80px',
    zIndex: 10
  },
  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--space-4)'
  },
  tabButton: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    padding: '16px 32px',
    borderRadius: 'var(--radius-lg)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'var(--font-display)'
  },
  tabActive: {
    background: 'linear-gradient(135deg, #5458FF 0%, #6B97FC 100%)',
    color: 'white',
    boxShadow: '0 4px 20px rgba(84, 88, 255, 0.3)'
  },
  tabInactive: {
    background: 'white',
    color: 'var(--text-primary)',
    border: '2px solid rgba(107, 151, 252, 0.2)'
  },
  tabIcon: {
    fontSize: '2rem'
  },
  tabTitle: {
    fontSize: 'var(--text-h4)',
    fontWeight: 700,
    textAlign: 'left'
  },
  tabSubtitle: {
    fontSize: 'var(--text-small)',
    opacity: 0.8,
    textAlign: 'left'
  },
  contentHero: {
    padding: 'var(--space-8) 0',
    textAlign: 'center'
  },
  contentHeroInner: {
    maxWidth: '700px',
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
  contentTitle: {
    fontSize: 'var(--text-h1)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    marginBottom: 'var(--space-3)',
    fontFamily: 'var(--font-display)',
    lineHeight: 1.2
  },
  contentSubtitle: {
    fontSize: 'var(--text-h4)',
    color: 'var(--text-secondary)',
    lineHeight: 1.6
  },
  trackSection: {
    padding: 'var(--space-6) 0'
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    marginBottom: 'var(--space-5)'
  },
  categoryIcon: {
    fontSize: '1.5rem'
  },
  categoryTitle: {
    fontSize: 'var(--text-h3)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-display)',
    margin: 0
  },
  newBadge: {
    background: 'linear-gradient(135deg, #FF5458 0%, #FF8A65 100%)',
    color: 'white',
    fontSize: '10px',
    fontWeight: 700,
    padding: '4px 10px',
    borderRadius: '12px',
    letterSpacing: '0.1em'
  },
  tracksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'var(--space-4)'
  },
  trackCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    border: '1px solid rgba(107, 151, 252, 0.15)',
    display: 'flex',
    gap: 'var(--space-3)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  trackIconWrap: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, rgba(84, 88, 255, 0.1) 0%, rgba(107, 151, 252, 0.1) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    flexShrink: 0
  },
  trackContent: {
    flex: 1
  },
  trackTitle: {
    fontSize: 'var(--text-body)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: '0 0 6px 0',
    fontFamily: 'var(--font-display)'
  },
  trackMeta: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '8px'
  },
  durationBadge: {
    fontSize: '11px',
    fontWeight: 600,
    padding: '3px 8px',
    borderRadius: '6px',
    background: 'rgba(84, 88, 255, 0.1)',
    color: '#5458FF'
  },
  levelBadge: {
    fontSize: '11px',
    fontWeight: 500,
    padding: '3px 8px',
    borderRadius: '6px',
    background: 'rgba(107, 151, 252, 0.1)',
    color: 'var(--text-secondary)'
  },
  trackDesc: {
    fontSize: 'var(--text-small)',
    color: 'var(--text-secondary)',
    margin: 0,
    lineHeight: 1.5
  },
  bootcampSection: {
    padding: 'var(--space-6) 0 var(--space-8)'
  },
  bootcampsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 'var(--space-3)'
  },
  bootcampCard: {
    background: 'linear-gradient(135deg, rgba(84, 88, 255, 0.05) 0%, rgba(107, 151, 252, 0.08) 100%)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    textAlign: 'center',
    border: '1px dashed rgba(84, 88, 255, 0.25)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  bootcampIcon: {
    fontSize: '2.5rem',
    marginBottom: 'var(--space-2)'
  },
  bootcampTitle: {
    fontSize: 'var(--text-body)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: '0 0 8px 0',
    fontFamily: 'var(--font-display)'
  },
  targetBadge: {
    display: 'inline-block',
    fontSize: '10px',
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #5458FF 0%, #6B97FC 100%)',
    color: 'white',
    marginBottom: '10px'
  },
  bootcampDesc: {
    fontSize: 'var(--text-tiny)',
    color: 'var(--text-secondary)',
    margin: 0,
    lineHeight: 1.5
  },
  studioSection: {
    padding: 'var(--space-6) 0 var(--space-8)'
  },
  processFlow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 'var(--space-3)',
    flexWrap: 'wrap'
  },
  stepCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-5)',
    width: '320px',
    border: '2px solid rgba(84, 88, 255, 0.15)',
    boxShadow: '0 8px 32px rgba(84, 88, 255, 0.1)',
    position: 'relative'
  },
  stepNumber: {
    position: 'absolute',
    top: '-16px',
    left: '24px',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #5458FF 0%, #6B97FC 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(84, 88, 255, 0.3)'
  },
  stepNumText: {
    color: 'white',
    fontWeight: 800,
    fontSize: 'var(--text-body)',
    fontFamily: 'var(--font-display)'
  },
  stepContent: {
    marginTop: 'var(--space-2)'
  },
  stepHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--space-2)'
  },
  stepTitle: {
    fontSize: 'var(--text-h3)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: 0,
    fontFamily: 'var(--font-display)'
  },
  stepDuration: {
    fontSize: 'var(--text-small)',
    fontWeight: 600,
    color: '#5458FF',
    background: 'rgba(84, 88, 255, 0.1)',
    padding: '4px 10px',
    borderRadius: '6px'
  },
  focusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: 'var(--text-small)',
    fontWeight: 600,
    color: '#5458FF',
    marginBottom: 'var(--space-2)'
  },
  focusIcon: {
    fontSize: '1rem'
  },
  stepDesc: {
    fontSize: 'var(--text-small)',
    color: 'var(--text-secondary)',
    margin: '0 0 var(--space-3) 0',
    lineHeight: 1.6
  },
  deliverables: {
    background: 'rgba(107, 151, 252, 0.05)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-2)'
  },
  deliverablesLabel: {
    fontSize: '10px',
    fontWeight: 700,
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    display: 'block',
    marginBottom: '6px'
  },
  deliverablesList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  deliverableItem: {
    fontSize: 'var(--text-tiny)',
    color: 'var(--text-secondary)',
    marginBottom: '2px'
  },
  arrowConnector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px'
  },
  arrowIcon: {
    fontSize: '2rem',
    color: '#5458FF',
    fontWeight: 300
  },
  studioStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--space-8)',
    marginTop: 'var(--space-6)',
    padding: 'var(--space-4)',
    background: 'linear-gradient(135deg, rgba(84, 88, 255, 0.08) 0%, rgba(107, 151, 252, 0.08) 100%)',
    borderRadius: 'var(--radius-lg)'
  },
  statItem: {
    textAlign: 'center'
  },
  statValue: {
    display: 'block',
    fontSize: 'var(--text-h1)',
    fontWeight: 800,
    fontFamily: 'var(--font-display)',
    background: 'linear-gradient(135deg, #5458FF 0%, #6B97FC 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1
  },
  statLabel: {
    fontSize: 'var(--text-small)',
    color: 'var(--text-secondary)',
    fontWeight: 500
  },
  ctaSection: {
    background: 'linear-gradient(135deg, #5458FF 0%, #6B97FC 100%)',
    padding: 'var(--space-12) 0',
    color: 'white'
  }
};

export default Programs;
