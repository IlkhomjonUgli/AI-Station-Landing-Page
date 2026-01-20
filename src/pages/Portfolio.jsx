import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { buildURL, API_ENDPOINTS } from '../config/api';
import { useLanguage } from '../utils/contexts';

const Portfolio = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await fetch(buildURL(API_ENDPOINTS.portfolio));
      const data = await response.json();
      if (data.success) {
        setProjects(data.data.portfolios);
      }
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  // Category icons mapping
  const categoryIcons = {
    'finance': '💰',
    'healthcare': '🏥',
    'retail': '🛒',
    'logistics': '📦',
    'customer-service': '💬',
    'manufacturing': '⚙️',
    'technology': '💻',
    'education': '📚',
    'energy': '⚡',
    'real-estate': '🏢'
  };

  // Build categories dynamically from projects
  const categories = [
    { id: 'all', label: t('portfolioPage.allProjects'), icon: '🎯' },
    ...Array.from(new Set(projects.map(p => p.category))).map(cat => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' '),
      icon: categoryIcons[cat] || '📁'
    }))
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

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
            <h1 className="hero-title" style={styles.title}>
              {t('portfolioPage.heroTitle')} <span className="gradient-text">{t('portfolioPage.heroTitleHighlight')}</span>
            </h1>
            <p style={styles.subtitle}>
              {t('portfolioPage.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsSection}>
        <div className="container">
          <div style={styles.statsGrid}>
            {[
              { number: '150+', label: t('portfolioPage.projectsCompleted') },
              { number: '95%', label: t('portfolioPage.clientSatisfaction') },
              { number: '25+', label: t('portfolioPage.industryCoverage') },
              { number: '340%', label: t('portfolioPage.avgROI') }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={styles.statCard}
              >
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="section">
        <div className="container">
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={styles.filters}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  ...styles.filterBtn,
                  ...(selectedCategory === category.id ? styles.filterBtnActive : {})
                }}
              >
                <span style={{ marginRight: '8px' }}>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout style={styles.projectsGrid}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                style={styles.projectCard}
                onClick={() => setSelectedProject(project)}
              >
                {project.featured && (
                  <div style={styles.featuredBadge}>
                    ⭐ {t('portfolioPage.featured')}
                  </div>
                )}
                <div style={{
                  ...styles.projectIcon,
                  background: project.gradient
                }}>
                  {project.image && project.image.startsWith('/') ? (
                    <img src={project.image} alt={project.title} style={{ width: '48px', height: '48px' }} />
                  ) : (
                    <span style={{ fontSize: '3rem' }}>{project.image}</span>
                  )}
                </div>
                <h3 style={styles.projectTitle}>{project.title}</h3>
                <p style={styles.projectClient}>{project.client}</p>
                <p style={styles.projectDescription}>{project.description}</p>

                <div style={styles.techStack}>
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span key={idx} style={styles.techBadge}>{tech}</span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span style={styles.techBadge}>+{project.technologies.length - 3}</span>
                  )}
                </div>

                <button style={styles.viewDetailsBtn}>
                  {t('portfolioPage.viewCaseStudy')} →
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              style={styles.modal}
              onClick={(e) => e.stopPropagation()}
            >
              <button style={styles.closeBtn} onClick={() => setSelectedProject(null)}>
                ✕
              </button>

              <div style={styles.modalHeader}>
                <div style={{
                  ...styles.modalIcon,
                  background: selectedProject.gradient
                }}>
                  {selectedProject.image && selectedProject.image.startsWith('/') ? (
                    <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '64px', height: '64px' }} />
                  ) : (
                    <span style={{ fontSize: '4rem' }}>{selectedProject.image}</span>
                  )}
                </div>
                <h2 style={styles.modalTitle}>{selectedProject.title}</h2>
                <p style={styles.modalClient}>{selectedProject.client}</p>
              </div>

              <div style={styles.modalContent}>
                <div style={styles.modalSection}>
                  <h3 style={styles.modalSectionTitle}>Challenge</h3>
                  <p style={styles.modalText}>{selectedProject.challenge}</p>
                </div>

                <div style={styles.modalSection}>
                  <h3 style={styles.modalSectionTitle}>Solution</h3>
                  <p style={styles.modalText}>{selectedProject.solution}</p>
                </div>

                <div style={styles.modalSection}>
                  <h3 style={styles.modalSectionTitle}>Results</h3>
                  <div style={styles.resultsGrid}>
                    {selectedProject.results.map((result, idx) => (
                      <div key={idx} style={styles.resultItem}>
                        <span style={styles.resultIcon}>✓</span>
                        <span>{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={styles.modalSection}>
                  <h3 style={styles.modalSectionTitle}>Technologies Used</h3>
                  <div style={styles.techGrid}>
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} style={styles.modalTechBadge}>{tech}</span>
                    ))}
                  </div>
                </div>

                <Link to="/contact" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-4)' }}>
                  Start Your Project
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={styles.ctaContent}
          >
            <h2 style={styles.ctaTitle}>Ready to Start Your Success Story?</h2>
            <p style={styles.ctaText}>
              Join the ranks of successful businesses that have transformed with AI.
              Let's build something amazing together.
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/contact" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
                Discuss Your Project
              </Link>
              <Link to="/services" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
                Explore Our Services
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
    background: 'var(--bg-secondary)',
    padding: 'var(--space-12) 0 var(--space-8)',
    position: 'relative',
    overflow: 'hidden'
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: '900px',
    margin: '0 auto'
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
  statsSection: {
    padding: 'var(--space-8) 0',
    background: 'var(--bg-secondary)'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--space-4)'
  },
  statCard: {
    textAlign: 'center',
    padding: 'var(--space-3)'
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 800,
    background: 'var(--gradient-primary)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: 'var(--space-1)'
  },
  statLabel: {
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-body)',
    fontWeight: 600
  },
  filters: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-2)',
    justifyContent: 'center',
    marginBottom: 'var(--space-6)'
  },
  filterBtn: {
    padding: '12px 24px',
    background: '#FFFFFF',
    border: '2px solid #E5E5E5',
    borderRadius: '8px',
    color: '#000000',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center'
  },
  filterBtnActive: {
    background: '#2563EB',
    color: '#FFFFFF',
    borderColor: '#2563EB',
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: 'var(--space-4)',
    marginTop: 'var(--space-6)'
  },
  projectCard: {
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  featuredBadge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'var(--gradient-sunset)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-small)',
    fontWeight: 700
  },
  projectIcon: {
    width: '100px',
    height: '100px',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 'var(--space-3)'
  },
  projectTitle: {
    fontSize: 'var(--text-h3)',
    marginBottom: 'var(--space-1)',
    color: 'var(--text-primary)'
  },
  projectClient: {
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-small)',
    fontWeight: 600,
    marginBottom: 'var(--space-2)'
  },
  projectDescription: {
    color: 'var(--text-secondary)',
    marginBottom: 'var(--space-3)',
    lineHeight: '1.6',
    flex: 1
  },
  techStack: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-1)',
    marginBottom: 'var(--space-3)'
  },
  techBadge: {
    padding: '4px 12px',
    background: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-small)',
    color: 'var(--text-secondary)',
    fontWeight: 600
  },
  viewDetailsBtn: {
    width: '100%',
    padding: '12px',
    background: 'transparent',
    border: '2px solid var(--primary-blue)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--primary-blue)',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 'var(--text-body)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: 'var(--space-3)'
  },
  modal: {
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    maxWidth: '800px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
    boxShadow: 'var(--shadow-xl)'
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: 'var(--bg-secondary)',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-primary)',
    zIndex: 1
  },
  modalHeader: {
    padding: 'var(--space-6)',
    textAlign: 'center',
    background: 'var(--bg-secondary)',
    borderTopLeftRadius: 'var(--radius-lg)',
    borderTopRightRadius: 'var(--radius-lg)'
  },
  modalIcon: {
    width: '120px',
    height: '120px',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto var(--space-3)'
  },
  modalTitle: {
    fontSize: 'var(--text-h2)',
    marginBottom: 'var(--space-1)',
    color: 'var(--text-primary)'
  },
  modalClient: {
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-body)',
    fontWeight: 600
  },
  modalContent: {
    padding: 'var(--space-6)'
  },
  modalSection: {
    marginBottom: 'var(--space-4)'
  },
  modalSectionTitle: {
    fontSize: 'var(--text-h4)',
    marginBottom: 'var(--space-2)',
    color: 'var(--primary-blue)'
  },
  modalText: {
    color: 'var(--text-secondary)',
    lineHeight: '1.6'
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--space-2)'
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    padding: 'var(--space-2)',
    background: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-sm)'
  },
  resultIcon: {
    color: 'var(--secondary-emerald)',
    fontWeight: 700,
    fontSize: '1.2rem'
  },
  techGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-2)'
  },
  modalTechBadge: {
    padding: '8px 16px',
    background: 'var(--gradient-primary)',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-small)',
    fontWeight: 600
  },
  ctaSection: {
    background: 'var(--gradient-secondary)',
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
    color: 'white'
  },
  ctaText: {
    fontSize: 'var(--text-h4)',
    marginBottom: 'var(--space-4)',
    opacity: 0.95,
    lineHeight: '1.6'
  },
  ctaButtons: {
    display: 'flex',
    gap: 'var(--space-3)',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
};

export default Portfolio;
