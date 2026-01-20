import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { buildURL, API_ENDPOINTS } from '../config/api';
import { useLanguage } from '../utils/contexts';

const Services = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(buildURL(API_ENDPOINTS.services));
      const data = await response.json();
      if (data.success) {
        setServices(data.data.services);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Category icons mapping
  const categoryIcons = {
    'consulting': '💼',
    'development': '⚙️',
    'analytics': '📊',
    'training': '🎓',
    'integration': '🔗',
    'optimization': '🔍',
    'strategy': '🎯',
    'automation': '🤖'
  };

  // Build categories dynamically from services
  const uniqueCategories = [...new Set(services.map(s => s.category).filter(Boolean))];
  const categories = [
    { id: 'all', label: t('servicesPage.allServices'), icon: '🎯' },
    ...uniqueCategories.map(cat => ({
      id: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' '),
      icon: categoryIcons[cat] || '📁'
    }))
  ];

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(service => service.category === activeCategory);

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
              {t('servicesPage.heroTitle')} <span className="gradient-text">{t('servicesPage.heroTitleHighlight')}</span>
            </h1>
            <p style={styles.subtitle}>
              {t('servicesPage.heroSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>Loading services...</p>
            </div>
          ) : (
            <>
              {/* Category Filters - only show if there are categories */}
              {categories.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={styles.filters}
                >
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      style={{
                        ...styles.filterBtn,
                        ...(activeCategory === category.id ? styles.filterBtnActive : {})
                      }}
                    >
                      <span style={{ marginRight: '8px' }}>{category.icon}</span>
                      <span>{category.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Services Grid */}
              <motion.div
                layout
                style={styles.servicesGrid}
              >
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    style={styles.serviceCard}
                  >
                    {service.popular && (
                      <div style={styles.popularBadge}>
                        ⭐ {t('servicesPage.mostPopular')}
                      </div>
                    )}
                    <div style={styles.serviceIcon}>
                      {service.icon && service.icon.startsWith('/') ? (
                        <img src={service.icon} alt={service.title} style={{ width: '48px', height: '48px' }} />
                      ) : (
                        service.icon
                      )}
                    </div>
                    <h3 style={styles.serviceTitle}>{service.title}</h3>
                    <p style={styles.serviceDescription}>{service.description}</p>

                    {service.features && Array.isArray(service.features) && service.features.length > 0 && (
                      <div style={styles.features}>
                        {service.features.map((feature, idx) => (
                          <div key={idx} style={styles.feature}>
                            <span style={styles.featureCheck}>✓</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <Link to="/contact" className="btn btn-primary" style={styles.ctaBtn}>
                      {t('servicesPage.getStarted')}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
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
            <h2 style={styles.ctaTitle}>{t('servicesPage.ctaTitle')}</h2>
            <p style={styles.ctaText}>
              {t('servicesPage.ctaSubtitle')}
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/contact" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
                {t('servicesPage.scheduleConsultation')}
              </Link>
              <Link to="/portfolio" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
                {t('servicesPage.viewOurWork')}
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
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: 'var(--space-4)',
    marginTop: 'var(--space-6)'
  },
  serviceCard: {
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  popularBadge: {
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
  serviceIcon: {
    fontSize: '3rem',
    marginBottom: 'var(--space-2)'
  },
  serviceTitle: {
    fontSize: 'var(--text-h3)',
    marginBottom: 'var(--space-2)',
    color: 'var(--text-primary)'
  },
  serviceDescription: {
    color: 'var(--text-secondary)',
    marginBottom: 'var(--space-3)',
    lineHeight: '1.6'
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)',
    marginBottom: 'var(--space-4)',
    flex: 1
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-small)'
  },
  featureCheck: {
    color: 'var(--secondary-emerald)',
    fontWeight: 700,
    fontSize: '1rem'
  },
  ctaBtn: {
    width: '100%',
    marginTop: 'auto'
  },
  ctaSection: {
    background: 'var(--gradient-primary)',
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

export default Services;
