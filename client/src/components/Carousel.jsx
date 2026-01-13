// src/components/Carousel.jsx - VERSÃO COM TRADUÇÃO COMPLETA
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { carouselTranslations } from '../translations/carousel';
import './Carousel.css';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { language } = useLanguage();

  // Obter traduções do idioma atual
  const t = carouselTranslations[language];

  // Imagens dos serviços (sempre as mesmas)
  const serviceImages = [
    '/pintura-de-carro.jpg',
    '/martelinho.jpg',
    '/revitalizacao-pintura.jpg',
    '/pintura-interior.jpg',
    '/pintura-jante.jpg',
    '/polimento-otica.jpg',
    '/estofo.jpg',
    '/restauracao-volante.jpg',
  ];

  // Galeria de serviços com traduções
  const galleryItems = t.services.map((service, index) => ({
    ...service,
    image: serviceImages[index],
  }));

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
          <h2>{t.header.title}</h2>
          <p>{t.header.subtitle}</p>
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
              aria-label={t.aria.previousImage}
            >
              ‹
            </button>
            <button
              className='carousel-nav carousel-nav-next'
              onClick={goToNext}
              aria-label={t.aria.nextImage}
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
                aria-label={`${t.aria.goToSlide} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
