// src/components/Navbar.jsx - CORRIGIDO COM NOVO LINK ORÇAMENTO ESTIMADO
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
              Início
            </Link>
            <Link
              to='/services'
              className={`nav-link ${
                location.pathname === '/services' ? 'active' : ''
              }`}
              onClick={handleLinkClick}
            >
              Serviços
            </Link>
            <Link
              to='/orcamento'
              className={`nav-link ${
                location.pathname.includes('/orcamento') ? 'active' : ''
              }`}
              onClick={handleLinkClick}
            >
              Orçamento Estimado
            </Link>
            <Link
              to='/contact'
              className={`nav-link ${
                location.pathname === '/contact' ? 'active' : ''
              }`}
              onClick={handleLinkClick}
            >
              Contacto
            </Link>
            <button className='nav-cta-btn' onClick={scrollToEstimate}>
              Orçamento Gratuito
            </button>
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
