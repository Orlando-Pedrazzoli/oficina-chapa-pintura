// src/components/Navbar.jsx - TRANSPARENTE EM TODAS AS PÁGINAS
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Efeito de scroll para mudar a aparência da navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEstimate = () => {
    if (window.location.pathname === '/') {
      // Se já estamos na homepage, apenas fazer scroll
      const estimateSection = document.getElementById('estimate-section');
      if (estimateSection) {
        estimateSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Se estamos em outra página, navegar para homepage e depois fazer scroll
      navigate('/');
      setTimeout(() => {
        const estimateSection = document.getElementById('estimate-section');
        if (estimateSection) {
          estimateSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : 'transparent'}`}>
      <div className='nav-container'>
        <Link to='/' className='nav-logo'>
          <img
            src='/logo-branco.png' // Sempre logo branco para contraste
            alt='Street Paint Logo'
            className='nav-logo-image'
          />
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link
            to='/'
            className='nav-link'
            onClick={() => setIsMenuOpen(false)}
          >
            Início
          </Link>
          <Link
            to='/services'
            className='nav-link'
            onClick={() => setIsMenuOpen(false)}
          >
            Serviços
          </Link>
          <Link
            to='/contact'
            className='nav-link'
            onClick={() => setIsMenuOpen(false)}
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
        >
          <span className='bar'></span>
          <span className='bar'></span>
          <span className='bar'></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
