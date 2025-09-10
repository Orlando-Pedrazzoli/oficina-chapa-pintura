import React, { useState, useEffect } from 'react';
import './Reviews.css';

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reviews reais do Google da Street Paint
  const reviews = [
    {
      id: 1,
      name: 'Estefanía Táriba',
      rating: 5,
      timeAgo: 'há 1 mês',
      text: 'Excelente atenção por parte do Júlio e a sua equipa, profissionalismo. 100% recomendado.',
      verified: true,
    },
    {
      id: 2,
      name: 'Tiago Martins',
      rating: 5,
      timeAgo: 'há 4 meses',
      text: '5 estrelas é pouco para o profissionalismo e dedicação do Julio e equipa! Excelente trabalho no isolamento da mala. Pintura com um acabamento como de origem!',
      verified: true,
    },
    {
      id: 3,
      name: 'George Nussbaum',
      rating: 5,
      timeAgo: 'há 10 meses',
      text: 'Só tenho grandes coisas a dizer sobre o Julio e a sua equipa. Fizeram um excelente trabalho no pára-choques riscado e no guarda-lamas traseiro do nosso carro.',
      verified: true,
    },
    {
      id: 4,
      name: 'Priscila Brandão',
      rating: 5,
      timeAgo: 'há 3 anos',
      text: 'Ambiente bem estruturado e adequada aos trabalho que oferece, o proprietário é bastante atencioso as necessidades dos clientes e pintura impecável, vale a pena conhecer, gostei muito!!!! Obrigado Sr. Júlio.',
      verified: true,
    },
    {
      id: 5,
      name: 'Ricardo TUCCI',
      rating: 5,
      timeAgo: 'há 3 anos',
      text: 'Excelente oficina, com pessoas qualificadas para um ótimo trabalho, Parabéns!!!',
      verified: true,
    },
    {
      id: 6,
      name: 'Carlos Monho',
      rating: 5,
      timeAgo: 'há 3 anos',
      text: 'É sem dúvida uma oficina profissional, com pessoal qualificado e equipamento adequado à realização de uma reparação de qualidade. Recomendo 😉👌',
      verified: true,
    },
    {
      id: 7,
      name: 'Otamiel Ferreira',
      rating: 5,
      timeAgo: 'há 3 meses',
      text: 'Top qualidade e preços top',
      verified: true,
    },
    {
      id: 8,
      name: 'António Rodrigues',
      rating: 5,
      timeAgo: 'há 1 ano',
      text: 'Top. Recomendo a quem precisa de reparações no seu carro.',
      verified: true,
    },
    {
      id: 9,
      name: 'Felipe Grillo',
      rating: 5,
      timeAgo: 'há 3 anos',
      text: 'Serviço com qualidade e no prazo prometido! Recomendo',
      verified: true,
    },
    {
      id: 10,
      name: 'Thais Rangel',
      rating: 5,
      timeAgo: 'há 3 anos',
      text: 'Ótima oficina com profissionais competentes!',
      verified: true,
    },
    {
      id: 11,
      name: 'Fred Gabrielli',
      rating: 5,
      timeAgo: 'há 3 anos',
      text: 'Serviço impecável, atencioso e cuidadoso.',
      verified: true,
    },
    {
      id: 12,
      name: 'Viviane Barreto',
      rating: 4,
      timeAgo: 'há 2 anos',
      text: 'Ótimo local para reparação automotiva!',
      verified: true,
    },
  ];

  // Calcula a média das avaliações
  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  ).toFixed(1);
  const totalReviews = reviews.length;

  // Auto-rotate reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(prevIndex =>
          prevIndex >= reviews.length - 3 ? 0 : prevIndex + 1
        );
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const renderStars = rating => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const getInitials = name => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getVisibleReviews = () => {
    const visibleReviews = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % reviews.length;
      visibleReviews.push(reviews[index]);
    }
    return visibleReviews;
  };

  return (
    <section className='reviews-section'>
      <div className='container'>
        {/* Header com estatísticas do Google */}
        <div className='reviews-header'>
          <div className='google-stats'>
            <div className='google-logo'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill='#4285F4'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='#34A853'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='#FBBC05'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='#EA4335'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              <span>Google</span>
            </div>
            <div className='rating-summary'>
              <div className='rating-score'>
                <span className='score'>{averageRating}</span>
                <div className='stars-summary'>
                  {renderStars(Math.round(parseFloat(averageRating)))}
                </div>
              </div>
              <div className='rating-info'>
                <span className='total-reviews'>{totalReviews} avaliações</span>
                <span className='verified-badge'>Verificado pelo Google</span>
              </div>
            </div>
          </div>

          <div className='reviews-title'>
            <h2>O que dizem nossos clientes</h2>
            <p>Avaliações reais de clientes satisfeitos da Street Paint</p>
          </div>
        </div>

        {/* Reviews Cards */}
        <div className='reviews-container'>
          <div className={`reviews-grid ${isAnimating ? 'animating' : ''}`}>
            {getVisibleReviews().map((review, index) => (
              <div key={`${review.id}-${currentIndex}`} className='review-card'>
                <div className='review-header'>
                  <div className='reviewer-info'>
                    <div className='reviewer-avatar'>
                      {getInitials(review.name)}
                    </div>
                    <div className='reviewer-details'>
                      <h4>{review.name}</h4>
                      <span className='review-time'>{review.timeAgo}</span>
                    </div>
                  </div>
                  <div className='review-source'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill='#4285F4'
                        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                      />
                      <path
                        fill='#34A853'
                        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                      />
                      <path
                        fill='#FBBC05'
                        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                      />
                      <path
                        fill='#EA4335'
                        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                      />
                    </svg>
                  </div>
                </div>

                <div className='review-rating'>
                  {renderStars(review.rating)}
                </div>

                <p className='review-text'>{review.text}</p>

                {review.verified && (
                  <div className='verified-review'>
                    <span>✓ Avaliação verificada</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
