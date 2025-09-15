// src/components/Footer.jsx - CORRIGIDO E MELHORADO
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <div className='footer-container'>
        {/* Coluna 1 - Sobre */}
        <div className='footer-section'>
          <h3>Street Paint</h3>
          <p>
            Especialistas em reparação automóvel com mais de 15 anos de
            experiência em Sintra e região.
          </p>
          <div className='social-links'>
            <a href='#' aria-label='Facebook' title='Facebook'>
              📘
            </a>
            <a href='#' aria-label='Instagram' title='Instagram'>
              📷
            </a>
            <a
              href='https://wa.me/351960172705'
              aria-label='WhatsApp'
              title='WhatsApp'
              target='_blank'
              rel='noopener noreferrer'
            >
              📱
            </a>
          </div>
        </div>

        {/* Coluna 2 - Serviços */}
        <div className='footer-section'>
          <h4>Serviços</h4>
          <ul>
            <li>Bate Chapa</li>
            <li>Pintura Automóvel</li>
            <li>Martelinho de Ouro</li>
            <li>Polimento de Óticas</li>
            <li>Restauração de Volantes</li>
          </ul>
        </div>

        {/* Coluna 3 - Contacto */}
        <div className='footer-section'>
          <h4>Contacto</h4>
          <div className='contact-info'>
            <p>📍 Av. Pedro Álvares Cabral 13, Sintra</p>
            <p>📞 +351 960 172 705</p>
            <p>✉️ info@streetpaint.pt</p>
            <p>🕒 Seg-Sex: 9h-18h | Sáb: 9h-13h</p>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>&copy; {currentYear} Street Paint. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
