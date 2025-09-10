import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Galeria de serviços com imagens do Unsplash
  const galleryItems = [
    {
      id: 1,
      title: 'Pintura Completa',
      description:
        'Pintura total do veículo com preparação completa e acabamentos de qualidade premium.',
      image: '/pintura-de-carro.jpg',
    },
    {
      id: 2,
      title: 'Martelinho de Ouro',
      description:
        'Técnica especializada para reparação de amolgadelas sem danificar a pintura original.',

      image: '/martelinho.jpg',
    },
    {
      id: 3,
      title: 'Revitalização de Pintura',
      description: 'Reparação de amolgadelas sem danificar a pintura',

      image: '/revitalizacao-pintura.jpg',
    },
    {
      id: 4,
      title: 'Pintura de Interior',
      description:
        'Renovação completa do interior do veículo com pintura especializada para plásticos e tecidos.',

      image: '/pintura-interior.jpg',
    },
    {
      id: 5,
      title: 'Pintura de Jantes',
      description:
        'Restauração e pintura de jantes com acabamentos especiais e cores personalizadas.',

      image: '/pintura-jante.jpg',
    },
    {
      id: 6,
      title: 'Polimento de Óticas',
      description:
        'Restauração da transparência dos faróis e farolins para melhor visibilidade e estética.',

      image: '/polimento-otica.jpg',
    },
    {
      id: 7,
      title: 'Limpeza de Estofos',
      description:
        'Limpeza profunda e tratamento de estofos em tecido, pele e outros materiais.',

      image: '/estofo.jpg',
    },
    {
      id: 8,
      title: 'Restauração de Volantes',
      description:
        'Renovação completa de volantes em pele, couro ou outros materiais com acabamento profissional.',

      image: '/restauracao-volante.jpg',
    },
  ];

  // Função para obter as miniaturas visíveis baseadas no item atual
  const getVisibleThumbnails = () => {
    const totalItems = galleryItems.length;
    const visibleCount = 4;

    if (totalItems <= visibleCount) {
      return galleryItems.map((item, index) => ({
        item,
        originalIndex: index,
      }));
    }

    // Calcula o índice inicial para centralizar o item atual
    let startIndex = Math.max(0, currentIndex - Math.floor(visibleCount / 2));
    let endIndex = startIndex + visibleCount;

    // Ajusta se ultrapassar o final
    if (endIndex > totalItems) {
      endIndex = totalItems;
      startIndex = Math.max(0, endIndex - visibleCount);
    }

    return galleryItems
      .slice(startIndex, endIndex)
      .map((item, index) => ({ item, originalIndex: startIndex + index }));
  };

  // Auto-play do carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryItems.length]);

  const goToSlide = index => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Retoma auto-play após 10s
  };

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? galleryItems.length - 1 : currentIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === galleryItems.length - 1 ? 0 : currentIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentItem = galleryItems[currentIndex];

  return (
    <section className='carousel-section'>
      <div className='container'>
        <div className='carousel-header'>
          <h2>Galeria de Serviços</h2>
          <p>Conheça alguns dos nossos trabalhos de excelência</p>
        </div>

        <div className='carousel-container'>
          {/* Imagem Principal */}
          <div className='carousel-main'>
            <div className='carousel-image-container'>
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className='carousel-image'
              />
              <div className='carousel-overlay'>
                <div className='carousel-content'>
                  <span className='service-badge'>{currentItem.service}</span>
                  <h3>{currentItem.title}</h3>
                  <p>{currentItem.description}</p>
                </div>
              </div>
            </div>

            {/* Controles de navegação */}
            <button
              className='carousel-nav carousel-nav-prev'
              onClick={goToPrevious}
              aria-label='Imagem anterior'
            >
              ‹
            </button>
            <button
              className='carousel-nav carousel-nav-next'
              onClick={goToNext}
              aria-label='Próxima imagem'
            >
              ›
            </button>
          </div>

          {/* Miniaturas - Sistema dinâmico que acompanha o item atual */}
          <div className='carousel-thumbnails'>
            {getVisibleThumbnails().map(({ item, originalIndex }) => (
              <div
                key={item.id}
                className={`thumbnail ${
                  originalIndex === currentIndex ? 'active' : ''
                }`}
                onClick={() => goToSlide(originalIndex)}
              >
                <img src={item.image} alt={item.title} />
                <div className='thumbnail-overlay'>
                  <h4>{item.title}</h4>
                  <span>{item.service}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores */}
          <div className='carousel-indicators'>
            {galleryItems.map((_, index) => (
              <button
                key={index}
                className={`indicator ${
                  index === currentIndex ? 'active' : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
