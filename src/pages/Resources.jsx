import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'Introduction to Machine Learning',
      category: 'tutorials',
      type: 'Video Course',
      duration: '8 hours',
      level: 'Beginner',
      description: 'Learn the fundamentals of machine learning with hands-on examples and practical projects.',
      icon: '🎓',
      topics: ['Supervised Learning', 'Neural Networks', 'Python Basics', 'Model Training'],
      link: '/resources/ml-intro'
    },
    {
      id: 2,
      title: 'AI for Business Leaders',
      category: 'guides',
      type: 'E-Book',
      pages: '120 pages',
      level: 'All Levels',
      description: 'Comprehensive guide on implementing AI strategies in your organization.',
      icon: '📚',
      topics: ['AI Strategy', 'ROI Analysis', 'Team Building', 'Change Management'],
      link: '/resources/ai-business-guide'
    },
    {
      id: 3,
      title: 'Natural Language Processing Masterclass',
      category: 'tutorials',
      type: 'Interactive Course',
      duration: '12 hours',
      level: 'Advanced',
      description: 'Master NLP techniques from tokenization to transformer models.',
      icon: '🤖',
      topics: ['Transformers', 'BERT', 'GPT', 'Text Classification'],
      link: '/resources/nlp-masterclass',
      popular: true
    },
    {
      id: 4,
      title: 'Data Science Toolkit',
      category: 'tools',
      type: 'Resource Pack',
      items: '50+ Tools',
      level: 'All Levels',
      description: 'Curated collection of essential data science tools, libraries, and frameworks.',
      icon: '🛠️',
      topics: ['Python Libraries', 'Visualization', 'Data Processing', 'ML Frameworks'],
      link: '/resources/ds-toolkit'
    },
    {
      id: 5,
      title: 'AI Ethics & Governance',
      category: 'guides',
      type: 'White Paper',
      pages: '45 pages',
      level: 'All Levels',
      description: 'Navigate the ethical challenges and governance frameworks in AI development.',
      icon: '⚖️',
      topics: ['AI Ethics', 'Bias Detection', 'Privacy', 'Compliance'],
      link: '/resources/ai-ethics'
    },
    {
      id: 6,
      title: 'Computer Vision with PyTorch',
      category: 'tutorials',
      type: 'Hands-on Workshop',
      duration: '10 hours',
      level: 'Intermediate',
      description: 'Build real-world computer vision applications using PyTorch.',
      icon: '👁️',
      topics: ['CNNs', 'Object Detection', 'Image Segmentation', 'Transfer Learning'],
      link: '/resources/cv-pytorch'
    },
    {
      id: 7,
      title: 'Weekly AI Newsletter',
      category: 'news',
      type: 'Newsletter',
      frequency: 'Weekly',
      level: 'All Levels',
      description: 'Stay updated with the latest AI trends, research papers, and industry news.',
      icon: '📰',
      topics: ['Research Papers', 'Industry News', 'Best Practices', 'Tools & Updates'],
      link: '/resources/newsletter'
    },
    {
      id: 8,
      title: 'Deployment Best Practices',
      category: 'guides',
      type: 'Technical Guide',
      pages: '80 pages',
      level: 'Intermediate',
      description: 'Learn how to deploy ML models to production with confidence.',
      icon: '🚀',
      topics: ['MLOps', 'Docker', 'Cloud Deployment', 'Monitoring'],
      link: '/resources/ml-deployment',
      popular: true
    },
    {
      id: 9,
      title: 'AI Research Paper Library',
      category: 'research',
      type: 'Database',
      items: '1000+ Papers',
      level: 'Advanced',
      description: 'Access our curated collection of groundbreaking AI research papers.',
      icon: '🔬',
      topics: ['Deep Learning', 'Reinforcement Learning', 'GANs', 'Transformers'],
      link: '/resources/research-library'
    },
    {
      id: 10,
      title: 'AI Interview Preparation',
      category: 'guides',
      type: 'Study Guide',
      questions: '200+ Questions',
      level: 'Intermediate',
      description: 'Ace your AI/ML interviews with our comprehensive preparation guide.',
      icon: '💼',
      topics: ['Technical Questions', 'Coding Challenges', 'System Design', 'Behavioral'],
      link: '/resources/interview-prep'
    },
    {
      id: 11,
      title: 'Python for AI Development',
      category: 'tutorials',
      type: 'Video Series',
      duration: '15 hours',
      level: 'Beginner',
      description: 'Master Python programming specifically for AI and ML development.',
      icon: '🐍',
      topics: ['NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow'],
      link: '/resources/python-ai'
    },
    {
      id: 12,
      title: 'Community Forum & Support',
      category: 'community',
      type: 'Platform',
      members: '50K+ Members',
      level: 'All Levels',
      description: 'Join our vibrant community of AI practitioners and experts.',
      icon: '👥',
      topics: ['Q&A', 'Project Showcase', 'Mentorship', 'Networking'],
      link: '/resources/community'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', icon: '🎯' },
    { id: 'tutorials', label: 'Tutorials', icon: '🎓' },
    { id: 'guides', label: 'Guides', icon: '📚' },
    { id: 'tools', label: 'Tools', icon: '🛠️' },
    { id: 'research', label: 'Research', icon: '🔬' },
    { id: 'news', label: 'News', icon: '📰' },
    { id: 'community', label: 'Community', icon: '👥' }
  ];

  const filteredResources = selectedCategory === 'all'
    ? resources
    : resources.filter(resource => resource.category === selectedCategory);

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
              Learn, Grow, <span className="gradient-text">Excel</span>
            </h1>
            <p style={styles.subtitle}>
              Access our comprehensive library of AI resources, tutorials, and learning materials.
              Everything you need to master artificial intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Stats */}
      <section style={styles.statsSection}>
        <div className="container">
          <div style={styles.statsGrid}>
            {[
              { number: '500+', label: 'Learning Resources', icon: '📚' },
              { number: '50K+', label: 'Community Members', icon: '👥' },
              { number: '1000+', label: 'Research Papers', icon: '🔬' },
              { number: '100%', label: 'Free Access', icon: '🎁' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={styles.statCard}
              >
                <div style={styles.statIcon}>{stat.icon}</div>
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}
          >
            <h2 style={styles.sectionTitle}>Browse Resources</h2>
            <p style={styles.sectionSubtitle}>
              Find the perfect learning materials for your AI journey
            </p>
          </motion.div>

          {/* Category Filters */}
          <div style={styles.filters}>
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
          </div>

          {/* Resources Grid */}
          <motion.div layout style={styles.resourcesGrid}>
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                style={styles.resourceCard}
              >
                {resource.popular && (
                  <div style={styles.popularBadge}>
                    ⭐ Popular
                  </div>
                )}
                <div style={styles.resourceIcon}>{resource.icon}</div>
                <h3 style={styles.resourceTitle}>{resource.title}</h3>
                <div style={styles.resourceMeta}>
                  <span style={styles.resourceType}>{resource.type}</span>
                  <span style={styles.resourceLevel}>{resource.level}</span>
                </div>
                <p style={styles.resourceDescription}>{resource.description}</p>

                <div style={styles.topics}>
                  {resource.topics.map((topic, idx) => (
                    <span key={idx} style={styles.topicTag}>{topic}</span>
                  ))}
                </div>

                <div style={styles.resourceFooter}>
                  <div style={styles.resourceInfo}>
                    {resource.duration && <span>⏰ {resource.duration}</span>}
                    {resource.pages && <span>📄 {resource.pages}</span>}
                    {resource.items && <span>📦 {resource.items}</span>}
                    {resource.frequency && <span>📅 {resource.frequency}</span>}
                    {resource.questions && <span>❓ {resource.questions}</span>}
                    {resource.members && <span>👥 {resource.members}</span>}
                  </div>
                  <Link
                    to={resource.link}
                    className="btn btn-primary"
                    style={{ marginTop: 'var(--space-2)', width: '100%' }}
                  >
                    Access Resource →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section style={styles.pathsSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}
          >
            <h2 style={styles.sectionTitle}>Recommended Learning Paths</h2>
            <p style={styles.sectionSubtitle}>
              Structured journeys to help you master AI step by step
            </p>
          </motion.div>

          <div style={styles.pathsGrid}>
            {[
              {
                title: 'AI Beginner Path',
                duration: '3 months',
                resources: 12,
                description: 'Start your AI journey from scratch',
                gradient: 'var(--gradient-primary)'
              },
              {
                title: 'Data Science Track',
                duration: '4 months',
                resources: 18,
                description: 'Become a data science professional',
                gradient: 'var(--gradient-accent)'
              },
              {
                title: 'Deep Learning Specialist',
                duration: '6 months',
                resources: 24,
                description: 'Master advanced deep learning',
                gradient: 'var(--gradient-secondary)'
              },
              {
                title: 'AI Business Leader',
                duration: '2 months',
                resources: 10,
                description: 'Lead AI transformation in your organization',
                gradient: 'var(--gradient-purple)'
              }
            ].map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{
                  ...styles.pathCard,
                  background: path.gradient
                }}
              >
                <h3 style={styles.pathTitle}>{path.title}</h3>
                <p style={styles.pathDescription}>{path.description}</p>
                <div style={styles.pathMeta}>
                  <span>⏰ {path.duration}</span>
                  <span>📚 {path.resources} resources</span>
                </div>
                <Link
                  to="/programs"
                  className="btn btn-ghost"
                  style={{ marginTop: 'var(--space-3)', width: '100%' }}
                >
                  Start Learning
                </Link>
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
            <h2 style={styles.ctaTitle}>Ready to Start Learning?</h2>
            <p style={styles.ctaText}>
              Join thousands of learners who are transforming their careers with AI.
              Get started with our free resources today.
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/programs" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
                Explore Programs
              </Link>
              <Link to="/contact" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
                Get Guidance
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
    background: 'var(--gradient-dark)',
    padding: 'var(--space-12) 0 var(--space-8)',
    position: 'relative',
    overflow: 'hidden'
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: '900px',
    margin: '0 auto',
    color: 'white'
  },
  title: {
    marginBottom: 'var(--space-3)',
    color: 'white'
  },
  subtitle: {
    fontSize: 'var(--text-h4)',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.9)',
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
  statIcon: {
    fontSize: '2.5rem',
    marginBottom: 'var(--space-1)'
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
  sectionTitle: {
    fontSize: 'var(--text-h1)',
    marginBottom: 'var(--space-2)',
    color: 'var(--text-primary)'
  },
  sectionSubtitle: {
    fontSize: 'var(--text-h4)',
    color: 'var(--text-secondary)',
    maxWidth: '600px',
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
    background: 'var(--bg-secondary)',
    border: '2px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: 'var(--text-body)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center'
  },
  filterBtnActive: {
    background: 'var(--gradient-primary)',
    color: 'white',
    borderColor: 'transparent',
    boxShadow: 'var(--shadow-glow)'
  },
  resourcesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 'var(--space-4)',
    marginTop: 'var(--space-6)'
  },
  resourceCard: {
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
  resourceIcon: {
    fontSize: '3rem',
    marginBottom: 'var(--space-2)'
  },
  resourceTitle: {
    fontSize: 'var(--text-h3)',
    marginBottom: 'var(--space-2)',
    color: 'var(--text-primary)'
  },
  resourceMeta: {
    display: 'flex',
    gap: 'var(--space-2)',
    marginBottom: 'var(--space-2)',
    flexWrap: 'wrap'
  },
  resourceType: {
    padding: '4px 12px',
    background: 'var(--gradient-primary)',
    color: 'white',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-small)',
    fontWeight: 600
  },
  resourceLevel: {
    padding: '4px 12px',
    background: 'var(--bg-secondary)',
    color: 'var(--text-secondary)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-small)',
    fontWeight: 600
  },
  resourceDescription: {
    color: 'var(--text-secondary)',
    marginBottom: 'var(--space-3)',
    lineHeight: '1.6',
    flex: 1
  },
  topics: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-1)',
    marginBottom: 'var(--space-3)'
  },
  topicTag: {
    padding: '4px 8px',
    background: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-tiny)',
    color: 'var(--text-secondary)',
    fontWeight: 600
  },
  resourceFooter: {
    marginTop: 'auto'
  },
  resourceInfo: {
    display: 'flex',
    gap: 'var(--space-2)',
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-small)',
    marginBottom: 'var(--space-2)',
    flexWrap: 'wrap'
  },
  pathsSection: {
    background: 'var(--bg-secondary)',
    padding: 'var(--space-12) 0'
  },
  pathsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'var(--space-4)'
  },
  pathCard: {
    padding: 'var(--space-4)',
    borderRadius: 'var(--radius-lg)',
    color: 'white',
    textAlign: 'center',
    transition: 'all 0.3s ease'
  },
  pathTitle: {
    fontSize: 'var(--text-h3)',
    marginBottom: 'var(--space-2)',
    color: 'white'
  },
  pathDescription: {
    marginBottom: 'var(--space-3)',
    opacity: 0.95,
    lineHeight: '1.6'
  },
  pathMeta: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--space-3)',
    fontSize: 'var(--text-small)',
    fontWeight: 600,
    opacity: 0.9
  },
  ctaSection: {
    background: 'var(--gradient-accent)',
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

export default Resources;
