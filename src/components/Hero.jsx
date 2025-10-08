// src/components/Hero.jsx - VERSÃO COM TRADUÇÃO COMPLETA
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { heroTranslations } from '../translations/hero';
import './Hero.css';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Obter traduções do idioma atual
  const t = heroTranslations[language];

  const goToBudgetEstimator = () => {
    navigate('/orcamento');
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToEstimate = () => {
    const estimateSection = document.getElementById('estimate-section');
    if (estimateSection) {
      estimateSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '351960172705';
    const message =
      language === 'pt'
        ? 'Olá! Gostaria de obter mais informações sobre os serviços da Street Paint.'
        : 'Hello! I would like to get more information about Street Paint services.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className={`hero ${isLoaded ? 'loaded' : ''}`}>
      <div className='hero-media'>
        <video
          className='hero-video'
          autoPlay
          muted
          loop
          playsInline
          poster='/hero-poster.jpg'
        >
          <source src='/hero-video.mp4' type='video/mp4' />
          {/* Fallback para imagem se vídeo não carregar */}
          <img
            src='/hero-poster.jpg'
            alt='Street Paint - Oficina de Chapa e Pintura'
          />
        </video>
        <div className='hero-overlay'></div>
      </div>

      <div className='hero-content'>
        <div className='container'>
          <div className='hero-text'>
            <h1 className='hero-title'>
              <span className='title-line'>{t.titleLine1}</span>
              <span className='title-highlight'>{t.titleHighlight}</span>
              <span className='title-line'>{t.titleLine2}</span>
            </h1>

            <p className='hero-subtitle'>{t.subtitle}</p>

            <p className='hero-description'>{t.description}</p>

            <div className='hero-features'>
              <div
                className='feature feature-clickable'
                onClick={goToBudgetEstimator}
              >
                <span className='feature-icon'>🎯</span>
                <span className='feature-text'>
                  {t.features.estimatedBudget}
                </span>
              </div>
              <div className='feature'>
                <span className='feature-icon'>🚗</span>
                <span className='feature-text'>{t.features.allBrands}</span>
              </div>
              <div className='feature'>
                <span className='feature-icon'>⚡</span>
                <span className='feature-text'>{t.features.fastService}</span>
              </div>
              <div className='feature'>
                <span className='feature-icon'>✅</span>
                <span className='feature-text'>
                  {t.features.qualityGuaranteed}
                </span>
              </div>
              <div className='feature'>
                <span className='feature-icon'>🛡️</span>
                <span className='feature-text'>{t.features.warranty}</span>
              </div>
              <div className='feature'>
                <span className='feature-icon'>🏆</span>
                <span className='feature-text'>{t.features.certification}</span>
              </div>
            </div>

            <div className='hero-buttons'></div>

            <div className='hero-trust'>
              <div className='trust-item'>
                <span className='trust-number'>500+</span>
                <span className='trust-label'>{t.trust.clients}</span>
              </div>
              <div className='trust-divider'>|</div>
              <div className='trust-item'>
                <span className='trust-number'>15+</span>
                <span className='trust-label'>{t.trust.experience}</span>
              </div>
              <div className='trust-divider'>|</div>
              <div className='trust-item'>
                <span className='trust-number'>4.8★</span>
                <span className='trust-label'>{t.trust.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
