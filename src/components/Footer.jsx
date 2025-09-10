import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-section'>
          <h3>ChapaPintura Lisboa</h3>
          <p>
            Especialistas em reparação automóvel com mais de 15 anos de
            experiência em Lisboa.
          </p>
          <div className='social-links'>
            <a href='#' aria-label='Facebook'>
              📘
            </a>
            <a href='#' aria-label='Instagram'>
              📷
            </a>
            <a href='#' aria-label='WhatsApp'>
              📱
            </a>
          </div>
        </div>

        <div className='footer-section'>
          <h4>Serviços</h4>
          <ul>
            <li>Reparação de Colisões</li>
            <li>Pintura Automóvel</li>
            <li>Remoção de Amolgadelas</li>
            <li>Substituição de Vidros</li>
          </ul>
        </div>

        <div className='footer-section'>
          <h4>Contacto</h4>
          <div className='contact-info'>
            <p>📍 Lisboa, Portugal</p>
            <p>📞 +351 XXX XXX XXX</p>
            <p>✉️ info@chapapinturalisboa.pt</p>
            <p>🕒 Seg-Sex: 8h-18h | Sáb: 9h-13h</p>
          </div>
        </div>

        <div className='footer-section'>
          <h4>Áreas de Serviço</h4>
          <ul>
            <li>Lisboa Centro</li>
            <li>Benfica & Alvalade</li>
            <li>Olivais & Marvila</li>
            <li>Campo de Ourique</li>
          </ul>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>
          &copy; {currentYear} ChapaPintura Lisboa. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
