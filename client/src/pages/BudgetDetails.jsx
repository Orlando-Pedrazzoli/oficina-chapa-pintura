// src/pages/BudgetDetails.jsx - VERSÃO COM PREÇOS DO MONGODB
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { budgetDetailsTranslations } from '../translations/budgetDetails';
import { usePartPrices } from '../hooks/useSiteContent';
import './BudgetDetails.css';

const BudgetDetails = () => {
  const { carType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [selectedParts, setSelectedParts] = useState([]);
  const [currentView, setCurrentView] = useState('front');
  const [showCart, setShowCart] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });

  // Buscar preços do MongoDB
  const { prices: dbPrices, loading: loadingPrices } = usePartPrices();

  // Obter traduções do idioma atual
  const t = budgetDetailsTranslations[language];

  // Converter array de preços do MongoDB para objeto (formato esperado)
  const basePrices = dbPrices.reduce((acc, item) => {
    acc[item.partId] = {
      paint: item.prices.paint,
      paintAndDent: item.prices.paintAndDent
    };
    return acc;
  }, {});

  // Fallback caso MongoDB não carregue
  const fallbackPrices = {
    'para-choque-dianteiro': { paint: 180, paintAndDent: 380 },
    'para-choque-traseiro': { paint: 180, paintAndDent: 380 },
    capo: { paint: 250, paintAndDent: 450 },
    'porta-dianteira-esquerda': { paint: 200, paintAndDent: 400 },
    'porta-dianteira-direita': { paint: 200, paintAndDent: 400 },
    'porta-traseira-esquerda': { paint: 200, paintAndDent: 400 },
    'porta-traseira-direita': { paint: 200, paintAndDent: 400 },
    'guarda-lamas-dianteiro-esquerdo': { paint: 150, paintAndDent: 300 },
    'guarda-lamas-dianteiro-direito': { paint: 150, paintAndDent: 300 },
    'ilharga-esquerda': { paint: 150, paintAndDent: 300 },
    'ilharga-direita': { paint: 150, paintAndDent: 300 },
    mala: { paint: 220, paintAndDent: 420 },
    tejadilho: { paint: 300, paintAndDent: 500 },
    'retrovisor-esquerdo': { paint: 80, paintAndDent: 150 },
    'retrovisor-direito': { paint: 80, paintAndDent: 150 },
    'embaladeira-esquerda': { paint: 120, paintAndDent: 250 },
    'embaladeira-direita': { paint: 120, paintAndDent: 250 },
    aileron: { paint: 100, paintAndDent: 200 },
  };

  // Usar preços do MongoDB ou fallback
  const getPrices = () => {
    if (Object.keys(basePrices).length > 0) {
      return basePrices;
    }
    return fallbackPrices;
  };

  // ESTRUTURA COMPLETA: Peças por vista para cada tipo de carro
  const partsByCarType = {
    // SPORT
    sport: {
      front: [
        { id: 'para-choque-dianteiro', x: 47, y: 60 },
        { id: 'capo', x: 47, y: 37 },
        { id: 'retrovisor-esquerdo', x: 8, y: 25 },
        { id: 'retrovisor-direito', x: 86, y: 25 },
      ],
      back: [
        { id: 'para-choque-traseiro', x: 47, y: 62 },
        { id: 'mala', x: 47, y: 40 },
      ],
      left: [
        { id: 'porta-dianteira-esquerda', x: 44, y: 45 },
        { id: 'guarda-lamas-dianteiro-esquerdo', x: 24, y: 41 },
        { id: 'ilharga-esquerda', x: 70, y: 39 },
        { id: 'embaladeira-esquerda', x: 50, y: 61 },
      ],
      right: [
        { id: 'porta-dianteira-direita', x: 50, y: 45 },
        { id: 'guarda-lamas-dianteiro-direito', x: 69, y: 43 },
        { id: 'ilharga-direita', x: 26, y: 40 },
        { id: 'embaladeira-direita', x: 45, y: 62 },
      ],
      top: [
        { id: 'tejadilho', x: 40, y: 42 },
      ],
    },

    // HATCHBACK
    hatchback: {
      front: [
        { id: 'para-choque-dianteiro', x: 47, y: 62 },
        { id: 'capo', x: 47, y: 35 },
        { id: 'retrovisor-esquerdo', x: 8, y: 25 },
        { id: 'retrovisor-direito', x: 86, y: 25 },
      ],
      back: [
        { id: 'para-choque-traseiro', x: 47, y: 67 },
        { id: 'mala', x: 47, y: 45 },
      ],
      left: [
        { id: 'porta-dianteira-esquerda', x: 40, y: 45 },
        { id: 'porta-traseira-esquerda', x: 60, y: 45 },
        { id: 'guarda-lamas-dianteiro-esquerdo', x: 24, y: 43 },
        { id: 'ilharga-esquerda', x: 78, y: 40 },
        { id: 'embaladeira-esquerda', x: 50, y: 64 },
      ],
      right: [
        { id: 'porta-dianteira-direita', x: 52, y: 45 },
        { id: 'porta-traseira-direita', x: 32, y: 45 },
        { id: 'guarda-lamas-dianteiro-direito', x: 69, y: 43 },
        { id: 'ilharga-direita', x: 16, y: 40 },
        { id: 'embaladeira-direita', x: 45, y: 64 },
      ],
      top: [
        { id: 'tejadilho', x: 40, y: 42 },
        { id: 'aileron', x: 16, y: 42 },
      ],
    },

    // SEDAN
    sedan: {
      front: [
        { id: 'para-choque-dianteiro', x: 47, y: 62 },
        { id: 'capo', x: 47, y: 35 },
        { id: 'retrovisor-esquerdo', x: 8, y: 25 },
        { id: 'retrovisor-direito', x: 86, y: 25 },
      ],
      back: [
        { id: 'para-choque-traseiro', x: 47, y: 63 },
        { id: 'mala', x: 47, y: 45 },
      ],
      left: [
        { id: 'porta-dianteira-esquerda', x: 40, y: 45 },
        { id: 'porta-traseira-esquerda', x: 60, y: 45 },
        { id: 'guarda-lamas-dianteiro-esquerdo', x: 24, y: 41 },
        { id: 'ilharga-esquerda', x: 77, y: 38 },
        { id: 'embaladeira-esquerda', x: 50, y: 61 },
      ],
      right: [
        { id: 'porta-dianteira-direita', x: 55, y: 45 },
        { id: 'porta-traseira-direita', x: 35, y: 45 },
        { id: 'guarda-lamas-dianteiro-direito', x: 69, y: 43 },
        { id: 'ilharga-direita', x: 17, y: 40 },
        { id: 'embaladeira-direita', x: 45, y: 62 },
      ],
      top: [
        { id: 'tejadilho', x: 40, y: 42 },
      ],
    },

    // SUV
    suv: {
      front: [
        { id: 'para-choque-dianteiro', x: 47, y: 60 },
        { id: 'capo', x: 47, y: 35 },
        { id: 'retrovisor-esquerdo', x: 8, y: 25 },
        { id: 'retrovisor-direito', x: 86, y: 25 },
      ],
      back: [
        { id: 'para-choque-traseiro', x: 47, y: 72 },
        { id: 'mala', x: 47, y: 45 },
      ],
      left: [
        { id: 'porta-dianteira-esquerda', x: 40, y: 45 },
        { id: 'porta-traseira-esquerda', x: 60, y: 45 },
        { id: 'guarda-lamas-dianteiro-esquerdo', x: 24, y: 41 },
        { id: 'ilharga-esquerda', x: 77, y: 38 },
        { id: 'embaladeira-esquerda', x: 50, y: 61 },
      ],
      right: [
        { id: 'porta-dianteira-direita', x: 55, y: 45 },
        { id: 'porta-traseira-direita', x: 35, y: 45 },
        { id: 'guarda-lamas-dianteiro-direito', x: 69, y: 43 },
        { id: 'ilharga-direita', x: 17, y: 40 },
        { id: 'embaladeira-direita', x: 45, y: 62 },
      ],
      top: [
        { id: 'tejadilho', x: 40, y: 42 },
        { id: 'aileron', x: 16, y: 42 },
      ],
    },

    // VAN
    van: {
      front: [
        { id: 'para-choque-dianteiro', x: 47, y: 68 },
        { id: 'capo', x: 47, y: 35 },
        { id: 'retrovisor-esquerdo', x: 8, y: 27 },
        { id: 'retrovisor-direito', x: 86, y: 27 },
      ],
      back: [
        { id: 'para-choque-traseiro', x: 47, y: 75 },
        { id: 'mala', x: 47, y: 45 },
      ],
      left: [
        { id: 'porta-dianteira-esquerda', x: 36, y: 48 },
        { id: 'porta-traseira-esquerda', x: 57, y: 48 },
        { id: 'guarda-lamas-dianteiro-esquerdo', x: 21, y: 45 },
        { id: 'ilharga-esquerda', x: 77, y: 43 },
        { id: 'embaladeira-esquerda', x: 46, y: 64 },
      ],
      right: [
        { id: 'porta-dianteira-direita', x: 60, y: 48 },
        { id: 'porta-traseira-direita', x: 38, y: 48 },
        { id: 'guarda-lamas-dianteiro-direito', x: 74, y: 45 },
        { id: 'ilharga-direita', x: 17, y: 45 },
        { id: 'embaladeira-direita', x: 45, y: 64 },
      ],
      top: [
        { id: 'tejadilho', x: 40, y: 42 },
      ],
    },

    // PICKUP
    pickup: {
      front: [
        { id: 'para-choque-dianteiro', x: 47, y: 60 },
        { id: 'capo', x: 47, y: 32 },
        { id: 'retrovisor-esquerdo', x: 8, y: 25 },
        { id: 'retrovisor-direito', x: 86, y: 25 },
      ],
      back: [
        { id: 'para-choque-traseiro', x: 47, y: 66 },
        { id: 'mala', x: 47, y: 45 },
      ],
      left: [
        { id: 'porta-dianteira-esquerda', x: 37, y: 45 },
        { id: 'porta-traseira-esquerda', x: 54, y: 45 },
        { id: 'guarda-lamas-dianteiro-esquerdo', x: 23, y: 41 },
        { id: 'ilharga-esquerda', x: 75, y: 40 },
        { id: 'embaladeira-esquerda', x: 44, y: 58 },
      ],
      right: [
        { id: 'porta-dianteira-direita', x: 57, y: 45 },
        { id: 'porta-traseira-direita', x: 40, y: 45 },
        { id: 'guarda-lamas-dianteiro-direito', x: 73, y: 40 },
        { id: 'ilharga-direita', x: 20, y: 40 },
        { id: 'embaladeira-direita', x: 48, y: 58 },
      ],
      top: [
        { id: 'tejadilho', x: 45, y: 42 },
      ],
    },
  };

  // Calcular preço usando dados do MongoDB
  const getPrice = (partId, serviceType) => {
    const prices = getPrices();
    return prices[partId]?.[serviceType] || 0;
  };

  // Toggle seleção de peça
  const togglePart = (partId, serviceType) => {
    setSelectedParts(prev => {
      const existing = prev.find(p => p.id === partId);

      if (existing) {
        if (existing.service === serviceType) {
          return prev.filter(p => p.id !== partId);
        } else {
          return prev.map(p =>
            p.id === partId ? { ...p, service: serviceType, price: getPrice(partId, serviceType) } : p
          );
        }
      } else {
        return [
          ...prev,
          {
            id: partId,
            name: t.parts[partId],
            service: serviceType,
            price: getPrice(partId, serviceType),
          },
        ];
      }
    });
  };

  // Calcular total
  const calculateTotal = () => {
    return selectedParts.reduce((sum, part) => sum + part.price, 0);
  };

  // Enviar para WhatsApp
  const sendToWhatsApp = () => {
    const total = calculateTotal();
    let message = `${t.whatsappMessage.title}\n\n`;
    message += `${t.whatsappMessage.vehicleType} ${carType.toUpperCase()}\n\n`;
    message += `${t.whatsappMessage.selectedParts}\n`;
    message += `${t.whatsappMessage.separator}\n`;

    selectedParts.forEach(part => {
      const serviceLabel =
        part.service === 'paint'
          ? t.services.paint.replace('🎨 ', '')
          : t.services.paintAndDent.replace('🔧 ', '');
      message += `▫️ ${part.name}\n`;
      message += `   ${serviceLabel}: €${part.price}\n\n`;
    });

    message += `${t.whatsappMessage.separator}\n`;
    message += `${t.whatsappMessage.total} €${total}*\n\n`;

    if (customerInfo.name) {
      message += `${t.whatsappMessage.client} ${customerInfo.name}\n`;
    }
    if (customerInfo.phone) {
      message += `${t.whatsappMessage.phone} ${customerInfo.phone}\n`;
    }
    if (customerInfo.email) {
      message += `${t.whatsappMessage.email} ${customerInfo.email}\n`;
    }

    message += `\n${t.whatsappMessage.footer}\n`;
    message += `${t.whatsappMessage.footerPhone}`;

    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '351960172705';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  // Verificar se peça está selecionada
  const isPartSelected = partId => {
    return selectedParts.some(p => p.id === partId);
  };

  // Obter tipo de serviço selecionado
  const getSelectedService = partId => {
    const part = selectedParts.find(p => p.id === partId);
    return part?.service || null;
  };

  // Obter as peças baseado no tipo de carro atual
  const getCurrentParts = () => {
    if (!partsByCarType[carType]) {
      return partsByCarType.hatchback[currentView] || [];
    }
    return partsByCarType[carType][currentView] || [];
  };

  // Fechar popup ao clicar fora
  useEffect(() => {
    const handleClickOutside = event => {
      if (activePopup && !event.target.closest('.part-point')) {
        setActivePopup(null);
      }
    };

    if (activePopup) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activePopup]);

  // Fechar carrinho ao clicar fora (mobile)
  useEffect(() => {
    const handleClickOutside = event => {
      if (showCart && window.innerWidth <= 968) {
        const cartSection = document.querySelector('.cart-section');
        const cartToggle = document.querySelector('.mobile-cart-toggle');

        if (
          cartSection &&
          !cartSection.contains(event.target) &&
          !cartToggle?.contains(event.target)
        ) {
          setShowCart(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCart]);

  // Fechar carrinho automaticamente quando ficar vazio
  useEffect(() => {
    if (selectedParts.length === 0 && showCart) {
      setShowCart(false);
    }
  }, [selectedParts, showCart]);

  // Loading state
  if (loadingPrices) {
    return (
      <div className='budget-details-page'>
        <div className='loading-container'>
          <div className='spinner'></div>
          <p>{language === 'pt' ? 'Carregando preços...' : 'Loading prices...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='budget-details-page'>
      {/* Header */}
      <div className='details-header'>
        <div className='container'>
          <button className='back-button' onClick={() => navigate('/orcamento')}>
            {t.header.backButton}
          </button>
          <h1>
            {t.header.title} {carType?.toUpperCase()}
          </h1>
          <p>{t.header.subtitle}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className='container'>
        <div className='details-content'>
          {/* Car View Section */}
          <div className='car-view-section'>
            {/* View Selector */}
            <div className='view-selector'>
              {t.views.map(view => (
                <button
                  key={view.id}
                  className={`view-btn ${currentView === view.id ? 'active' : ''}`}
                  onClick={() => setCurrentView(view.id)}
                >
                  <span className='view-icon'>{view.icon}</span>
                  <span className='view-name'>{view.name}</span>
                </button>
              ))}
            </div>

            {/* Car Image with Interactive Parts */}
            <div className='car-interactive-container'>
              <img
                src={`/images/cars/${carType}-${currentView}.png`}
                alt={`${carType} - ${currentView}`}
                className='car-view-image'
                onError={e => {
                  if (!e.target.dataset.fallbackAttempted) {
                    e.target.dataset.fallbackAttempted = 'true';
                    e.target.src = `/images/cars/${carType}.png`;
                  } else if (!e.target.dataset.placeholderAttempted) {
                    e.target.dataset.placeholderAttempted = 'true';
                    e.target.src = '/images/car-placeholder.png';
                  }
                }}
              />

              {/* Interactive Points */}
              {getCurrentParts().map(part => (
                <div
                  key={part.id}
                  className={`part-point ${isPartSelected(part.id) ? 'selected' : ''} ${activePopup === part.id ? 'popup-visible' : ''}`}
                  style={{ left: `${part.x}%`, top: `${part.y}%` }}
                  onClick={e => {
                    e.stopPropagation();
                    if (activePopup === part.id) {
                      setActivePopup(null);
                    } else {
                      setActivePopup(part.id);
                    }
                  }}
                >
                  <div
                    className='part-popup'
                    style={{
                      opacity: activePopup === part.id ? 1 : 0,
                      visibility: activePopup === part.id ? 'visible' : 'hidden',
                    }}
                  >
                    <button
                      className='popup-close-btn'
                      onClick={e => {
                        e.stopPropagation();
                        setActivePopup(null);
                      }}
                    >
                      ✕
                    </button>
                    <h4>{t.parts[part.id]}</h4>
                    <div className='service-options'>
                      <button
                        className={`service-btn ${getSelectedService(part.id) === 'paint' ? 'active' : ''}`}
                        onClick={e => {
                          e.stopPropagation();
                          togglePart(part.id, 'paint');
                        }}
                      >
                        <span>{t.services.paint}</span>
                        <strong>€{getPrice(part.id, 'paint')}</strong>
                      </button>
                      <button
                        className={`service-btn ${getSelectedService(part.id) === 'paintAndDent' ? 'active' : ''}`}
                        onClick={e => {
                          e.stopPropagation();
                          togglePart(part.id, 'paintAndDent');
                        }}
                      >
                        <span>{t.services.paintAndDent}</span>
                        <strong>€{getPrice(part.id, 'paintAndDent')}</strong>
                      </button>
                    </div>
                  </div>
                  <div className='point-indicator'>
                    {isPartSelected(part.id) ? '✓' : '+'}
                  </div>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className='instructions'>
              <p>
                💡 {t.instructions.text}{' '}
                <span className='highlight'>{t.instructions.highlight}</span>{' '}
                {t.instructions.textEnd}
              </p>
            </div>
          </div>

          {/* Cart/Summary Section */}
          <div className={`cart-section ${showCart ? 'mobile-show' : ''}`}>
            {showCart && (
              <div className='mobile-overlay' onClick={() => setShowCart(false)}></div>
            )}

            <div className='cart-content'>
              <div className='cart-header'>
                <h3>{t.cart.title}</h3>
                <button className='cart-close mobile-only' onClick={() => setShowCart(false)}></button>
              </div>

              {/* Selected Parts List */}
              <div className='selected-parts-list'>
                {selectedParts.length === 0 ? (
                  <div className='empty-cart'>
                    <p>{t.cart.empty.title}</p>
                    <small>{t.cart.empty.subtitle}</small>
                  </div>
                ) : (
                  selectedParts.map(part => (
                    <div key={part.id} className='cart-item'>
                      <div className='item-info'>
                        <h4>{part.name}</h4>
                        <span className='service-type'>
                          {part.service === 'paint' ? t.services.paint : t.services.paintAndDent}
                        </span>
                      </div>
                      <div className='item-actions'>
                        <span className='item-price'>€{part.price}</span>
                        <button className='remove-btn' onClick={() => togglePart(part.id, part.service)}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Total */}
              {selectedParts.length > 0 && (
                <>
                  <div className='cart-total'>
                    <span>{t.cart.total}</span>
                    <strong>€{calculateTotal()}</strong>
                  </div>

                  {/* Customer Info */}
                  <div className='customer-info-form'>
                    <h4>{t.cart.customerInfo.title}</h4>
                    <input
                      type='text'
                      placeholder={t.cart.customerInfo.name}
                      value={customerInfo.name}
                      onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    />
                    <input
                      type='tel'
                      placeholder={t.cart.customerInfo.phone}
                      value={customerInfo.phone}
                      onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    />
                    <input
                      type='email'
                      placeholder={t.cart.customerInfo.email}
                      value={customerInfo.email}
                      onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className='cart-actions'>
                    <button className='whatsapp-btn' onClick={sendToWhatsApp}>
                      {t.cart.actions.whatsapp}
                    </button>
                    <button className='clear-btn' onClick={() => setSelectedParts([])}>
                      {t.cart.actions.clear}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cart Toggle */}
      {selectedParts.length > 0 && (
        <button className='mobile-cart-toggle' onClick={() => setShowCart(true)}>
          <span className='cart-icon'>🛒</span>
          <span className='cart-badge'>{selectedParts.length}</span>
          <span className='cart-total-preview'>€{calculateTotal()}</span>
        </button>
      )}
    </div>
  );
};

export default BudgetDetails;