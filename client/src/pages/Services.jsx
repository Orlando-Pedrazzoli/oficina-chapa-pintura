// src/pages/Services.jsx - VERSÃO COM MONGODB + FALLBACK SEGURO
import { useLanguage } from '../contexts/LanguageContext';
import { useServices } from '../hooks/useSiteContent';
import { servicesTranslations } from '../translations/services';
import './Services.css';

const Services = () => {
  const { language } = useLanguage();

  // Buscar serviços do MongoDB
  const { services: dbServices, loading, error } = useServices();

  // Traduções estáticas (fallback)
  const t = servicesTranslations[language];

  // Usar serviços do MongoDB OU fallback para traduções estáticas
  // IMPORTANTE: Só usa MongoDB se tiver dados, senão usa estático
  const services = (dbServices && dbServices.length > 0)
    ? dbServices
        .filter(s => s.active !== false) // Só ativos
        .sort((a, b) => (a.order || 0) - (b.order || 0)) // Ordenar
        .map(s => ({
          icon: s.icon || '🔧',
          title: s.title?.[language] || s.title?.pt || 'Serviço',
          description: s.description?.[language] || s.description?.pt || '',
          details: s.details?.[language] || s.details?.pt || [],
        }))
    : t.services; // FALLBACK: usa traduções estáticas

  return (
    <div className='services-page'>
      <div className='services-hero'>
        <div className='container'>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
        </div>
      </div>

      <div className='container'>
        {/* Loading state - mas mostra conteúdo estático enquanto carrega */}
        {loading && (
          <div className='loading-notice'>
            <small>Carregando...</small>
          </div>
        )}

        <div className='services-grid'>
          {services.map((service, index) => (
            <div key={index} className='service-card'>
              <div className='service-icon'>
                {service.icon.startsWith('/') ? (
                  <img src={service.icon} alt={service.title} />
                ) : (
                  service.icon
                )}
              </div>
              <h3>{service.title}</h3>
              <p className='service-description'>{service.description}</p>
              <ul className='service-details'>
                {service.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='about-section'>
          <div className='about-content'>
            <div className='about-text'>
              <span className='section-label'>{t.about.label}</span>
              <h2>{t.about.title}</h2>
              {t.about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className='about-image'>
              <img src='/julios.jpg' alt='Oficina de Reparação Automóvel' />
            </div>
          </div>
        </div>

        <div className='additional-services'>
          <h3>{t.additionalServices.title}</h3>
          <div className='services-list'>
            {t.additionalServices.items.map((service, index) => (
              <div key={index} className='service-item'>
                <span className='check-icon'>✓</span>
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='quality-guarantee'>
          <div className='guarantee-content'>
            <h3>{t.guarantee.title}</h3>
            <p>{t.guarantee.description}</p>
            <div className='guarantee-features'>
              {t.guarantee.features.map((feature, index) => (
                <div key={index} className='feature'>
                  <span className='feature-icon'>{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='cta-section'>
          <h3>{t.cta.title}</h3>
          <p>{t.cta.subtitle}</p>
          <div className='cta-buttons'>
            <a href='#estimate-section' className='btn-primary'>
              {t.cta.buttons.quote}
            </a>
            <a href='tel:+351960172705' className='btn-secondary'>
              {t.cta.buttons.call}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;