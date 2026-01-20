import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import FAQ from '../components/FAQ';

const Contact = () => {
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
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p style={{ fontSize: 'var(--text-h4)', opacity: 0.9, lineHeight: 1.7 }}>
              Have questions? We're here to help. Reach out and let's discuss how we can help you achieve your AI career goals.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--space-8)' }}>
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ fontSize: 'var(--text-h2)', marginBottom: 'var(--space-6)' }}
              >
                Send Us a Message
              </motion.h2>
              <ContactForm />
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 style={{ fontSize: 'var(--text-h2)', marginBottom: 'var(--space-6)' }}>
                  Contact Information
                </h2>

                <div className="card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <div style={{ fontSize: '2rem' }}>📍</div>
                    <div>
                      <h4 style={{ marginBottom: 'var(--space-1)' }}>Office Location</h4>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        AI Station Education Center<br />
                        Tashkent, Uzbekistan<br />
                        Near WIUT Campus
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <div style={{ fontSize: '2rem' }}>📞</div>
                    <div>
                      <h4 style={{ marginBottom: 'var(--space-1)' }}>Phone & Email</h4>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Phone: +998 90 123 45 67<br />
                        Email: info@aistation.uz<br />
                        WhatsApp: +998 90 123 45 67
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <div style={{ fontSize: '2rem' }}>🕐</div>
                    <div>
                      <h4 style={{ marginBottom: 'var(--space-1)' }}>Business Hours</h4>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card" style={{ padding: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <div style={{ fontSize: '2rem' }}>💬</div>
                    <div>
                      <h4 style={{ marginBottom: 'var(--space-1)' }}>Social Media</h4>
                      <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                        {['📘 Facebook', '📸 Instagram', '💼 LinkedIn', '📱 Telegram'].map((social, index) => (
                          <button
                            key={index}
                            className="btn btn-secondary"
                            style={{ padding: '8px 16px', fontSize: 'var(--text-small)' }}
                          >
                            {social}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ background: 'var(--bg-secondary)', padding: 'var(--space-12) 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
            style={{ padding: 0, overflow: 'hidden', height: '400px', background: 'var(--bg-tertiary)' }}
          >
            <div style={{ 
              width: '100%', 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: 'var(--text-h2)',
              color: 'var(--text-secondary)'
            }}>
              🗺️ Map View - Tashkent, Uzbekistan
            </div>
          </motion.div>
        </div>
      </section>

      <FAQ />

      <section style={{ background: 'var(--gradient-primary)', padding: 'var(--space-12) 0', color: 'white' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
          >
            <h2 style={{ fontSize: 'var(--text-h1)', fontWeight: 800, marginBottom: 'var(--space-3)' }}>
              Ready to Start Learning?
            </h2>
            <p style={{ fontSize: 'var(--text-h4)', marginBottom: 'var(--space-6)', opacity: 0.95 }}>
              Join hundreds of students transforming their careers with AI
            </p>
            <button className="btn btn-ghost" style={{ fontSize: 'var(--text-h4)', padding: '16px 40px' }}>
              Browse Programs
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
