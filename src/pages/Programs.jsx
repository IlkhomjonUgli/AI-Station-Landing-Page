import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProgramCard from '../components/ProgramCard';

const Programs = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const programs = [
    {
      title: 'AI Fundamentals',
      description: 'Master the basics of artificial intelligence, machine learning, and practical applications. Perfect for beginners looking to enter the AI field.',
      price: 120,
      duration: '2 months',
      level: 'Beginner',
      category: 'beginner',
      icon: '/icons/robot.svg',
      features: [
        'Introduction to AI & ML concepts',
        'Hands-on projects with real data',
        'AI tools and platforms mastery',
        'Industry-recognized certification',
        'Job placement assistance',
        'Access to AI community'
      ]
    },
    {
      title: 'AIpreneurs',
      description: 'Learn to build AI-powered businesses and products. Turn your entrepreneurial ideas into reality with cutting-edge AI skills.',
      price: 150,
      duration: '3 months',
      level: 'Intermediate',
      category: 'advanced',
      icon: '/icons/lightbulb.svg',
      popular: true,
      features: [
        'AI product development from scratch',
        'Business model design & validation',
        'Go-to-market strategies',
        'Investor pitch preparation',
        'Startup mentorship program',
        'Access to funding network'
      ]
    },
    {
      title: 'Data Science Mastery',
      description: 'Deep dive into data analysis, visualization, and predictive modeling. Become a sought-after data professional.',
      price: 180,
      duration: '4 months',
      level: 'Advanced',
      category: 'advanced',
      icon: '/icons/chart.svg',
      features: [
        'Advanced statistics & analytics',
        'Python, R, SQL expertise',
        'Machine learning algorithms',
        'Real-world industry projects',
        'Data engineering fundamentals',
        'Career coaching included'
      ]
    },
    {
      title: 'Banking AI Workshop',
      description: 'Specialized intensive program for banking professionals to leverage AI in financial services and strategic decision-making.',
      price: 160,
      duration: '1 month intensive',
      level: 'Professional',
      category: 'corporate',
      icon: '/icons/bank.svg',
      features: [
        'AI applications in banking',
        'Risk assessment & fraud detection',
        'Customer behavior analytics',
        'Regulatory compliance with AI',
        'Executive-level insights',
        'Industry networking'
      ]
    },
    {
      title: 'Corporate AI Training',
      description: 'Custom AI upskilling programs designed specifically for your organization\'s unique needs and strategic objectives.',
      price: 'Custom',
      duration: 'Flexible',
      level: 'All Levels',
      category: 'corporate',
      icon: '/icons/target.svg',
      features: [
        'Fully customized curriculum',
        'On-site or remote delivery',
        'Team collaboration projects',
        'Ongoing support & mentorship',
        'ROI measurement framework',
        'Executive reporting'
      ]
    }
  ];

  const filters = [
    { id: 'all', label: 'All Programs' },
    { id: 'beginner', label: 'Beginners' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'corporate', label: 'Corporate' }
  ];

  const filteredPrograms = activeFilter === 'all'
    ? programs
    : programs.filter(p => p.category === activeFilter);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ background: 'var(--gradient-dark)', padding: 'var(--space-12) 0', color: 'white' }}>
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
              Choose from our comprehensive range of AI programs designed to take you from beginner to expert
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: 'var(--space-6) 0', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: 'var(--radius-sm)',
                  border: activeFilter === filter.id ? 'none' : '1px solid var(--border-color)',
                  background: activeFilter === filter.id ? 'var(--gradient-primary)' : 'transparent',
                  color: activeFilter === filter.id ? 'white' : 'var(--text-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'var(--font-display)'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-4)' }}
          >
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProgramCard program={program} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: 'var(--gradient-primary)', padding: 'var(--space-12) 0', color: 'white' }}>
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
              Join hundreds of students who are already transforming their careers with AI Station
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

export default Programs;
