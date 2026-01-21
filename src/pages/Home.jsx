import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import GlobalContext from '../components/GlobalContext';
import FutureCampus from '../components/FutureCampus';
import MissionStatement from '../components/MissionStatement';
import MentorNetwork from '../components/MentorNetwork';
import CaseStudies from '../components/CaseStudies';
import InnovationGallery from '../components/InnovationGallery';
import StatsCounter from '../components/StatsCounter';
import ProgramCard from '../components/ProgramCard';
import ContactForm from '../components/ContactForm';
import BlogCard from '../components/BlogCard';
import NewsCard from '../components/NewsCard';
import { useLanguage } from '../utils/contexts';
import { buildURL, API_ENDPOINTS } from '../config/api';

const Home = () => {
  const { t } = useLanguage();
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('all');
  const [selectedPortfolioCategory, setSelectedPortfolioCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [newsPosts, setNewsPosts] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [portfolioProjects, setPortfolioProjects] = useState([]);

  // Fetch blog and news posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch blog posts
        const blogResponse = await fetch(buildURL(`${API_ENDPOINTS.posts}?type=blog&status=published&limit=6`));
        const blogData = await blogResponse.json();
        if (blogData.success) {
          setBlogPosts(blogData.data.posts);
        }

        // Fetch news posts
        const newsResponse = await fetch(buildURL(`${API_ENDPOINTS.posts}?type=news&status=published&limit=6`));
        const newsData = await newsResponse.json();
        if (newsData.success) {
          setNewsPosts(newsData.data.posts);
        }

        // Fetch team members
        const teamResponse = await fetch(buildURL(API_ENDPOINTS.team));
        const teamData = await teamResponse.json();
        if (teamData.success) {
          // Randomize team member order
          const shuffled = [...teamData.data.teamMembers].sort(() => Math.random() - 0.5);
          setTeamMembers(shuffled);
        }

        // Programs are now hardcoded as AIS Academy courses (no API fetch needed)

        // Services are now hardcoded as Engagement Models (no API fetch needed)

        // Fetch portfolio projects
        const portfolioResponse = await fetch(buildURL(API_ENDPOINTS.portfolio));
        const portfolioData = await portfolioResponse.json();
        if (portfolioData.success) {
          setPortfolioProjects(portfolioData.data.portfolios.slice(0, 3)); // Show only 3 on home
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []);

  // AIS Academy Programs (hardcoded to match Programs.jsx)
  const programs = [
    {
      id: 1,
      title: 'Design Thinking with AI',
      duration: '1 month',
      level: 'Foundational',
      description: 'Identifying user problems and validating ideas before building.',
      icon: '💡'
    },
    {
      id: 2,
      title: 'AI for Students',
      duration: '1 month',
      level: 'Foundational',
      description: 'Mastering existing AI tools for academic and personal productivity.',
      icon: '🎒'
    },
    {
      id: 3,
      title: 'AI Practitioners',
      duration: '1.5 months',
      level: 'Foundations',
      description: 'Master the basics of artificial intelligence and practical applications.',
      icon: '🤖'
    },
    {
      id: 4,
      title: 'Data Science Foundation',
      duration: '3 months',
      level: 'Analytics & Cleaning',
      description: 'Deep dive into data analysis, cleaning, and visualization techniques.',
      icon: '📊'
    },
    {
      id: 5,
      title: 'Machine Learning',
      duration: '3 months',
      level: 'Regression, Classification',
      description: 'Build and deploy ML models for real-world applications.',
      icon: '🧠'
    },
    {
      id: 6,
      title: 'Deep Learning',
      duration: '3 months',
      level: 'Neural Networks, GenAI',
      description: 'Master neural architectures and generative AI technologies.',
      icon: '⚡'
    }
  ];

  // Industry Innovation Tracks - Engagement Models (hardcoded to match Services.jsx)
  const services = [
    {
      id: 'hybrid',
      title: 'The Hybrid Bootcamp',
      duration: '3-4 Weeks',
      description: 'Intensive training combining online workshops with offline sessions and a final Demo Day.',
      bestFor: 'Government & Large Enterprises',
      icon: '🔄',
      popular: true
    },
    {
      id: 'digital',
      title: 'The Digital Sprint',
      duration: '3-4 Weeks',
      description: 'Fully remote online training with virtual workshops and digital Demo Day.',
      bestFor: 'Remote teams & International partners',
      icon: '🌐',
      popular: false
    },
    {
      id: 'offline',
      title: 'The Offline Immersion',
      duration: '3-4 Weeks',
      description: 'Hands-on offline training at our Hub with direct mentorship and supervision.',
      bestFor: 'Technical teams requiring deep-dive',
      icon: '🏢',
      popular: false
    }
  ];

  // Job Positions - from translations
  const jobs = [
    { id: 1, ...t('careers.seniorEngineer') },
    { id: 2, ...t('careers.productManager') },
    { id: 3, ...t('careers.dataScientist') }
  ];

  // Resources - from translations
  const resources = [
    { id: 1, ...t('resources.mlCourse') },
    { id: 2, ...t('resources.aiForBusiness') },
    { id: 3, ...t('resources.nlpMasterclass'), popular: true }
  ];

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* NEW: Global Context Section */}
      <GlobalContext />

      {/* NEW: Future Campus / 5-Floor Vision Section */}
      {/* FutureCampus section hidden for now */}
      {/* <FutureCampus /> */}

      {/* NEW: Mission Statement Section */}
      <MissionStatement />

      {/* Services Section - Engagement Models */}
      <section id="services" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}
          >
            <h2 style={styles.sectionTitle}>
              Industry Innovation Tracks
            </h2>
            <p style={styles.sectionSubtitle}>
              Choose your engagement model for AI transformation
            </p>
          </motion.div>

          <div style={{ ...styles.servicesGrid, gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                style={styles.serviceCard}
              >
                {service.popular && <div style={styles.popularBadge}>RECOMMENDED</div>}
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-2)' }}>{service.icon}</div>
                <h3 style={styles.cardTitle}>{service.title}</h3>
                <p style={{ fontSize: 'var(--text-small)', color: 'var(--primary-spectrum)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>{service.duration}</p>
                <p style={styles.cardDescription}>{service.description}</p>
                <p style={{ fontSize: 'var(--text-tiny)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
                  <strong>Best For:</strong> {service.bestFor}
                </p>
                <Link to="/services" className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>
                  Request Proposal
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Services Button */}
          <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
            <Link to="/services" className="btn btn-secondary" style={{ display: 'inline-block' }}>
              View All Sectors & Formats →
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}
          >
            <h2 style={styles.sectionTitle}>
              {t('sections.programs')}
            </h2>
            <p style={styles.sectionSubtitle}>
              {t('sections.programsSubtitle')}
            </p>
          </motion.div>

          <div style={styles.programsGrid}>
            {programs.slice(0, 3).map((program, index) => (
              <motion.div
                key={program.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProgramCard program={program} index={index} />
              </motion.div>
            ))}
          </div>

          {/* View All Programs Button */}
          <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
            <Link to="/programs" className="btn btn-secondary" style={{ display: 'inline-block' }}>
              View All Programs →
            </Link>
          </div>
        </div>
      </section>


      {/* Corporate Success Stories Section */}
      <CaseStudies />



      {/* Global Mentor Network Section */}
      <MentorNetwork />


      {/* Resources Section - Hidden for now (materials not ready) */}
      {/*
      <section id="resources" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}
          >
            <h2 style={styles.sectionTitle}>
              {t('sections.resources')}
            </h2>
            <p style={styles.sectionSubtitle}>
              {t('sections.resourcesSubtitle')}
            </p>
          </motion.div>

          <div style={styles.resourcesGrid}>
            {resources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                style={styles.resourceCard}
              >
                {resource.popular && <div style={styles.popularBadge}>{t('resources.popular')}</div>}
                <h3 style={styles.cardTitle}>{resource.title}</h3>
                <div style={styles.resourceMeta}>
                  <span style={styles.resourceType}>{resource.type}</span>
                  <span style={styles.resourceInfo}>
                    {resource.duration || resource.pages}
                  </span>
                </div>
                <a href="#contact" className="btn btn-secondary" style={{ width: '100%', marginTop: 'var(--space-2)' }}>
                  {t('resources.accessNow')}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Blog Section - Only show if there are blog posts */}
      {blogPosts.length > 0 && (
        <section id="blog" className="section" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}
            >
              <h2 style={styles.sectionTitle}>Latest Blog Posts</h2>
              <p style={styles.sectionSubtitle}>
                Insights, tutorials, and updates from our AI experts
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--space-4)' }}>
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
              <Link to="/blog" className="btn btn-secondary" style={{ display: 'inline-block' }}>
                View All Blog Posts →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* News Section - Only show if there are news posts */}
      {newsPosts.length > 0 && (
        <section id="news" className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}
            >
              <h2 style={styles.sectionTitle}>Latest News</h2>
              <p style={styles.sectionSubtitle}>
                Stay updated with the latest announcements and updates
              </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
              {newsPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NewsCard post={post} />
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
              <Link to="/news" className="btn btn-secondary" style={{ display: 'inline-block' }}>
                View All News →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Careers Section - Hidden for now */}
      {/*
      <section id="careers" className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}
          >
            <h2 style={styles.sectionTitle}>
              {t('sections.careers')}
            </h2>
            <p style={styles.sectionSubtitle}>
              {t('sections.careersSubtitle')}
            </p>
          </motion.div>

          <div style={styles.jobsGrid}>
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={styles.jobCard}
              >
                <h3 style={styles.jobTitle}>{job.title}</h3>
                <div style={styles.jobMeta}>
                  <span>{job.location}</span>
                  <span>{job.type}</span>
                </div>
                <a href="#contact" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-3)' }}>
                  {t('careers.applyNow')}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}
          >
            <h2 style={styles.sectionTitle}>
              {t('sections.contact')}
            </h2>
            <p style={styles.sectionSubtitle}>
              {t('sections.contactSubtitle')}
            </p>
          </motion.div>

          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Innovation Atmosphere Gallery */}
      <InnovationGallery />

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center' }}
          >
            <h2 style={styles.ctaTitle}>{t('cta.title')}</h2>
            <p style={styles.ctaText}>
              {t('cta.subtitle')}
            </p>
            <a href="#contact" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '16px 48px' }}>
              {t('cta.getStarted')}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  sectionTitle: {
    fontSize: 'var(--text-h1)',
    marginBottom: 'var(--space-2)',
    fontFamily: 'var(--font-display)'
  },
  sectionSubtitle: {
    fontSize: 'var(--text-h4)',
    color: 'var(--text-secondary)',
    maxWidth: '700px',
    margin: '0 auto'
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--space-4)'
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
  serviceIcon: {
    fontSize: '3rem',
    marginBottom: 'var(--space-2)'
  },
  cardTitle: {
    fontSize: 'var(--text-h3)',
    marginBottom: 'var(--space-2)'
  },
  cardDescription: {
    color: 'var(--text-secondary)',
    marginBottom: 'var(--space-3)',
    lineHeight: '1.6',
    flex: 1
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
  featuredBadge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'var(--gradient-purple)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-small)',
    fontWeight: 700
  },
  programsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: 'var(--space-4)'
  },
  portfolioGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--space-4)'
  },
  projectCard: {
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'all 0.3s ease',
    position: 'relative'
  },
  projectIcon: {
    fontSize: '3rem',
    marginBottom: 'var(--space-2)'
  },
  projectClient: {
    color: 'var(--primary-blue)',
    fontSize: 'var(--text-small)',
    fontWeight: 600,
    marginBottom: 'var(--space-2)'
  },
  projectResults: {
    marginTop: 'var(--space-3)',
    padding: 'var(--space-2)',
    background: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  resultsLabel: {
    fontSize: 'var(--text-small)',
    color: 'var(--text-secondary)',
    fontWeight: 600
  },
  resultsValue: {
    fontSize: 'var(--text-body)',
    fontWeight: 700,
    background: 'var(--gradient-primary)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'var(--space-4)'
  },
  teamCard: {
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    textAlign: 'center',
    border: '1px solid var(--border-color)'
  },
  teamIcon: {
    fontSize: '4rem',
    marginBottom: 'var(--space-2)'
  },
  teamName: {
    fontSize: 'var(--text-h3)',
    marginBottom: 'var(--space-1)'
  },
  teamRole: {
    color: 'var(--primary-blue)',
    fontSize: 'var(--text-body)',
    fontWeight: 600,
    marginBottom: 'var(--space-1)'
  },
  teamExpertise: {
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-small)'
  },
  resourcesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'var(--space-4)'
  },
  resourceCard: {
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'all 0.3s ease',
    position: 'relative'
  },
  resourceIcon: {
    fontSize: '3rem',
    marginBottom: 'var(--space-2)'
  },
  resourceMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)',
    marginBottom: 'var(--space-2)'
  },
  resourceType: {
    color: 'var(--primary-cyan)',
    fontSize: 'var(--text-small)',
    fontWeight: 600
  },
  resourceInfo: {
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-small)'
  },
  jobsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--space-4)',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  jobCard: {
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-sm)'
  },
  jobTitle: {
    fontSize: 'var(--text-h3)',
    marginBottom: 'var(--space-2)'
  },
  jobMeta: {
    display: 'flex',
    gap: 'var(--space-3)',
    color: 'var(--text-secondary)',
    fontSize: 'var(--text-small)',
    fontWeight: 600,
    flexWrap: 'wrap'
  },
  ctaSection: {
    background: 'var(--gradient-primary)',
    padding: 'var(--space-12) 0',
    color: 'white'
  },
  ctaTitle: {
    fontSize: 'var(--text-h1)',
    marginBottom: 'var(--space-3)',
    color: 'white'
  },
  ctaText: {
    fontSize: 'var(--text-h4)',
    marginBottom: 'var(--space-4)',
    opacity: 0.95
  }
};

export default Home;
