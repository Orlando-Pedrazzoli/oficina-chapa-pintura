// src/components/Footer.jsx - VERSÃO COM TRADUÇÃO COMPLETA
import { useLanguage } from '../contexts/LanguageContext';
import { footerTranslations } from '../translations/footer';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  // Obter traduções do idioma atual
  const t = footerTranslations[language];

  return (
    <footer className='footer'>
      <div className='footer-container'>
        {/* Coluna 1 - Sobre */}
        <div className='footer-section'>
          <h3>{t.about.title}</h3>
          <p>{t.about.description}</p>
          <div className='social-links'>
            <a href='#' aria-label={t.aria.facebook} title={t.aria.facebook}>
              📘
            </a>
            <a href='#' aria-label={t.aria.instagram} title={t.aria.instagram}>
              📷
            </a>
            <a
              href='https://wa.me/351960172705'
              aria-label={t.aria.whatsapp}
              title={t.aria.whatsapp}
              target='_blank'
              rel='noopener noreferrer'
            >
              📱
            </a>
          </div>
        </div>

        {/* Coluna 2 - Serviços */}
        <div className='footer-section'>
          <h4>{t.services.title}</h4>
          <ul>
            {t.services.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Coluna 3 - Contacto */}
        <div className='footer-section'>
          <h4>{t.contact.title}</h4>
          <div className='contact-info'>
            <p>{t.contact.address}</p>
            <p>{t.contact.phone}</p>
            <p>{t.contact.email}</p>
            <p>{t.contact.hours}</p>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>
          &copy; {currentYear} {t.about.title}. {t.copyright}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
