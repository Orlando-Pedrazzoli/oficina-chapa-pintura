// src/components/Navbar.jsx - ATUALIZADO COM SELETOR DE IDIOMA
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

  // Obter traduções do idioma atual
  const t = navbarTranslations[language];

  // Fechar menu ao mudar de rota
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Efeito de scroll para mudar a aparência da navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verificar estado inicial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevenir scroll quando menu mobile estiver aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const scrollToEstimate = () => {
    if (location.pathname === '/') {
      const estimateSection = document.getElementById('estimate-section');
      if (estimateSection) {
        estimateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const estimateSection = document.getElementById('estimate-section');
        if (estimateSection) {
          estimateSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 300);
    }
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const goToBudgetEstimator = () => {
    navigate('/orcamento');
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : 'transparent'}`}>
        <div className='nav-container'>
          <Link to='/' className='nav-logo' onClick={handleLinkClick}>
            <img
              src='/logo-branco.png'
              alt='Street Paint Logo'
              className='nav-logo-image'
            />
          </Link>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link
              to='/'
              className={`nav-link ${
                location.pathname === '/' ? 'active' : ''
              }`}
              onClick={handleLinkClick}
            >
              {t.home}
            </Link>
            <Link
              to='/services'
              className={`nav-link ${
                location.pathname === '/services' ? 'active' : ''
              }`}
              onClick={handleLinkClick}
            >
              {t.services}
            </Link>
            <Link to='/' className={`nav-link`} onClick={scrollToEstimate}>
              {t.freeQuote}
            </Link>
            <Link
              to='/contact'
              className={`nav-link ${
                location.pathname === '/contact' ? 'active' : ''
              }`}
              onClick={handleLinkClick}
            >
              {t.contact}
            </Link>

            {/* Seletor de idioma - Visível em mobile dentro do menu */}
            <div className='mobile-language-toggle'>
              <LanguageToggle />
            </div>

            <button className='nav-cta-btn' onClick={goToBudgetEstimator}>
              {t.estimatedBudget}
            </button>
          </div>

          {/* Seletor de idioma - Visível em desktop */}
          <div className='desktop-language-toggle'>
            <LanguageToggle />
          </div>

          <div
            className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Menu'
            role='button'
            tabIndex={0}
          >
            <span className='bar'></span>
            <span className='bar'></span>
            <span className='bar'></span>
          </div>
        </div>
      </nav>

      {/* Overlay para mobile */}
      {isMenuOpen && (
        <div
          className='nav-overlay'
          onClick={() => setIsMenuOpen(false)}
          aria-hidden='true'
        />
      )}
    </>
  );
};

export default Navbar;
