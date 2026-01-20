import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const team = [
    {
      name: 'Isomiddin Ergashev',
      role: 'Founder & Lead AI Instructor',
      bio: 'Lecturer at WIUT and AI Education Lead with expertise in ML, data engineering, and systems design.',
      image: '👨‍🏫',
      linkedin: '#'
    },
    {
      name: 'Sarvar Karimov',
      role: 'Head of Data Science',
      bio: 'Former data scientist at leading tech companies, specializing in advanced analytics and ML.',
      image: '👨‍💻',
      linkedin: '#'
    },
    {
      name: 'Nilufar Rashidova',
      role: 'AI Business Strategy Lead',
      bio: 'Serial entrepreneur and AI consultant helping businesses leverage artificial intelligence.',
      image: '👩‍💼',
      linkedin: '#'
    },
    {
      name: 'Javohir Nazarov',
      role: 'Banking AI Specialist',
      bio: '15+ years in FinTech, now bringing AI innovation to Uzbekistan\'s banking sector.',
      image: '👨‍💼',
      linkedin: '#'
    }
  ];

  const timeline = [
    { year: '2023', event: 'AI Station Founded', desc: 'Started with a vision to democratize AI education in Uzbekistan' },
    { year: '2023', event: 'First Cohort', desc: 'Launched AI Fundamentals with 50 pioneering students' },
    { year: '2024', event: 'Expansion', desc: 'Introduced AIpreneurs and Data Science programs' },
    { year: '2024', event: 'Corporate Partnerships', desc: 'Started delivering custom training for enterprises' },
    { year: '2025', event: '300+ Students', desc: 'Reached major milestone with diverse student base' }
  ];

  const values = [
    { icon: '🎯', title: 'Excellence', desc: 'We maintain the highest standards in AI education' },
    { icon: '🤝', title: 'Accessibility', desc: 'Making AI education available to everyone' },
    { icon: '💡', title: 'Innovation', desc: 'Staying ahead with cutting-edge curriculum' },
    { icon: '🌍', title: 'Impact', desc: 'Creating positive change in Uzbekistan\'s tech ecosystem' }
  ];

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Hero */}
      <section style={{ background: 'var(--gradient-dark)', padding: 'var(--space-12) 0', color: 'white' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
          >
            <h1 className="hero-title" style={{ marginBottom: 'var(--space-3)' }}>
              Transforming Uzbekistan's <span className="gradient-text">AI Future</span>
            </h1>
            <p style={{ fontSize: 'var(--text-h4)', opacity: 0.9, lineHeight: 1.7 }}>
              We're on a mission to make world-class AI education accessible to everyone in Uzbekistan, empowering the next generation of AI professionals and entrepreneurs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', marginBottom: 'var(--space-12)' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card"
              style={{ padding: 'var(--space-6)' }}
            >
              <h2 style={{ fontSize: 'var(--text-h2)', marginBottom: 'var(--space-3)' }}>
                🎯 Our Mission
              </h2>
              <p style={{ fontSize: 'var(--text-h4)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                To democratize AI education and create opportunities for Uzbek talent to compete globally in the AI-driven economy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card"
              style={{ padding: 'var(--space-6)' }}
            >
              <h2 style={{ fontSize: 'var(--text-h2)', marginBottom: 'var(--space-3)' }}>
                🚀 Our Vision
              </h2>
              <p style={{ fontSize: 'var(--text-h4)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                To become Central Asia's leading AI education platform, producing world-class AI professionals who drive innovation.
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{ padding: 'var(--space-4)', textAlign: 'center' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-2)' }}>{value.icon}</div>
                <h3 style={{ marginBottom: 'var(--space-2)' }}>{value.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-small)' }}>{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}
          >
            <h2 style={{ fontSize: 'var(--text-h1)', fontWeight: 800, marginBottom: 'var(--space-3)' }}>
              Our <span className="gradient-text">Journey</span>
            </h2>
          </motion.div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-4)',
                  paddingBottom: 'var(--space-4)',
                  borderBottom: index < timeline.length - 1 ? '1px solid var(--border-color)' : 'none'
                }}
              >
                <div
                  style={{
                    fontSize: 'var(--text-h3)',
                    fontWeight: 800,
                    fontFamily: 'var(--font-mono)',
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    minWidth: '80px'
                  }}
                >
                  {item.year}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: 'var(--space-1)' }}>{item.event}</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}
          >
            <h2 style={{ fontSize: 'var(--text-h1)', fontWeight: 800, marginBottom: 'var(--space-3)' }}>
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p style={{ fontSize: 'var(--text-h4)', color: 'var(--text-secondary)' }}>
              Passionate educators and industry experts dedicated to your success
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-6)' }}>
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{ padding: 'var(--space-6)', display: 'flex', gap: 'var(--space-4)' }}
              >
                <div style={{ fontSize: '5rem' }}>{member.image}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: 'var(--space-1)' }}>{member.name}</h3>
                  <p style={{ color: 'var(--primary-cyan)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                    {member.role}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--gradient-primary)', padding: 'var(--space-12) 0', color: 'white' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
          >
            <h2 style={{ fontSize: 'var(--text-h1)', fontWeight: 800, marginBottom: 'var(--space-3)' }}>
              Join Our Community
            </h2>
            <p style={{ fontSize: 'var(--text-h4)', marginBottom: 'var(--space-6)', opacity: 0.95 }}>
              Be part of Uzbekistan's fastest-growing AI education platform
            </p>
            <button className="btn btn-ghost" style={{ fontSize: 'var(--text-h4)', padding: '16px 40px' }}>
              Apply Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
