import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useSiteContent } from '../hooks/useSiteContent';
import { footerTranslations } from '../translations/footer';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const { content: dbContacts } = useSiteContent('contact');
  const t = footerTranslations[language];

  const getContact = (key, fallback) => {
    if (dbContacts && dbContacts[`contact_${key}`]) {
      const value = dbContacts[`contact_${key}`];
      if (typeof value === 'object' && value[language]) return value[language];
      if (typeof value === 'object' && value.pt) return value.pt;
      if (typeof value === 'string') return value;
    }
    return fallback;
  };

  const contactData = {
    phone: getContact('phone', '+351 960 172 705'),
    email: getContact('email', 'info@streetpaint.pt'),
    whatsapp: getContact('whatsapp', '351960172705'),
    address: getContact('address', 'Rua da Oficina, 123, Sintra'),
    schedule: getContact('schedule', 'Seg-Sex: 9h-18h | Sáb: 9h-13h'),
  };

  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-section'>
          <h3>{t.about.title}</h3>
          <p>{t.about.description}</p>
          <div className='social-links'>
            <a href='#' aria-label={t.aria.facebook} title={t.aria.facebook}>📘</a>
            <a href='#' aria-label={t.aria.instagram} title={t.aria.instagram}>📷</a>
            <a href={`https://wa.me/${contactData.whatsapp}`} aria-label={t.aria.whatsapp} title={t.aria.whatsapp} target='_blank' rel='noopener noreferrer'>📱</a>
          </div>
        </div>
        <div className='footer-section'>
          <h4>{t.services.title}</h4>
          <ul>
            {t.services.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className='footer-section'>
          <h4>{t.contact.title}</h4>
          <div className='contact-info'>
            <p>📍 {contactData.address}</p>
            <p>📞 {contactData.phone}</p>
            <p>✉️ {contactData.email}</p>
            <p>🕐 {contactData.schedule}</p>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; {currentYear} {t.about.title}. {t.copyright}</p>
        <div className='footer-links'>
          <Link to='/privacy-policy' className='footer-link'>
            {language === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;