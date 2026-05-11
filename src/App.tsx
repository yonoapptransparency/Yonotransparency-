import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Menu, Search, Shield, Info, Download, ArrowRight, X, Gamepad2, LayoutGrid, Search as SearchIcon, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockSettings } from './lib/supabase';
import Home from './pages/Home';
import AppDetails from './pages/AppDetails';
import DownloadPage from './pages/DownloadPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Ticker from './components/Ticker';
import SupportWidget from './components/SupportWidget';
import ThemeToggle from './components/ThemeToggle';
import NewApps from './pages/NewApps';
import Books from './pages/Books';
import Blogs from './pages/Blogs';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerHaptic = () => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const navVariants = mockSettings.animations_enabled ? {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } }
  } : {
    hidden: { y: 0, opacity: 1 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      <motion.header 
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`glass-nav transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative flex justify-between items-center">
          <Link to="/" onClick={triggerHaptic} className="flex items-center gap-2 group">
            <div className="bg-white/10 p-2 rounded-xl group-hover:bg-white/20 transition-colors">
              {mockSettings.logo_url ? <img src={mockSettings.logo_url} className="w-6 h-6 object-contain" alt="Logo" /> : <Shield className="w-6 h-6 text-pink-400" />}
            </div>
            <span className="text-xl font-bold tracking-tight">{mockSettings.site_title}</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-sm font-medium">
            <Link to="/" onClick={triggerHaptic} className="text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-white transition-colors p-2 font-semibold">Home</Link>
            <Link to="/new-apps" onClick={triggerHaptic} className="text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-white transition-colors p-2 font-semibold flex items-center gap-1">New App <span className="flex w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span></Link>
            <Link to="/categories" onClick={triggerHaptic} className="text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-white transition-colors p-2 font-semibold">Categories</Link>
            <Link to="/blogs" onClick={triggerHaptic} className="text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-white transition-colors p-2 font-semibold">Blogs</Link>
            <Link to="/app-checker" onClick={triggerHaptic} className="text-slate-700 dark:text-slate-300 hover:text-pink-500 dark:hover:text-white transition-colors p-2 font-semibold">App Checker</Link>
            <ThemeToggle />
            <Link to="/admin/login" onClick={triggerHaptic} className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-all min-h-[48px] min-w-[48px] flex items-center justify-center font-bold">
              Admin
            </Link>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button 
              className="flex items-center justify-center min-h-[48px] min-w-[48px] bg-slate-200 dark:bg-white/5 rounded-full border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white"
              onClick={() => { triggerHaptic(); setMenuOpen(true); }}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-3xl flex flex-col px-6 py-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-bold flex items-center gap-2">
                {mockSettings.logo_url ? <img src={mockSettings.logo_url} className="w-6 h-6 object-contain" alt="Logo" /> : <Shield className="w-6 h-6 text-pink-400" />} {mockSettings.site_title}
              </span>
              <button 
                onClick={() => { triggerHaptic(); setMenuOpen(false); }}
                className="flex items-center justify-center min-h-[48px] min-w-[48px] bg-white/10 rounded-full"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-slate-800 dark:text-white" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-lg font-medium">
              <Link onClick={() => { triggerHaptic(); setMenuOpen(false); }} to="/" className="border-b border-slate-200 dark:border-white/5 pb-4 min-h-[48px] flex items-center text-slate-800 dark:text-white">Home</Link>
              <Link onClick={() => { triggerHaptic(); setMenuOpen(false); }} to="/new-apps" className="border-b border-slate-200 dark:border-white/5 pb-4 min-h-[48px] flex items-center text-slate-800 dark:text-white gap-2">New App <span className="flex w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span></Link>
              <Link onClick={() => { triggerHaptic(); setMenuOpen(false); }} to="/categories" className="border-b border-slate-200 dark:border-white/5 pb-4 min-h-[48px] flex items-center text-slate-800 dark:text-white">Categories</Link>
              <Link onClick={() => { triggerHaptic(); setMenuOpen(false); }} to="/app-checker" className="border-b border-slate-200 dark:border-white/5 pb-4 min-h-[48px] flex items-center text-slate-800 dark:text-white">App Checker</Link>
              <Link onClick={() => { triggerHaptic(); setMenuOpen(false); }} to="/blogs" className="border-b border-slate-200 dark:border-white/5 pb-4 min-h-[48px] flex items-center text-slate-800 dark:text-white">Blogs</Link>
              <Link onClick={() => { triggerHaptic(); setMenuOpen(false); }} to="/videos" className="border-b border-slate-200 dark:border-white/5 pb-4 min-h-[48px] flex items-center text-slate-800 dark:text-white">Videos</Link>
              <div className="flex justify-between items-center py-4 border-b border-slate-200 dark:border-white/5">
                <span className="text-slate-800 dark:text-white">Theme</span>
                <ThemeToggle />
              </div>
              <Link onClick={() => { triggerHaptic(); setMenuOpen(false); }} to="/admin/login" className="text-pink-500 dark:text-pink-400 mt-4 min-h-[48px] flex items-center">Admin Access</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
          {mockSettings.logo_url ? <img src={mockSettings.logo_url} className="w-5 h-5 object-contain" alt="Logo" /> : <Shield className="w-5 h-5 text-pink-400" />} {mockSettings.site_title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 max-w-md">
          {mockSettings.meta_description}
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium mb-8">
          <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-white transition-colors">About Us</Link>
          <Link to="/contact" className="text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-white transition-colors">Contact</Link>
          <Link to="/blogs" className="text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-white transition-colors">Blogs</Link>
          <Link to="/privacy" className="text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-white transition-colors">Terms</Link>
        </div>
        
        {(mockSettings.disclaimer_text || mockSettings.ethics_discrimination_text) && (
          <div className="max-w-3xl text-center space-y-4 mb-8">
            {mockSettings.disclaimer_text && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Platform Disclaimer</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{mockSettings.disclaimer_text}</p>
              </div>
            )}
            {mockSettings.ethics_discrimination_text && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Ethics & Discrimination</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{mockSettings.ethics_discrimination_text}</p>
              </div>
            )}
          </div>
        )}

        {mockSettings.important_notice && (
          <div className="max-w-3xl w-full text-center mb-8">
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
              <h4 className="text-sm font-bold text-rose-500 mb-1">Important Notice</h4>
              <p className="text-xs text-rose-400 font-medium whitespace-pre-wrap">{mockSettings.important_notice}</p>
            </div>
          </div>
        )}

        <div className="text-slate-500 text-xs">
          &copy; 2026 {mockSettings.site_title}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight / 2);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-xl shadow-pink-500/20 glass-panel border-none"
          aria-label="Back to top"
        >
          <ArrowRight className="w-6 h-6 -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const triggerHaptic = () => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  useEffect(() => {
    document.title = mockSettings.site_title;
    
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", mockSettings.meta_description);
    updateMeta("og:title", mockSettings.site_title, true);
    updateMeta("og:description", mockSettings.meta_description, true);
    updateMeta("og:type", "website", true);
    
    // Add canonical link for SEO
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
    
    if (mockSettings.favicon_url) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = mockSettings.favicon_url;
    }
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Ticker />
        <Header />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-apps" element={<NewApps />} />
            <Route path="/app/:slug" element={<AppDetails />} />
            <Route path="/download/:slug" element={<DownloadPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/books" element={<Books />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="*" element={<div className="text-center py-20 text-slate-500">Feature arriving soon. Check back later.</div>} />
          </Routes>
        </main>
        
        <Footer />
        <BottomNav />
        <BackToTop />
        <SupportWidget />
      </div>
      </Router>
    </HelmetProvider>
  );
}

function BottomNav() {
  const triggerHaptic = () => {
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-white/10 md:hidden">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        <Link to="/?tab=Games" onClick={triggerHaptic} className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-400">
          <Gamepad2 className="w-6 h-6" />
          <span className="text-[10px] font-medium tracking-tight">Games</span>
        </Link>
        <Link to="/?tab=All Apps" onClick={triggerHaptic} className="flex flex-col items-center gap-1 text-pink-600 dark:text-pink-400">
          <div className="bg-pink-500/10 p-2 rounded-2xl">
            <LayoutGrid className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold tracking-tight">Apps</span>
        </Link>
        <Link to="/" onClick={triggerHaptic} className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-400">
          <SearchIcon className="w-6 h-6" />
          <span className="text-[10px] font-medium tracking-tight">Search</span>
        </Link>
        <Link to="/books" onClick={triggerHaptic} className="flex flex-col items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-400 font-medium">
          <BookOpen className="w-6 h-6" />
          <span className="text-[10px] font-medium tracking-tight">Books</span>
        </Link>
      </div>
    </div>
  );
}
