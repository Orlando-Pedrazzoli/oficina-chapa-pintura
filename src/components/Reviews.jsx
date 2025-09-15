// src/components/Reviews.jsx - CORRIGIDO SEM BADGE E AUTO-ROTAÇÃO MOBILE
import { useState, useEffect } from 'react';
import './Reviews.css';

const Reviews = () => {
  const [selectedReview, setSelectedReview] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Reviews reais do Google (sem o campo localGuide)
  const reviews = [
    {
      id: 1,
      name: 'Núria Cruz',
      rating: 5,
      date: 'há 2 semanas',
      text: 'Fiquei muito satisfeita pelo excelente atendimento e pelos serviços prestados. Recomendo a 100%.',
      avatar: 'NC',
      verified: true,
    },
    {
      id: 2,
      name: 'Estefanía Táriba',
      rating: 5,
      date: 'há 3 meses',
      text: 'Excelente atenção por parte do Júlio e a sua equipa, profissionalismo. 100% recomendado.',
      avatar: 'ET',
      verified: true,
    },
    {
      id: 3,
      name: 'Tiago Martins',
      rating: 5,
      date: 'há 5 meses',
      text: '5 estrelas é pouco para o profissionalismo e dedicação do Julio e equipa! Excelente trabalho no isolamento da mala. Pintura com um acabamento como de origem!',
      avatar: 'TM',
      verified: true,
    },
    {
      id: 4,
      name: 'George Nussbaum',
      rating: 5,
      date: 'há um ano',
      text: 'Só tenho grandes coisas a dizer sobre o Julio e a sua equipa. Fizeram um excelente trabalho no pára-choques riscado e no guarda-lamas traseiro do nosso carro. O preço foi bom e o trabalho foi feito muito rapidamente.',
      avatar: 'GN',
      verified: true,
    },
    {
      id: 5,
      name: 'Ricardo TUCCI',
      rating: 5,
      date: 'há 3 anos',
      text: 'Excelente oficina, com pessoas qualificadas para um ótimo trabalho, Parabéns!!!',
      avatar: 'RT',
      verified: true,
      ownerResponse: 'Obrigado pela credibilidade!',
    },
    {
      id: 6,
      name: 'Priscila Brandão',
      rating: 5,
      date: 'há 3 anos',
      text: 'Ambiente bem estruturado e adequado aos trabalhos que oferece, o proprietário é bastante atencioso às necessidades dos clientes e pintura impecável, vale a pena conhecer, gostei muito!!!! Obrigado Sr. Júlio.',
      avatar: 'PB',
      verified: true,
      ownerResponse: 'Obrigado!',
    },
    {
      id: 7,
      name: 'Carlos Monho',
      rating: 5,
      date: 'há 3 anos',
      text: 'É sem dúvida uma oficina profissional, com pessoal qualificado e equipamento adequado à realização de uma reparação de qualidade. Recomendo 😉👌',
      avatar: 'CM',
      verified: true,
      ownerResponse: 'Obrigado! Conte sempre com a gente!',
    },
    {
      id: 8,
      name: 'Otamiel Ferreira',
      rating: 5,
      date: 'há 4 meses',
      text: 'Top qualidade e preços top',
      avatar: 'OF',
      verified: true,
    },
    {
      id: 9,
      name: 'António Rodrigues',
      rating: 5,
      date: 'há um ano',
      text: 'Top. Recomendo a quem precisa de reparações no seu carro.',
      avatar: 'AR',
      verified: true,
    },
    {
      id: 10,
      name: 'Vanderson Guilherme',
      rating: 5,
      date: 'há um ano',
      text: 'Excelente trabalho',
      avatar: 'VG',
      verified: true,
    },
    {
      id: 11,
      name: 'Felipe Grillo',
      rating: 5,
      date: 'há 3 anos',
      text: 'Serviço com qualidade e no prazo prometido! Recomendo',
      avatar: 'FG',
      verified: true,
      ownerResponse: 'Agradeço imenso!',
    },
    {
      id: 12,
      name: 'Tiago Santos',
      rating: 5,
      date: 'há 3 anos',
      text: 'Trabalho muito profissional! Recomendo!',
      avatar: 'TS',
      verified: true,
      ownerResponse: 'Agradeço imenso!',
    },
    {
      id: 13,
      name: 'Thais Rangel',
      rating: 5,
      date: 'há 3 anos',
      text: 'Ótima oficina com profissionais competentes!',
      avatar: 'TR',
      verified: true,
    },
    {
      id: 14,
      name: 'Fred Gabrielli',
      rating: 5,
      date: 'há 3 anos',
      text: 'Serviço impecável, atencioso e cuidadoso.',
      avatar: 'FG',
      verified: true,
      ownerResponse: 'Obrigado! Estamos a disposição!',
    },
    {
      id: 15,
      name: 'Viviane Barreto',
      rating: 5,
      date: 'há 2 anos',
      text: 'Ótimo local para reparação automotiva!',
      avatar: 'VB',
      verified: true,
    },
    {
      id: 16,
      name: 'Renato Maia',
      rating: 5,
      date: 'há 2 anos',
      text: 'Profissionalismo e excelência.',
      avatar: 'RM',
      verified: true,
    },
    {
      id: 17,
      name: 'Paulo Tomé',
      rating: 5,
      date: 'há 2 dias',
      text: '',
      avatar: 'PT',
      verified: true,
    },
    {
      id: 18,
      name: 'Gefesson Leite da Silva',
      rating: 5,
      date: 'há 3 anos',
      text: '',
      avatar: 'GL',
      verified: true,
      ownerResponse: '👍🏼',
    },
    {
      id: 19,
      name: 'Cleomar Aliane',
      rating: 5,
      date: 'há 3 anos',
      text: '',
      avatar: 'CA',
      verified: true,
      ownerResponse: 'Obrigado!',
    },
  ];

  // Estatísticas reais
  const stats = {
    totalReviews: 19,
    averageRating: 4.9,
    ratings: {
      5: 19,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
    highlights: [
      { keyword: 'equipa', count: 3 },
      { keyword: 'profissionalismo', count: 2 },
      { keyword: 'preço', count: 2 },
    ],
  };

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotação APENAS no desktop
  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setSelectedReview(prev => (prev + 1) % reviews.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [reviews.length, isMobile]);

  const renderStars = rating => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const handlePrevReview = () => {
    setSelectedReview(prev => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNextReview = () => {
    setSelectedReview(prev => (prev + 1) % reviews.length);
  };

  // Determinar quantos reviews mostrar baseado no tamanho da tela
  const getReviewsToShow = () => {
    if (isMobile) return 1;
    if (window.innerWidth <= 1200) return 2;
    return 3;
  };

  const reviewsToShow = getReviewsToShow();

  return (
    <section className='reviews-section'>
      <div className='container'>
        <div className='reviews-header'>
          <h2>O Que Dizem Nossos Clientes</h2>
          <p>Avaliações reais do Google</p>
        </div>

        {/* Estatísticas */}
        <div className='reviews-stats'>
          <div className='rating-summary'>
            <div className='average-rating'>
              <span className='rating-number'>{stats.averageRating}</span>
              <div className='stars'>{renderStars(5)}</div>
              <span className='total-reviews'>
                {stats.totalReviews} avaliações no Google
              </span>
            </div>

            <div className='rating-bars'>
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className='rating-bar'>
                  <span className='star-label'>{star}★</span>
                  <div className='bar-container'>
                    <div
                      className='bar-fill'
                      style={{
                        width: `${
                          (stats.ratings[star] / stats.totalReviews) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <span className='count'>{stats.ratings[star]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='highlights'>
            <h4>Mais mencionado:</h4>
            <div className='highlight-tags'>
              {stats.highlights.map((highlight, index) => (
                <span key={index} className='tag'>
                  {highlight.keyword} ({highlight.count})
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Carrossel de Reviews */}
        <div className='reviews-carousel'>
          <button className='carousel-btn prev' onClick={handlePrevReview}>
            ←
          </button>

          <div className='review-cards'>
            {reviews
              .slice(selectedReview, selectedReview + reviewsToShow)
              .concat(
                reviews.slice(
                  0,
                  Math.max(0, selectedReview + reviewsToShow - reviews.length)
                )
              )
              .map((review, index) => (
                <div
                  key={review.id}
                  className={`review-card ${index === 0 ? 'active' : ''}`}
                >
                  <div className='review-header'>
                    <div className='reviewer-info'>
                      <div className='avatar'>{review.avatar}</div>
                      <div>
                        <h4>{review.name}</h4>
                        <div className='review-meta'>
                          <span className='date'>{review.date}</span>
                          {review.verified && (
                            <span className='verified'>✓ Verificado</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='review-rating'>
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  {review.text && <p className='review-text'>{review.text}</p>}

                  {review.ownerResponse && (
                    <div className='owner-response'>
                      <strong>Resposta do proprietário:</strong>
                      <p>{review.ownerResponse}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>

          <button className='carousel-btn next' onClick={handleNextReview}>
            →
          </button>
        </div>

        {/* Indicador de rotação automática - apenas desktop */}
        {!isMobile && (
          <div className='auto-rotation-indicator'>
            <span>Rotação automática ativa</span>
            <div className='progress-bar'>
              <div className='progress-fill'></div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className='reviews-cta'>
          <h3>Junte-se aos nossos clientes satisfeitos!</h3>
          <p>Agende seu orçamento gratuito hoje mesmo</p>
          <div className='cta-buttons'>
            <a
              href='https://www.google.com/maps/place/Street+Paint+Bate+Chapa+Pintura+e+Recondicionamento+de+Viaturas/@38.7989,-9.3856,15z/data=!4m6!3m5!1s0x0:0x0!8m2!3d38.7989!4d-9.3856!16s%2Fg%2F11c5q0q0q0'
              target='_blank'
              rel='noopener noreferrer'
              className='btn-secondary'
            >
              <span>Ver no Google</span>
            </a>
            <button
              className='btn-primary'
              onClick={() => {
                const estimateSection =
                  document.getElementById('estimate-section');
                if (estimateSection) {
                  estimateSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>Orçamento Gratuito</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
