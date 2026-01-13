// src/components/Navbar.jsx - VERSÃO CORRIGIDA COM MENU FORA DA NAV
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { navbarTranslations } from '../translations/navbar';
import LanguageToggle from './LanguageToggle';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  const t = navbarTranslations[language];

  // Fechar menu ao mudar de rota
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Scroll listener
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevenir scroll quando menu mobile aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Fechar menu com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const scrollToEstimate = useCallback(() => {
    const scrollToSection = () => {
      const section = document.getElementById('estimate-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (location.pathname === '/') {
      scrollToSection();
    } else {
      navigate('/');
      setTimeout(scrollToSection, 300);
    }
    setIsMenuOpen(false);
  }, [location.pathname, navigate]);

  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      {/* NAVBAR PRINCIPAL */}
      <nav 
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        role="navigation"
        aria-label="Menu principal"
      >
        <div className="navbar__container">
          {/* Logo */}
          <Link to="/" className="navbar__logo" onClick={handleLinkClick}>
            <img
              src="/logo-branco.png"
              alt="Street Paint"
              className="navbar__logo-img"
              width="160"
              height="50"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="navbar__desktop-menu">
            <li>
              <Link
                to="/"
                className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}
              >
                {t.home}
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className={`navbar__link ${location.pathname === '/services' ? 'navbar__link--active' : ''}`}
              >
                {t.services}
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="navbar__link"
                onClick={scrollToEstimate}
              >
                {t.freeQuote}
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`navbar__link ${location.pathname === '/contact' ? 'navbar__link--active' : ''}`}
              >
                {t.contact}
              </Link>
            </li>
          </ul>

          {/* Right Side - Desktop */}
          <div className="navbar__right">
            <Link to="/orcamento" className="navbar__cta">
              {t.estimatedBudget}
            </Link>
            
            <div className="navbar__language">
              <LanguageToggle />
            </div>

            {/* Admin Access */}
            <Link 
              to="/admin/login"
              className="navbar__admin"
              title={t.adminAccess || 'Admin'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </Link>
          </div>

          {/* Hamburger Toggle */}
          <button
            type="button"
            className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--open' : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
          >
            <span className="navbar__toggle-line" />
            <span className="navbar__toggle-line" />
            <span className="navbar__toggle-line" />
          </button>
        </div>
      </nav>

      {/* MENU MOBILE - FORA DA NAV (IMPORTANTE!) */}
      <div 
        className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`}
        id="mobile-menu"
      >
        {/* Botão X para fechar */}
        <button
          type="button"
          className="mobile-menu__close"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Fechar menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="mobile-menu__content">
          <ul className="mobile-menu__links">
            <li>
              <Link
                to="/"
                className={`mobile-menu__link ${location.pathname === '/' ? 'mobile-menu__link--active' : ''}`}
                onClick={handleLinkClick}
              >
                {t.home}
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className={`mobile-menu__link ${location.pathname === '/services' ? 'mobile-menu__link--active' : ''}`}
                onClick={handleLinkClick}
              >
                {t.services}
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="mobile-menu__link"
                onClick={scrollToEstimate}
              >
                {t.freeQuote}
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`mobile-menu__link ${location.pathname === '/contact' ? 'mobile-menu__link--active' : ''}`}
                onClick={handleLinkClick}
              >
                {t.contact}
              </Link>
            </li>
          </ul>

          <div className="mobile-menu__footer">
            <LanguageToggle />
            <Link 
              to="/orcamento" 
              className="mobile-menu__cta"
              onClick={handleLinkClick}
            >
              {t.estimatedBudget}
            </Link>
          </div>
        </div>
      </div>

      {/* OVERLAY - TAMBÉM FORA */}
      <div 
        className={`mobile-overlay ${isMenuOpen ? 'mobile-overlay--visible' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Admin Mobile */}
      <Link 
        to="/admin/login"
        className="admin-mobile"
        title={t.adminAccess || 'Admin'}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </Link>
    </>
  );
};

export default Navbar;