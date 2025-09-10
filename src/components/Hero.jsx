import './Hero.css';

const Hero = () => {
  const scrollToEstimate = () => {
    const estimateSection = document.getElementById('estimate-section');
    if (estimateSection) {
      estimateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className='hero'>
      <div className='hero-image'>
        <video
          src='/hero-video.mp4'
          className='hero-bg'
          autoPlay
          muted
          loop
          playsInline
        />
        <div className='hero-overlay'></div>
      </div>

      <div className='hero-content'>
        <div className='hero-text'>
          <h1>A Oficina de Chapa e Pintura Líder em Portugal</h1>
          <p className='hero-subtitle'>
            Especialistas em reparação automóvel com qualidade premium e preços
            justos
          </p>
          <p className='hero-description'>
            Pintura geral, polimento e Martelinho de ouro, Estufa de pintura nas
            suas instalações, reparações de pára choques. Carros Nacionais e
            Importados.
          </p>

          <div className='hero-features'>
            <div className='feature'>
              <span className='feature-icon'>✅</span>
              <span>Orçamento Gratuito</span>
            </div>
            <div className='feature'>
              <span className='feature-icon'>🚗</span>
              <span>Todas as Marcas</span>
            </div>
            <div className='feature'>
              <span className='feature-icon'>⚡</span>
              <span>Serviço Rápido</span>
            </div>
            <div className='feature'>
              <span className='feature-icon'>🎯</span>
              <span>Qualidade Garantida</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
