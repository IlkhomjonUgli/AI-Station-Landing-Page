import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const posts = [
    {
      title: '5 AI Tools Every Professional Should Know in 2025',
      excerpt: 'Discover the essential AI tools that are transforming workplaces and boosting productivity across industries.',
      category: 'Tools',
      date: 'Dec 20, 2024',
      readTime: '5 min',
      image: '🤖'
    },
    {
      title: 'How Dilshod Landed His Dream Job After AI Station',
      excerpt: 'Student success story: From accountant to data analyst in just 3 months with our Data Science program.',
      category: 'Success Stories',
      date: 'Dec 15, 2024',
      readTime: '4 min',
      image: '🎓'
    },
    {
      title: 'Machine Learning Basics: A Beginner\'s Guide',
      excerpt: 'Understanding the fundamentals of machine learning and how it\'s revolutionizing technology.',
      category: 'Tutorials',
      date: 'Dec 10, 2024',
      readTime: '8 min',
      image: '📚'
    },
    {
      title: 'The Future of AI in Uzbekistan\'s Banking Sector',
      excerpt: 'Exploring how artificial intelligence is transforming financial services in Uzbekistan.',
      category: 'Industry Insights',
      date: 'Dec 5, 2024',
      readTime: '6 min',
      image: '🏦'
    }
  ];

  const categories = ['all', 'Tools', 'Success Stories', 'Tutorials', 'Industry Insights'];
  const filteredPosts = activeCategory === 'all' ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section style={{ background: 'var(--gradient-dark)', padding: 'var(--space-12) 0', color: 'white' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
          >
            <h1 className="hero-title" style={{ marginBottom: 'var(--space-3)' }}>
              AI Station <span className="gradient-text">Blog</span>
            </h1>
            <p style={{ fontSize: 'var(--text-h4)', opacity: 0.9 }}>
              Insights, tutorials, and success stories from the world of AI education
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: 'var(--space-6) 0', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-sm)',
                  border: activeCategory === cat ? 'none' : '1px solid var(--border-color)',
                  background: activeCategory === cat ? 'var(--gradient-primary)' : 'transparent',
                  color: activeCategory === cat ? 'white' : 'var(--text-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 'var(--space-4)' }}>
            {filteredPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
                whileHover={{ y: -5 }}
              >
                <div style={{ fontSize: '5rem', padding: 'var(--space-6)', background: 'var(--bg-tertiary)', textAlign: 'center' }}>
                  {post.image}
                </div>
                <div style={{ padding: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-small)', color: 'var(--text-secondary)' }}>
                    <span className="mono-text">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--text-h3)' }}>{post.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-3)' }}>
                    {post.excerpt}
                  </p>
                  <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: 'var(--text-small)' }}>
                    Read More →
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export const News = () => {
  const news = [
    {
      title: 'AI Station Partners with Leading Tech Companies',
      content: 'We\'re excited to announce new partnerships with major technology companies to provide even better career opportunities for our graduates.',
      date: 'Dec 22, 2024',
      type: 'Partnership',
      icon: '🤝'
    },
    {
      title: 'New Banking AI Workshop Launches in January',
      content: 'Specialized intensive program designed for banking professionals starts January 15th. Limited spots available.',
      date: 'Dec 18, 2024',
      type: 'Program Launch',
      icon: '🏦'
    },
    {
      title: 'Record-Breaking Student Achievements',
      content: '95% of our recent graduates secured positions within 60 days of completion. Read their success stories.',
      date: 'Dec 10, 2024',
      type: 'Achievement',
      icon: '🏆'
    },
    {
      title: 'AI Station Reaches 300+ Students Milestone',
      content: 'Celebrating this incredible milestone and the amazing community we\'ve built together.',
      date: 'Dec 1, 2024',
      type: 'Milestone',
      icon: '🎉'
    }
  ];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section style={{ background: 'var(--gradient-dark)', padding: 'var(--space-12) 0', color: 'white' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
          >
            <h1 className="hero-title" style={{ marginBottom: 'var(--space-3)' }}>
              Latest <span className="gradient-text">News</span>
            </h1>
            <p style={{ fontSize: 'var(--text-h4)', opacity: 0.9 }}>
              Stay updated with the latest from AI Station
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            {news.map((item, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card"
                style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-4)', display: 'flex', gap: 'var(--space-4)' }}
              >
                <div style={{ fontSize: '4rem' }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', fontSize: 'var(--text-small)' }}>
                    <span style={{ 
                      background: 'var(--gradient-primary)', 
                      color: 'white', 
                      padding: '4px 12px', 
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 600
                    }}>
                      {item.type}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }} className="mono-text">{item.date}</span>
                  </div>
                  <h3 style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--text-h3)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.content}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
