// src/pages/BudgetEstimator.jsx - VERSÃO LIMPA SEM INDICADORES DE PREÇO
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BudgetEstimator.css';

const BudgetEstimator = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [hoveredType, setHoveredType] = useState(null);

  const carTypes = [
    {
      id: 'sport',
      name: 'Sport',
      image: '/images/sport.png',
      description: 'Carros esportivos e coupés',
      priceMultiplier: 1.3,
      examples: 'BMW M3, Audi TT, Porsche 911',
      color: '#ef4444',
    },
    {
      id: 'hatchback',
      name: 'Hatchback',
      image: '/images/hatchback.png',
      description: 'Compactos e urbanos',
      priceMultiplier: 1.0,
      examples: 'VW Golf, Ford Fiesta, Renault Clio',
      color: '#3b82f6',
    },
    {
      id: 'sedan',
      name: 'Sedan',
      image: '/images/sedan.png',
      description: 'Sedans médios e executivos',
      priceMultiplier: 1.1,
      examples: 'BMW Série 3, Mercedes C, Audi A4',
      color: '#10b981',
    },
    {
      id: 'suv',
      name: 'SUV',
      image: '/images/suv.png',
      description: 'Utilitários esportivos',
      priceMultiplier: 1.2,
      examples: 'BMW X5, Range Rover, VW Tiguan',
      color: '#f59e0b',
    },
    {
      id: 'van',
      name: 'Van',
      image: '/images/van.png',
      description: 'Vans e comerciais leves',
      priceMultiplier: 1.25,
      examples: 'Mercedes Vito, VW Transporter',
      color: '#8b5cf6',
    },
    {
      id: 'pickup',
      name: 'Pickup',
      image: '/images/pickup.png',
      description: 'Pick-ups e utilitários',
      priceMultiplier: 1.15,
      examples: 'Ford Ranger, Toyota Hilux, VW Amarok',
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
            Orçamento Estimado Online
          </h1>
          <p className='budget-subtitle'>
            Selecione o tipo do seu veículo para obter uma estimativa
            instantânea
          </p>

          {/* Benefícios */}
          <div className='benefits-row'>
            <div className='benefit-item'>
              <span className='benefit-icon'>⚡</span>
              <span>Resposta Imediata</span>
            </div>
            <div className='benefit-item'>
              <span className='benefit-icon'>🎯</span>
              <span>Preços Transparentes</span>
            </div>
            <div className='benefit-item'>
              <span className='benefit-icon'>💰</span>
              <span>Sem Compromisso</span>
            </div>
          </div>
        </div>
      </div>

      {/* Car Selection Grid */}
      <div className='container'>
        <div className='selection-section'>
          <h2 className='section-title'>Escolha o Tipo do Seu Veículo</h2>
          <p className='section-subtitle'>
            Clique no modelo que mais se aproxima do seu carro
          </p>

          <div className='car-types-grid'>
            {carTypes.map(carType => (
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
                  <div className='selected-badge'>✓ Selecionado</div>
                )}

                {/* Imagem do Carro */}
                <div className='car-image-container'>
                  <img
                    src={carType.image}
                    alt={carType.name}
                    className='car-image'
                    onError={e => {
                      e.target.src = '/images/car-placeholder.png';
                    }}
                  />
                  <div className='car-shadow'></div>
                </div>

                {/* Informações */}
                <div className='car-info'>
                  <h3 className='car-name'>{carType.name}</h3>
                  <p className='car-description'>{carType.description}</p>
                  <p className='car-examples'>{carType.examples}</p>
                </div>

                {/* Call to Action */}
                <button className='select-button'>
                  <span>Selecionar {carType.name}</span>
                  <span className='arrow-icon'>→</span>
                </button>
              </div>
            ))}
          </div>

          {/* Informações Adicionais */}
          <div className='info-section'>
            <div className='info-card'>
              <div className='info-icon'>💡</div>
              <div className='info-content'>
                <h4>Como funciona?</h4>
                <p>
                  1. Escolha o tipo do seu veículo
                  <br />
                  2. Selecione as peças danificadas
                  <br />
                  3. Veja o orçamento estimado
                  <br />
                  4. Envie para WhatsApp
                </p>
              </div>
            </div>

            <div className='info-card'>
              <div className='info-icon'>🎯</div>
              <div className='info-content'>
                <h4>Precisão dos Valores</h4>
                <p>
                  Os valores são estimativas baseadas em médias de mercado. O
                  orçamento final pode variar após inspeção presencial.
                </p>
              </div>
            </div>

            <div className='info-card'>
              <div className='info-icon'>🛡️</div>
              <div className='info-content'>
                <h4>Garantia Street Paint</h4>
                <p>
                  Todos os serviços incluem garantia de 2 anos na pintura e 1
                  ano em serviços de chapa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetEstimator;
