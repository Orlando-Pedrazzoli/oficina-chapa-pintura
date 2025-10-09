// src/pages/BudgetEstimator.jsx - VERSÃO COM TRADUÇÃO COMPLETA
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { budgetEstimatorTranslations } from '../translations/budgetEstimator';
import './BudgetEstimator.css';

const BudgetEstimator = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [selectedType, setSelectedType] = useState(null);
  const [hoveredType, setHoveredType] = useState(null);

  // Obter traduções do idioma atual
  const t = budgetEstimatorTranslations[language];

  const carTypes = [
    {
      id: 'sport',
      image: '/images/sport.png',
      priceMultiplier: 1.3,
      color: '#ef4444',
    },
    {
      id: 'hatchback',
      image: '/images/hatchback.png',
      priceMultiplier: 1.0,
      color: '#3b82f6',
    },
    {
      id: 'sedan',
      image: '/images/sedan.png',
      priceMultiplier: 1.1,
      color: '#10b981',
    },
    {
      id: 'suv',
      image: '/images/suv.png',
      priceMultiplier: 1.2,
      color: '#f59e0b',
    },
    {
      id: 'van',
      image: '/images/van.png',
      priceMultiplier: 1.25,
      color: '#8b5cf6',
    },
    {
      id: 'pickup',
      image: '/images/pickup.png',
      priceMultiplier: 1.15,
      color: '#06b6d4',
    },
  ];

  const handleSelectCar = carType => {
    setSelectedType(carType);
    // Pequeno delay para animação
    setTimeout(() => {
      navigate(`/orcamento/${carType.id}`, {
        state: { carType },
      });
    }, 300);
  };

  return (
    <div className='budget-estimator-page'>
      {/* Hero Section */}
      <div className='budget-hero'>
        <div className='container'>
          <h1 className='budget-title'>
            <span className='title-icon'>🔧</span>
            {t.hero.title}
          </h1>
          <p className='budget-subtitle'>{t.hero.subtitle}</p>

          {/* Benefícios */}
          <div className='benefits-row'>
            {t.benefits.map((benefit, index) => (
              <div key={index} className='benefit-item'>
                <span className='benefit-icon'>{benefit.icon}</span>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Car Selection Grid */}
      <div className='container'>
        <div className='selection-section'>
          <h2 className='section-title'>{t.selection.title}</h2>
          <p className='section-subtitle'>{t.selection.subtitle}</p>

          <div className='car-types-grid'>
            {carTypes.map((carType, index) => {
              const carTypeTranslation = t.carTypes.find(
                ct => ct.id === carType.id
              );
              return (
                <div
                  key={carType.id}
                  className={`car-type-card ${
                    selectedType?.id === carType.id ? 'selected' : ''
                  } ${hoveredType === carType.id ? 'hovered' : ''}`}
                  onClick={() => handleSelectCar(carType)}
                  onMouseEnter={() => setHoveredType(carType.id)}
                  onMouseLeave={() => setHoveredType(null)}
                  style={{ '--card-color': carType.color }}
                >
                  {/* Badge de Seleção */}
                  {selectedType?.id === carType.id && (
                    <div className='selected-badge'>{t.selectedBadge}</div>
                  )}

                  {/* Imagem do Carro */}
                  <div className='car-image-container'>
                    <img
                      src={carType.image}
                      alt={carTypeTranslation.name}
                      className='car-image'
                      onError={e => {
                        e.target.src = '/images/car-placeholder.png';
                      }}
                    />
                    <div className='car-shadow'></div>
                  </div>

                  {/* Informações */}
                  <div className='car-info'>
                    <h3 className='car-name'>{carTypeTranslation.name}</h3>
                    <p className='car-description'>
                      {carTypeTranslation.description}
                    </p>
                    <p className='car-examples'>
                      {carTypeTranslation.examples}
                    </p>
                  </div>

                  {/* Call to Action */}
                  <button className='select-button'>
                    <span>
                      {t.selectButton} {carTypeTranslation.name}
                    </span>
                    <span className='arrow-icon'>→</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Informações Adicionais */}
          <div className='info-section'>
            {t.info.map((infoItem, index) => (
              <div key={index} className='info-card'>
                <div className='info-icon'>{infoItem.icon}</div>
                <div className='info-content'>
                  <h4>{infoItem.title}</h4>
                  <p style={{ whiteSpace: 'pre-line' }}>
                    {infoItem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetEstimator;
