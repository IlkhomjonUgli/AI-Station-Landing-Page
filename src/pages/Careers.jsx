import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const openPositions = [
    {
      id: 1,
      title: 'Senior AI/ML Engineer',
      department: 'engineering',
      location: 'Remote / Tashkent',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Lead the development of cutting-edge AI solutions for our global clients.',
      responsibilities: [
        'Design and implement machine learning models',
        'Collaborate with cross-functional teams',
        'Mentor junior engineers',
        'Drive technical innovation'
      ],
      requirements: [
        'Strong Python and ML framework expertise',
        'Experience with TensorFlow/PyTorch',
        'Cloud platform knowledge (AWS/Azure)',
        'Excellent problem-solving skills'
      ]
    },
    {
      id: 2,
      title: 'AI Product Manager',
      department: 'product',
      location: 'Hybrid / Tashkent',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Shape the future of AI products and drive strategic initiatives.',
      responsibilities: [
        'Define product vision and strategy',
        'Collaborate with engineering and design teams',
        'Conduct market research and analysis',
        'Manage product roadmap and priorities'
      ],
      requirements: [
        'Product management experience in AI/tech',
        'Strong analytical and communication skills',
        'Understanding of AI/ML concepts',
        'Track record of successful product launches'
      ]
    },
    {
      id: 3,
      title: 'Data Scientist',
      department: 'data',
      location: 'Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Extract insights from complex datasets and build predictive models.',
      responsibilities: [
        'Analyze large datasets to derive insights',
        'Build and deploy ML models',
        'Create data visualizations and reports',
        'Collaborate with stakeholders'
      ],
      requirements: [
        'Strong statistical and analytical skills',
        'Proficiency in Python, R, or SQL',
        'Experience with data visualization tools',
        'Excellent communication skills'
      ]
    },
    {
      id: 4,
      title: 'AI Trainer / Educator',
      department: 'education',
      location: 'On-site / Tashkent',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Inspire the next generation of AI professionals through engaging education.',
      responsibilities: [
        'Deliver AI training programs',
        'Develop curriculum and course materials',
        'Mentor students and professionals',
        'Stay updated with AI trends'
      ],
      requirements: [
        'Strong teaching and presentation skills',
        'Deep understanding of AI/ML concepts',
        'Experience in corporate or academic training',
        'Passion for education and mentorship'
      ]
    },
    {
      id: 5,
      title: 'UX/UI Designer',
      department: 'design',
      location: 'Hybrid / Tashkent',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Create beautiful, intuitive interfaces for AI-powered applications.',
      responsibilities: [
        'Design user interfaces and experiences',
        'Conduct user research and testing',
        'Create wireframes and prototypes',
        'Collaborate with development teams'
      ],
      requirements: [
        'Proficiency in Figma, Adobe XD, or similar',
        'Portfolio showcasing UI/UX work',
        'Understanding of design principles',
        'Experience with web and mobile design'
      ]
    },
    {
      id: 6,
      title: 'Business Development Manager',
      department: 'sales',
      location: 'Tashkent / Remote',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Drive growth by building relationships and closing AI solution deals.',
      responsibilities: [
        'Identify and pursue new business opportunities',
        'Build relationships with key stakeholders',
        'Present AI solutions to clients',
        'Negotiate and close deals'
      ],
      requirements: [
        'Proven sales track record in tech/AI',
        'Strong communication and negotiation skills',
        'Understanding of AI technologies',
        'Network in target industries'
      ]
    }
  ];

  const departments = [
    { id: 'all', label: 'All Departments', icon: '🎯' },
    { id: 'engineering', label: 'Engineering', icon: '⚙️' },
    { id: 'product', label: 'Product', icon: '📱' },
    { id: 'data', label: 'Data Science', icon: '📊' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'design', label: 'Design', icon: '🎨' },
    { id: 'sales', label: 'Sales & BD', icon: '💼' }
  ];

  const benefits = [
    { icon: '💰', title: 'Competitive Salary', description: 'Industry-leading compensation packages' },
    { icon: '🏥', title: 'Health Insurance', description: 'Comprehensive health coverage for you and family' },
    { icon: '🌴', title: 'Flexible PTO', description: 'Unlimited paid time off policy' },
    { icon: '📚', title: 'Learning Budget', description: '$2000/year for courses and conferences' },
    { icon: '💻', title: 'Remote Work', description: 'Work from anywhere with flexible hours' },
    { icon: '🚀', title: 'Career Growth', description: 'Clear paths for advancement and mentorship' },
    { icon: '🎉', title: 'Team Events', description: 'Regular team building and social events' },
    { icon: '🏋️', title: 'Wellness Program', description: 'Gym membership and wellness initiatives' }
  ];

  const filteredJobs = selectedDepartment === 'all'
    ? openPositions
    : openPositions.filter(job => job.department === selectedDepartment);

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
              Join the AI <span className="gradient-text">Revolution</span>
            </h1>
            <p style={styles.subtitle}>
              Be part of a team that's shaping the future of artificial intelligence.
              Build your career while making a real impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}
          >
            <h2 style={styles.sectionTitle}>Why AI Station?</h2>
            <p style={styles.sectionSubtitle}>
              We're building more than just AI solutions—we're building a community of innovators
            </p>
          </motion.div>

          <div style={styles.valuesGrid}>
            {[
              {
                icon: '🚀',
                title: 'Innovation First',
                description: 'Work with cutting-edge AI technologies and push boundaries'
              },
              {
                icon: '🤝',
                title: 'Collaborative Culture',
                description: 'Join a supportive team that values diverse perspectives'
              },
              {
                icon: '📈',
                title: 'Rapid Growth',
                description: 'Accelerate your career with challenging projects and mentorship'
              },
              {
                icon: '🌍',
                title: 'Global Impact',
                description: 'Create AI solutions that transform industries worldwide'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={styles.valueCard}
              >
                <div style={styles.valueIcon}>{value.icon}</div>
                <h3 style={styles.valueTitle}>{value.title}</h3>
                <p style={styles.valueDescription}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={styles.benefitsSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}
          >
            <h2 style={styles.sectionTitle}>Perks & Benefits</h2>
            <p style={styles.sectionSubtitle}>
              We invest in our people because they're our greatest asset
            </p>
          </motion.div>

          <div style={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                style={styles.benefitCard}
              >
                <div style={styles.benefitIcon}>{benefit.icon}</div>
                <h4 style={styles.benefitTitle}>{benefit.title}</h4>
                <p style={styles.benefitDescription}>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}
          >
            <h2 style={styles.sectionTitle}>Open Positions</h2>
            <p style={styles.sectionSubtitle}>
              Find your perfect role and start your journey with us
            </p>
          </motion.div>

          {/* Department Filters */}
          <div style={styles.filters}>
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                style={{
                  ...styles.filterBtn,
                  ...(selectedDepartment === dept.id ? styles.filterBtnActive : {})
                }}
              >
                <span style={{ marginRight: '8px' }}>{dept.icon}</span>
                {dept.label}
              </button>
            ))}
          </div>

          {/* Jobs List */}
          <div style={styles.jobsList}>
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={styles.jobCard}
              >
                <div style={styles.jobHeader}>
                  <div>
                    <h3 style={styles.jobTitle}>{job.title}</h3>
                    <div style={styles.jobMeta}>
                      <span style={styles.jobMetaItem}>📍 {job.location}</span>
                      <span style={styles.jobMetaItem}>⏰ {job.type}</span>
                      <span style={styles.jobMetaItem}>📊 {job.experience}</span>
                    </div>
                  </div>
                  <Link to="/contact" className="btn btn-primary">
                    Apply Now
                  </Link>
                </div>

                <p style={styles.jobDescription}>{job.description}</p>

                <div style={styles.jobDetails}>
                  <div style={styles.jobDetailSection}>
                    <h4 style={styles.jobDetailTitle}>Responsibilities</h4>
                    <ul style={styles.jobList}>
                      {job.responsibilities.map((item, idx) => (
                        <li key={idx} style={styles.jobListItem}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={styles.jobDetailSection}>
                    <h4 style={styles.jobDetailTitle}>Requirements</h4>
                    <ul style={styles.jobList}>
                      {job.requirements.map((item, idx) => (
                        <li key={idx} style={styles.jobListItem}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
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
            <h2 style={styles.ctaTitle}>Don't See Your Role?</h2>
            <p style={styles.ctaText}>
              We're always looking for talented people to join our team.
              Send us your resume and tell us how you can contribute!
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '16px 40px' }}>
              Send Your Resume
            </Link>
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
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'var(--space-4)'
  },
  valueCard: {
    padding: 'var(--space-4)',
    textAlign: 'center'
  },
  valueIcon: {
    fontSize: '3rem',
    marginBottom: 'var(--space-2)'
  },
  valueTitle: {
    fontSize: 'var(--text-h3)',
    marginBottom: 'var(--space-2)',
    color: 'var(--text-primary)'
  },
  valueDescription: {
    color: 'var(--text-secondary)',
    lineHeight: '1.6'
  },
  benefitsSection: {
    background: 'var(--bg-secondary)',
    padding: 'var(--space-12) 0'
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--space-3)'
  },
  benefitCard: {
    background: 'var(--bg-primary)',
    padding: 'var(--space-3)',
    borderRadius: 'var(--radius-md)',
    textAlign: 'center',
    border: '1px solid var(--border-color)',
    transition: 'all 0.3s ease'
  },
  benefitIcon: {
    fontSize: '2.5rem',
    marginBottom: 'var(--space-1)'
  },
  benefitTitle: {
    fontSize: 'var(--text-h4)',
    marginBottom: 'var(--space-1)',
    color: 'var(--text-primary)'
  },
  benefitDescription: {
    fontSize: 'var(--text-small)',
    color: 'var(--text-secondary)',
    lineHeight: '1.5'
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
  jobsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)'
  },
  jobCard: {
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-sm)'
  },
  jobHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 'var(--space-3)',
    gap: 'var(--space-3)',
    flexWrap: 'wrap'
  },
  jobTitle: {
    fontSize: 'var(--text-h3)',
    marginBottom: 'var(--space-1)',
    color: 'var(--text-primary)'
  },
  jobMeta: {
    display: 'flex',
    gap: 'var(--space-2)',
    flexWrap: 'wrap'
  },
  jobMetaItem: {
    fontSize: 'var(--text-small)',
    color: 'var(--text-secondary)',
    fontWeight: 600
  },
  jobDescription: {
    color: 'var(--text-secondary)',
    marginBottom: 'var(--space-3)',
    lineHeight: '1.6',
    fontSize: 'var(--text-body)'
  },
  jobDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--space-4)',
    marginTop: 'var(--space-3)',
    paddingTop: 'var(--space-3)',
    borderTop: '1px solid var(--border-color)'
  },
  jobDetailSection: {
    display: 'flex',
    flexDirection: 'column'
  },
  jobDetailTitle: {
    fontSize: 'var(--text-h4)',
    marginBottom: 'var(--space-2)',
    color: 'var(--primary-blue)'
  },
  jobList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  jobListItem: {
    color: 'var(--text-secondary)',
    marginBottom: 'var(--space-1)',
    paddingLeft: 'var(--space-3)',
    position: 'relative',
    lineHeight: '1.6',
    '::before': {
      content: '"•"',
      position: 'absolute',
      left: 0,
      color: 'var(--primary-cyan)'
    }
  },
  ctaSection: {
    background: 'var(--gradient-purple)',
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
  }
};

export default Careers;
