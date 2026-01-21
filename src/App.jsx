import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, LanguageProvider } from './utils/contexts';
import { useAnalytics } from './hooks/useAnalytics';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import AllBlogPage from './pages/AllBlogPage';
import AllNewsPage from './pages/AllNewsPage';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Programs from './pages/Programs';
import ScrollToTop from './components/ScrollToTop';
import LoginPage from './admin/pages/LoginPage';
import AnalyticsDashboard from './admin/pages/AnalyticsDashboard';
import CampaignDashboard from './admin/pages/CampaignDashboard';
import BlogPostsPage from './admin/pages/BlogPostsPage';
import NewsPostsPage from './admin/pages/NewsPostsPage';
import PostEditorPage from './admin/pages/PostEditorPage';
import ServicesPage from './admin/pages/ServicesPage';
import ServiceEditorPage from './admin/pages/ServiceEditorPage';
import ProgramsPage from './admin/pages/ProgramsPage';
import ProgramEditorPage from './admin/pages/ProgramEditorPage';
import TeamPage from './admin/pages/TeamPage';
import TeamEditorPage from './admin/pages/TeamEditorPage';
import PortfolioPage from './admin/pages/PortfolioPage';
import PortfolioEditorPage from './admin/pages/PortfolioEditorPage';
import AdminLayout from './admin/components/AdminLayout';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/main.css';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Track analytics on all public pages (not admin)
  if (!isAdminRoute) {
    useAnalytics();
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      {!isAdminRoute && <Navigation />}
      <main style={{ flex: 1 }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<AllBlogPage />} />
          <Route path="/news" element={<AllNewsPage />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/programs" element={<Programs />} />

          {/* Admin login (no sidebar) */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Admin routes (with sidebar) */}
          <Route path="/admin/dashboard" element={<AdminLayout><AnalyticsDashboard /></AdminLayout>} />
          <Route path="/admin/posts" element={<AdminLayout><AnalyticsDashboard /></AdminLayout>} />
          <Route path="/admin/blog" element={<AdminLayout><BlogPostsPage /></AdminLayout>} />
          <Route path="/admin/blog/new" element={<AdminLayout><PostEditorPage /></AdminLayout>} />
          <Route path="/admin/blog/edit/:id" element={<AdminLayout><PostEditorPage /></AdminLayout>} />
          <Route path="/admin/news" element={<AdminLayout><NewsPostsPage /></AdminLayout>} />
          <Route path="/admin/news/new" element={<AdminLayout><PostEditorPage /></AdminLayout>} />
          <Route path="/admin/news/edit/:id" element={<AdminLayout><PostEditorPage /></AdminLayout>} />
          <Route path="/admin/campaigns" element={<AdminLayout><CampaignDashboard /></AdminLayout>} />
          <Route path="/admin/services" element={<AdminLayout><ServicesPage /></AdminLayout>} />
          <Route path="/admin/services/new" element={<AdminLayout><ServiceEditorPage /></AdminLayout>} />
          <Route path="/admin/services/edit/:id" element={<AdminLayout><ServiceEditorPage /></AdminLayout>} />
          <Route path="/admin/programs" element={<AdminLayout><ProgramsPage /></AdminLayout>} />
          <Route path="/admin/programs/new" element={<AdminLayout><ProgramEditorPage /></AdminLayout>} />
          <Route path="/admin/programs/edit/:id" element={<AdminLayout><ProgramEditorPage /></AdminLayout>} />
          <Route path="/admin/team" element={<AdminLayout><TeamPage /></AdminLayout>} />
          <Route path="/admin/team/new" element={<AdminLayout><TeamEditorPage /></AdminLayout>} />
          <Route path="/admin/team/edit/:id" element={<AdminLayout><TeamEditorPage /></AdminLayout>} />
          <Route path="/admin/portfolio" element={<AdminLayout><PortfolioPage /></AdminLayout>} />
          <Route path="/admin/portfolio/new" element={<AdminLayout><PortfolioEditorPage /></AdminLayout>} />
          <Route path="/admin/portfolio/edit/:id" element={<AdminLayout><PortfolioEditorPage /></AdminLayout>} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <Chatbot />}
      {!isAdminRoute && <CookieConsent />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <AppContent />
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

// Cookie Consent Component
const CookieConsent = () => {
  const [isVisible, setIsVisible] = React.useState(() => {
    return !localStorage.getItem('ai-station-cookies-accepted');
  });

  const handleAccept = () => {
    localStorage.setItem('ai-station-cookies-accepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={cookieStyles.banner}>
      <div style={cookieStyles.content}>
        <p style={cookieStyles.text}>
          🍪 We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
        </p>
        <div style={cookieStyles.actions}>
          <button onClick={handleAccept} className="btn btn-primary" style={{ padding: '8px 20px' }}>
            Accept
          </button>
          <button onClick={() => setIsVisible(false)} className="btn btn-ghost" style={{ padding: '8px 20px' }}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

const cookieStyles = {
  banner: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'var(--neutral-darkest)',
    padding: 'var(--space-3)',
    zIndex: 1000,
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)'
  },
  content: {
    maxWidth: '1280px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--space-4)',
    flexWrap: 'wrap'
  },
  text: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 'var(--text-body)',
    flex: 1,
    minWidth: '300px'
  },
  actions: {
    display: 'flex',
    gap: 'var(--space-2)'
  }
};

export default App;
