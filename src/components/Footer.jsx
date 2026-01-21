import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../utils/contexts';
import { validateEmail } from '../utils/helpers';

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }
    setStatus({ type: 'success', message: 'Thank you for subscribing!' });
    setEmail('');
    setTimeout(() => setStatus({ type: '', message: '' }), 3000);
  };

  const footerLinks = {
    programs: [
      { label: 'AIS Academy', path: '/programs' },
      { label: 'AIS Studio', path: '/programs' },
      { label: 'Corporate Innovation', path: '/services' },
      { label: 'Global Mentors', path: '/#mentors' }
    ],
    company: [
      { label: 'About Us', path: '/#about' },
      { label: 'Our Vision', path: '/#vision' },
      { label: 'Case Studies', path: '/#portfolio' },
      { label: 'Contact', path: '/#contact' }
    ],
    resources: [
      { label: 'Blog', path: '/blog' },
      { label: 'News', path: '/news' },
      { label: 'FAQ', path: '/#contact' },
      { label: 'Support', path: '/#contact' }
    ],
    legal: [
      { label: 'Privacy Policy', path: '/#contact' },
      { label: 'Terms of Service', path: '/#contact' },
      { label: 'Cookie Policy', path: '/#contact' }
    ]
  };

  const contactInfo = {
    email: 'info@aistation.uz',
    phone: '+998 55 512 55 77',
    website: 'aistation.uz',
    location: 'Tashkent, Uzbekistan'
  };

  return (
    <footer style={footerStyles.footer}>
      {/* CTA Section - Merged into Footer */}
      <div style={footerStyles.ctaSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center' }}
          >
            <h2 style={footerStyles.ctaTitle}>Ready to Join Uzbekistan's AI Revolution?</h2>
            <p style={footerStyles.ctaText}>
              Connect with Uzbekistan's leading AI community – learn, build, and innovate with us
            </p>
            <Link to="/#contact" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '14px 40px' }}>
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container">
        <div style={footerStyles.topSection}>
          <div style={footerStyles.brand}>
            <div style={footerStyles.logo}>
              <span className="mono-text" style={{ fontSize: '1.75rem', fontWeight: '800' }}>
                AI<span className="gradient-text">Station</span>
              </span>
            </div>
            <p style={footerStyles.tagline}>Central Eurasia's Innovation Hub. Bridging Academia and Industry.</p>

            {/* Contact Info */}
            <div style={footerStyles.contactInfo}>
              <a href={`mailto:${contactInfo.email}`} style={footerStyles.contactLink}>📧 {contactInfo.email}</a>
              <a href={`tel:${contactInfo.phone}`} style={footerStyles.contactLink}>📞 {contactInfo.phone}</a>
              <span style={footerStyles.contactLink}>📍 {contactInfo.location}</span>
            </div>

            <div style={footerStyles.social}>
              {[
                { icon: '📘', label: 'Facebook', url: '#' },
                { icon: '📸', label: 'Instagram', url: '#' },
                { icon: '💼', label: 'LinkedIn', url: '#' },
                { icon: '📱', label: 'Telegram', url: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={footerStyles.socialLink}
                  aria-label={social.label}
                >
                  <span style={{ fontSize: '1.5rem' }}>{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </div>

          <div style={footerStyles.linksGrid}>
            <div style={footerStyles.linkColumn}>
              <h4 style={footerStyles.columnTitle}>Programs</h4>
              {footerLinks.programs.map((link, index) => (
                <a key={index} href={link.path} style={footerStyles.link}>
                  {link.label}
                </a>
              ))}
            </div>

            <div style={footerStyles.linkColumn}>
              <h4 style={footerStyles.columnTitle}>Company</h4>
              {footerLinks.company.map((link, index) => (
                <a key={index} href={link.path} style={footerStyles.link}>
                  {link.label}
                </a>
              ))}
            </div>

            <div style={footerStyles.linkColumn}>
              <h4 style={footerStyles.columnTitle}>Resources</h4>
              {footerLinks.resources.map((link, index) => (
                <a key={index} href={link.path} style={footerStyles.link}>
                  {link.label}
                </a>
              ))}
            </div>

            <div style={footerStyles.linkColumn}>
              <h4 style={footerStyles.columnTitle}>{t('footer.newsletter')}</h4>
              <form onSubmit={handleNewsletterSubmit} style={footerStyles.newsletter}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  style={footerStyles.newsletterInput}
                  className="form-input"
                />
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-1)' }}>
                  {t('footer.subscribe')}
                </button>
              </form>
              {status.message && (
                <p style={{
                  ...footerStyles.statusMessage,
                  color: status.type === 'success' ? 'var(--secondary-emerald)' : '#EF4444'
                }}>
                  {status.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div style={footerStyles.socialProof}>
          <span style={footerStyles.socialProofText}>✓ Trusted by Ministry of Justice, Aloqabank, and UNDP</span>
        </div>

        <div style={footerStyles.bottomSection}>
          <div style={footerStyles.legalLinks}>
            {footerLinks.legal.map((link, index) => (
              <React.Fragment key={index}>
                <a href={link.path} style={footerStyles.legalLink}>
                  {link.label}
                </a>
                {index < footerLinks.legal.length - 1 && <span style={{ color: 'var(--text-secondary)' }}>•</span>}
              </React.Fragment>
            ))}
          </div>
          <p style={footerStyles.copyright}>
            © {new Date().getFullYear()} AI Station. {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

const footerStyles = {
  footer: {
    background: '#000000',
    color: '#FFFFFF',
    marginTop: 'auto'
  },
  ctaSection: {
    background: '#000000',
    padding: 'var(--space-12) 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  ctaTitle: {
    fontSize: 'var(--text-h1)',
    fontWeight: 800,
    marginBottom: 'var(--space-3)',
    color: '#FFFFFF',
    fontFamily: 'var(--font-display)'
  },
  ctaText: {
    fontSize: 'var(--text-h4)',
    marginBottom: 'var(--space-4)',
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '600px',
    margin: '0 auto var(--space-4)',
    lineHeight: 1.6
  },
  topSection: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 2.5fr',
    gap: 'var(--space-8)',
    marginBottom: 'var(--space-8)',
    paddingTop: 'var(--space-8)',
    paddingBottom: 'var(--space-8)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  brand: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)'
  },
  logo: {
    marginBottom: 'var(--space-2)'
  },
  tagline: {
    fontSize: 'var(--text-body)',
    color: '#A3A3A3',
    maxWidth: '300px',
    lineHeight: 1.6
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: 'var(--space-2)'
  },
  contactLink: {
    fontSize: 'var(--text-small)',
    color: '#A3A3A3',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  },
  socialProof: {
    textAlign: 'center',
    padding: 'var(--space-4) 0',
    marginBottom: 'var(--space-4)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  socialProofText: {
    fontSize: 'var(--text-small)',
    color: '#6B97FC',
    fontWeight: 500
  },
  social: {
    display: 'flex',
    gap: 'var(--space-2)',
    marginTop: 'var(--space-2)'
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: 'var(--radius-sm)',
    background: '#262626',  // Dark gray for contrast
    textDecoration: 'none',
    transition: 'all 0.3s ease'
  },
  linksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 'var(--space-6)'
  },
  linkColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)'
  },
  columnTitle: {
    fontSize: 'var(--text-h4)',
    fontWeight: 700,
    marginBottom: 'var(--space-2)',
    color: '#FFFFFF',  // Pure white
    fontFamily: 'var(--font-display)'
  },
  link: {
    fontSize: 'var(--text-body)',
    color: '#A3A3A3',  // Gray-400 for readable contrast
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  },
  newsletter: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)'
  },
  newsletterInput: {
    background: '#262626',  // Dark gray background
    border: '1px solid #404040',  // Medium gray border
    color: '#FFFFFF'  // White text
  },
  statusMessage: {
    fontSize: 'var(--text-small)',
    marginTop: 'var(--space-1)'
  },
  bottomSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 'var(--space-3)',
    paddingTop: 'var(--space-6)'
  },
  legalLinks: {
    display: 'flex',
    gap: 'var(--space-2)',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  legalLink: {
    fontSize: 'var(--text-small)',
    color: '#737373',  // Gray-500 for subtle text
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  },
  copyright: {
    fontSize: 'var(--text-small)',
    color: '#737373'  // Gray-500 for subtle text
  }
};

// Responsive styles
const responsiveStyle = document.createElement('style');
responsiveStyle.textContent = `
  @media (max-width: 1024px) {
    .footer .top-section {
      grid-template-columns: 1fr !important;
    }
    .footer .links-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media (max-width: 640px) {
    .footer .links-grid {
      grid-template-columns: 1fr !important;
    }
    .footer .bottom-section {
      flex-direction: column;
      text-align: center;
    }
  }
`;
document.head.appendChild(responsiveStyle);

export default Footer;
