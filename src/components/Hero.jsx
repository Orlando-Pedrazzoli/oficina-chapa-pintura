// src/components/Hero.jsx - VERSÃO ORIGINAL COM VÍDEO
import { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

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
      'Olá! Gostaria de obter mais informações sobre os serviços da Street Paint.';
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
              <span className='title-line'>A Oficina de</span>
              <span className='title-highlight'>Chapa e Pintura</span>
              <span className='title-line'>Líder em Portugal</span>
            </h1>

            <p className='hero-subtitle'>
              Especialistas em reparação automóvel com qualidade premium e
              preços justos
            </p>

            <p className='hero-description'>
              Pintura geral, polimento e Martelinho de ouro. Estufa de pintura
              nas suas instalações, reparações de pára-choques. Carros Nacionais
              e Importados. Servindo Sintra e região há mais de 15 anos.
            </p>

            <div className='hero-features'>
              <div className='feature'>
                <span className='feature-icon'>✅</span>
                <span className='feature-text'>Orçamento Gratuito</span>
              </div>
              <div className='feature'>
                <span className='feature-icon'>🚗</span>
                <span className='feature-text'>Todas as Marcas</span>
              </div>
              <div className='feature'>
                <span className='feature-icon'>⚡</span>
                <span className='feature-text'>Serviço Rápido</span>
              </div>
              <div className='feature'>
                <span className='feature-icon'>🎯</span>
                <span className='feature-text'>Qualidade Garantida</span>
              </div>
              <div className='feature'>
                <span className='feature-icon'>🛡️</span>
                <span className='feature-text'>2 Anos de Garantia</span>
              </div>
              <div className='feature'>
                <span className='feature-icon'>🏆</span>
                <span className='feature-text'>Certificação Premium</span>
              </div>
            </div>

            <div className='hero-buttons'></div>

            <div className='hero-trust'>
              <div className='trust-item'>
                <span className='trust-number'>500+</span>
                <span className='trust-label'>Clientes Satisfeitos</span>
              </div>
              <div className='trust-divider'>|</div>
              <div className='trust-item'>
                <span className='trust-number'>15+</span>
                <span className='trust-label'>Anos de Experiência</span>
              </div>
              <div className='trust-divider'>|</div>
              <div className='trust-item'>
                <span className='trust-number'>4.8★</span>
                <span className='trust-label'>Avaliação Google</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className='hero-scroll-indicator'>
        <div className='scroll-mouse'>
          <div className='scroll-wheel'></div>
        </div>
        <span className='scroll-text'>Scroll para explorar</span>
      </div>
    </section>
  );
};

export default Hero;
