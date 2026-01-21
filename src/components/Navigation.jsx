import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../utils/contexts';
import { useLanguage } from '../utils/contexts';
import { buildURL, API_ENDPOINTS } from '../config/api';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // Track which content exists to show/hide menu items
  const [contentExists, setContentExists] = useState({
    services: false,
    about: false,
    blog: false,
    news: false,
    programs: false
  });

  // Fetch content counts on mount
  useEffect(() => {
    const checkContent = async () => {
      try {
        // Check services
        const servicesRes = await fetch(buildURL(API_ENDPOINTS.services));
        const servicesData = await servicesRes.json();

        // Check blog posts
        const blogRes = await fetch(buildURL(`${API_ENDPOINTS.posts}?type=blog&status=published&limit=1`));
        const blogData = await blogRes.json();

        //Check news posts
        const newsRes = await fetch(buildURL(`${API_ENDPOINTS.posts}?type=news&status=published&limit=1`));
        const newsData = await newsRes.json();

        // Check team
        const teamRes = await fetch(buildURL(API_ENDPOINTS.team));
        const teamData = await teamRes.json();

        // Check programs
        const programsRes = await fetch(buildURL(API_ENDPOINTS.programs));
        const programsData = await programsRes.json();

        setContentExists({
          services: servicesData.success && servicesData.data.services.length > 0,
          about: teamData.success && teamData.data.teamMembers.length > 0,
          blog: blogData.success && blogData.data.posts.length > 0,
          news: newsData.success && newsData.data.posts.length > 0,
          programs: programsData.success && programsData.data.programs.length > 0
        });
      } catch (error) {
        console.error('Error checking content:', error);
      }
    };

    checkContent();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Build nav links - all scroll to landing page sections
  const allNavLinks = [
    { path: '#home', label: t('nav.home'), section: 'home', show: true },
    { path: '#services', label: t('nav.services'), section: 'services', show: true },
    { path: '#programs', label: t('nav.programs'), section: 'programs', show: true },
    { path: '#portfolio', label: t('nav.portfolio'), section: 'portfolio', show: true },
    { path: '#mentors', label: t('nav.mentors') || 'Mentors', section: 'mentors', show: true },
    { path: '/blog', label: t('nav.blog') || 'Blog', section: 'blog', show: contentExists.blog, external: true },
    // { path: '#resources', label: t('nav.resources'), section: 'resources', show: false },
    // { path: '#careers', label: t('nav.careers'), section: 'careers', show: false },
    { path: '#contact', label: t('nav.contact'), section: 'contact', show: true }
  ];

  const navLinks = allNavLinks.filter(link => link.show);

  const scrollToSection = (sectionId) => {
    // If not on homepage, navigate to homepage with hash
    if (location.pathname !== '/') {
      navigate('/#' + sectionId);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Height of fixed navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const languages = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'uz', label: 'UZ', flag: '🇺🇿' },
    { code: 'ru', label: 'RU', flag: '🇷🇺' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}
      style={navStyles.nav(isScrolled, theme)}
    >
      <div className="container" style={navStyles.container}>
        <Link to="/" style={navStyles.logo}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={navStyles.logoText}
          >
            <span style={{ fontSize: '1.5rem', fontWeight: '900', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              AI Station
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div style={navStyles.desktopNav}>
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {link.external ? (
                <Link
                  to={link.path}
                  style={navStyles.navLink}
                >
                  <span style={navStyles.navNumber}>{String(index + 1).padStart(2, '0')}</span>
                  {link.label}
                </Link>
              ) : (
                <a
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.section);
                  }}
                  style={navStyles.navLink}
                >
                  <span style={navStyles.navNumber}>{String(index + 1).padStart(2, '0')}</span>
                  {link.label}
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div style={navStyles.actions}>
          {/* Language Switcher */}
          <div style={navStyles.langDropdown}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              style={navStyles.langButton}
            >
              {languages.find(l => l.code === language)?.flag} {language.toUpperCase()}
            </button>
            <AnimatePresence>
              {isLangDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={navStyles.langMenu}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      style={{
                        ...navStyles.langItem,
                        background: language === lang.code ? 'rgba(0, 102, 255, 0.15)' : 'transparent'
                      }}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} style={navStyles.themeToggle}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}
            className="btn btn-primary"
            style={navStyles.ctaButton}
          >
            {t('nav.applyNow')}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={navStyles.hamburger}
          >
            <span style={navStyles.hamburgerLine(isMobileMenuOpen, 0)}></span>
            <span style={navStyles.hamburgerLine(isMobileMenuOpen, 1)}></span>
            <span style={navStyles.hamburgerLine(isMobileMenuOpen, 2)}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={navStyles.mobileMenu}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.external ? (
                  <Link
                    to={link.path}
                    style={navStyles.mobileNavLink}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.path}
                    style={navStyles.mobileNavLink}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.section);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {link.label}
                  </a>
                )}
              </motion.div>
            ))}
            <a
              href="#contact"
              className="btn btn-primary"
              style={{ marginTop: 'var(--space-4)', width: '100%' }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
                setIsMobileMenuOpen(false);
              }}
            >
              {t('nav.applyNow')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const navStyles = {
  nav: (isScrolled, theme) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '1.25rem 0',
    background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    boxShadow: 'none',
    borderBottom: 'none',
    transition: 'all 0.3s ease'
  }),
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  logoText: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  desktopNav: {
    display: 'flex',
    gap: 'var(--space-4)',
    alignItems: 'center',
    '@media (max-width: 1024px)': {
      display: 'none'
    }
  },
  navLink: {
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: 'var(--text-small)',
    fontFamily: 'var(--font-body)',
    color: 'var(--text-primary)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  navNumber: {
    fontSize: '0.75rem',
    fontFamily: 'var(--font-mono)',
    color: 'var(--text-secondary)',
    fontWeight: 600
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)'
  },
  langDropdown: {
    position: 'relative'
  },
  langButton: {
    padding: '8px 16px',
    background: 'transparent',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-small)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  langMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '0.5rem',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    boxShadow: 'var(--shadow-lg)',
    minWidth: '120px',
    overflow: 'hidden'
  },
  langItem: {
    width: '100%',
    padding: '12px 16px',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-small)',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textAlign: 'left'
  },
  themeToggle: {
    padding: '8px',
    background: 'transparent',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '1.25rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ctaButton: {
    display: 'none',
    '@media (min-width: 1024px)': {
      display: 'flex'
    }
  },
  hamburger: {
    display: 'none',
    flexDirection: 'column',
    gap: '6px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    '@media (max-width: 1024px)': {
      display: 'flex'
    }
  },
  hamburgerLine: (isOpen, index) => ({
    width: '24px',
    height: '2px',
    background: 'var(--text-primary)',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
    transform: isOpen
      ? index === 0 ? 'rotate(45deg) translateY(8px)'
        : index === 1 ? 'scaleX(0)'
          : 'rotate(-45deg) translateY(-8px)'
      : 'none',
    opacity: isOpen && index === 1 ? 0 : 1
  }),
  mobileMenu: {
    position: 'fixed',
    top: '80px',
    right: 0,
    width: '100%',
    maxWidth: '400px',
    height: 'calc(100vh - 80px)',
    background: 'var(--bg-primary)',
    padding: 'var(--space-4)',
    boxShadow: '-4px 0 16px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  mobileNavLink: {
    padding: 'var(--space-2) 0',
    fontSize: 'var(--text-h4)',
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    color: 'var(--text-primary)',
    textDecoration: 'none',
    display: 'block',
    borderBottom: '1px solid var(--border-color)'
  }
};

// Media query workaround for inline styles
const style = document.createElement('style');
style.textContent = `
  @media (max-width: 1024px) {
    .nav .container > div:nth-child(2) {
      display: none !important;
    }
    .btn-primary.cta-desktop {
      display: none !important;
    }
    .hamburger {
      display: flex !important;
    }
  }
`;
document.head.appendChild(style);

export default Navigation;
