// src/pages/BudgetDetails.jsx - CORRIGIDO SEM LOOP INFINITO
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './BudgetDetails.css';

const BudgetDetails = () => {
  const { carType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedParts, setSelectedParts] = useState([]);
  const [currentView, setCurrentView] = useState('front');
  const [showCart, setShowCart] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });

  // Preços base (para hatchback) - outros tipos aplicam multiplicador
  const basePrices = {
    'para-choque-dianteiro': { paint: 180, paintAndDent: 380 },
    'para-choque-traseiro': { paint: 180, paintAndDent: 380 },
    capo: { paint: 250, paintAndDent: 450 },
    'porta-dianteira-esquerda': { paint: 200, paintAndDent: 400 },
    'porta-dianteira-direita': { paint: 200, paintAndDent: 400 },
    'porta-traseira-esquerda': { paint: 200, paintAndDent: 400 },
    'porta-traseira-direita': { paint: 200, paintAndDent: 400 },
    'para-lama-dianteiro-esquerdo': { paint: 150, paintAndDent: 300 },
    'para-lama-dianteiro-direito': { paint: 150, paintAndDent: 300 },
    'para-lama-traseiro-esquerdo': { paint: 150, paintAndDent: 300 },
    'para-lama-traseiro-direito': { paint: 150, paintAndDent: 300 },
    mala: { paint: 220, paintAndDent: 420 },
    teto: { paint: 300, paintAndDent: 500 },
    'retrovisor-esquerdo': { paint: 80, paintAndDent: 150 },
    'retrovisor-direito': { paint: 80, paintAndDent: 150 },
    'soleira-esquerda': { paint: 120, paintAndDent: 250 },
    'soleira-direita': { paint: 120, paintAndDent: 250 },
  };

  // Multiplicadores por tipo de carro
  const priceMultipliers = {
    sport: 1.3,
    hatchback: 1.0,
    sedan: 1.1,
    suv: 1.2,
    van: 1.25,
    pickup: 1.15,
  };

  // Peças por vista
  const partsByView = {
    front: [
      {
        id: 'para-choque-dianteiro',
        name: 'Para-choque Dianteiro',
        x: 50,
        y: 80,
      },
      { id: 'capo', name: 'Capô', x: 50, y: 50 },
      {
        id: 'para-lama-dianteiro-esquerdo',
        name: 'Para-lama Dianteiro Esq.',
        x: 20,
        y: 60,
      },
      {
        id: 'para-lama-dianteiro-direito',
        name: 'Para-lama Dianteiro Dir.',
        x: 80,
        y: 60,
      },
      { id: 'retrovisor-esquerdo', name: 'Retrovisor Esquerdo', x: 15, y: 45 },
      { id: 'retrovisor-direito', name: 'Retrovisor Direito', x: 85, y: 45 },
    ],
    back: [
      {
        id: 'para-choque-traseiro',
        name: 'Para-choque Traseiro',
        x: 50,
        y: 80,
      },
      { id: 'mala', name: 'Tampa do Porta-malas', x: 50, y: 50 },
      {
        id: 'para-lama-traseiro-esquerdo',
        name: 'Para-lama Traseiro Esq.',
        x: 20,
        y: 60,
      },
      {
        id: 'para-lama-traseiro-direito',
        name: 'Para-lama Traseiro Dir.',
        x: 80,
        y: 60,
      },
    ],
    left: [
      { id: 'porta-dianteira-esquerda', name: 'Porta Dianteira', x: 35, y: 50 },
      { id: 'porta-traseira-esquerda', name: 'Porta Traseira', x: 65, y: 50 },
      {
        id: 'para-lama-dianteiro-esquerdo',
        name: 'Para-lama Dianteiro',
        x: 15,
        y: 50,
      },
      {
        id: 'para-lama-traseiro-esquerdo',
        name: 'Para-lama Traseiro',
        x: 85,
        y: 50,
      },
      { id: 'soleira-esquerda', name: 'Soleira', x: 50, y: 75 },
      { id: 'retrovisor-esquerdo', name: 'Retrovisor', x: 25, y: 35 },
    ],
    right: [
      { id: 'porta-dianteira-direita', name: 'Porta Dianteira', x: 65, y: 50 },
      { id: 'porta-traseira-direita', name: 'Porta Traseira', x: 35, y: 50 },
      {
        id: 'para-lama-dianteiro-direito',
        name: 'Para-lama Dianteiro',
        x: 85,
        y: 50,
      },
      {
        id: 'para-lama-traseiro-direito',
        name: 'Para-lama Traseiro',
        x: 15,
        y: 50,
      },
      { id: 'soleira-direita', name: 'Soleira', x: 50, y: 75 },
      { id: 'retrovisor-direito', name: 'Retrovisor', x: 75, y: 35 },
    ],
    top: [
      { id: 'teto', name: 'Teto', x: 50, y: 50 },
      { id: 'capo', name: 'Capô', x: 30, y: 50 },
      { id: 'mala', name: 'Tampa Traseira', x: 70, y: 50 },
    ],
  };

  const views = [
    { id: 'front', name: 'Frente', icon: '🚗' },
    { id: 'back', name: 'Traseira', icon: '🚙' },
    { id: 'left', name: 'Lateral Esq.', icon: '⬅️' },
    { id: 'right', name: 'Lateral Dir.', icon: '➡️' },
    { id: 'top', name: 'Superior', icon: '⬇️' },
  ];

  // Calcular preço com multiplicador
  const getPrice = (partId, serviceType) => {
    const basePrice = basePrices[partId]?.[serviceType] || 0;
    const multiplier = priceMultipliers[carType] || 1;
    return Math.round(basePrice * multiplier);
  };

  // Toggle seleção de peça
  const togglePart = (partId, serviceType) => {
    setSelectedParts(prev => {
      const existing = prev.find(p => p.id === partId);

      if (existing) {
        if (existing.service === serviceType) {
          // Remove se já selecionado com mesmo serviço
          return prev.filter(p => p.id !== partId);
        } else {
          // Atualiza tipo de serviço
          return prev.map(p =>
            p.id === partId ? { ...p, service: serviceType } : p
          );
        }
      } else {
        // Adiciona nova peça
        const part =
          partsByView[currentView].find(p => p.id === partId) ||
          Object.values(partsByView)
            .flat()
            .find(p => p.id === partId);
        return [
          ...prev,
          {
            id: partId,
            name: part.name,
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
    let message = `🚗 *ORÇAMENTO ESTIMADO - STREET PAINT*\n\n`;
    message += `📋 *Tipo de Veículo:* ${carType.toUpperCase()}\n\n`;
    message += `*PEÇAS SELECIONADAS:*\n`;
    message += `━━━━━━━━━━━━━━━━\n`;

    selectedParts.forEach(part => {
      const serviceLabel =
        part.service === 'paint' ? 'Pintura' : 'Pintura + Chapa';
      message += `▫️ ${part.name}\n`;
      message += `   ${serviceLabel}: €${part.price}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━\n`;
    message += `💰 *TOTAL ESTIMADO: €${total}*\n\n`;

    if (customerInfo.name) {
      message += `👤 *Cliente:* ${customerInfo.name}\n`;
    }
    if (customerInfo.phone) {
      message += `📞 *Telefone:* ${customerInfo.phone}\n`;
    }
    if (customerInfo.email) {
      message += `📧 *Email:* ${customerInfo.email}\n`;
    }

    message += `\n📍 *Street Paint - Sintra*\n`;
    message += `📞 960 172 705`;

    const whatsappNumber = '351960172705';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
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

  return (
    <div className='budget-details-page'>
      {/* Header */}
      <div className='details-header'>
        <div className='container'>
          <button
            className='back-button'
            onClick={() => navigate('/orcamento')}
          >
            ← Voltar
          </button>
          <h1>Orçamento para {carType?.toUpperCase()}</h1>
          <p>Selecione as peças danificadas e o tipo de serviço necessário</p>
        </div>
      </div>

      {/* Main Content */}
      <div className='container'>
        <div className='details-content'>
          {/* Car View Section */}
          <div className='car-view-section'>
            {/* View Selector */}
            <div className='view-selector'>
              {views.map(view => (
                <button
                  key={view.id}
                  className={`view-btn ${
                    currentView === view.id ? 'active' : ''
                  }`}
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
                  // CORREÇÃO DO LOOP INFINITO
                  // Previne loop infinito - só tenta fallback uma vez
                  if (!e.target.dataset.fallbackAttempted) {
                    e.target.dataset.fallbackAttempted = 'true';
                    e.target.src = `/images/cars/${carType}.png`;
                  } else if (!e.target.dataset.placeholderAttempted) {
                    // Se fallback também falhar, usa placeholder genérico
                    e.target.dataset.placeholderAttempted = 'true';
                    e.target.src = '/images/car-placeholder.png';
                  }
                }}
              />

              {/* Interactive Points */}
              {partsByView[currentView].map(part => (
                <div
                  key={part.id}
                  className={`part-point ${
                    isPartSelected(part.id) ? 'selected' : ''
                  }`}
                  style={{ left: `${part.x}%`, top: `${part.y}%` }}
                >
                  <div className='part-popup'>
                    <h4>{part.name}</h4>
                    <div className='service-options'>
                      <button
                        className={`service-btn ${
                          getSelectedService(part.id) === 'paint'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() => togglePart(part.id, 'paint')}
                      >
                        <span>🎨 Pintura</span>
                        <strong>€{getPrice(part.id, 'paint')}</strong>
                      </button>
                      <button
                        className={`service-btn ${
                          getSelectedService(part.id) === 'paintAndDent'
                            ? 'active'
                            : ''
                        }`}
                        onClick={() => togglePart(part.id, 'paintAndDent')}
                      >
                        <span>🔧 Pintura + Chapa</span>
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
                💡 Clique nas marcações <span className='highlight'>+</span>{' '}
                sobre as peças para adicionar ao orçamento
              </p>
            </div>
          </div>

          {/* Cart/Summary Section */}
          <div className={`cart-section ${showCart ? 'mobile-show' : ''}`}>
            <div className='cart-header'>
              <h3>📋 Resumo do Orçamento</h3>
              <button
                className='cart-toggle mobile-only'
                onClick={() => setShowCart(!showCart)}
              >
                ✕
              </button>
            </div>

            {/* Selected Parts List */}
            <div className='selected-parts-list'>
              {selectedParts.length === 0 ? (
                <div className='empty-cart'>
                  <p>Nenhuma peça selecionada</p>
                  <small>Clique nas peças do veículo para adicionar</small>
                </div>
              ) : (
                selectedParts.map(part => (
                  <div key={part.id} className='cart-item'>
                    <div className='item-info'>
                      <h4>{part.name}</h4>
                      <span className='service-type'>
                        {part.service === 'paint'
                          ? '🎨 Pintura'
                          : '🔧 Pintura + Chapa'}
                      </span>
                    </div>
                    <div className='item-actions'>
                      <span className='item-price'>€{part.price}</span>
                      <button
                        className='remove-btn'
                        onClick={() => togglePart(part.id, part.service)}
                      >
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
                  <span>Total Estimado:</span>
                  <strong>€{calculateTotal()}</strong>
                </div>

                {/* Customer Info */}
                <div className='customer-info-form'>
                  <h4>Seus Dados (Opcional)</h4>
                  <input
                    type='text'
                    placeholder='Nome'
                    value={customerInfo.name}
                    onChange={e =>
                      setCustomerInfo({ ...customerInfo, name: e.target.value })
                    }
                  />
                  <input
                    type='tel'
                    placeholder='Telefone'
                    value={customerInfo.phone}
                    onChange={e =>
                      setCustomerInfo({
                        ...customerInfo,
                        phone: e.target.value,
                      })
                    }
                  />
                  <input
                    type='email'
                    placeholder='Email'
                    value={customerInfo.email}
                    onChange={e =>
                      setCustomerInfo({
                        ...customerInfo,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Action Buttons */}
                <div className='cart-actions'>
                  <button className='whatsapp-btn' onClick={sendToWhatsApp}>
                    <span>📱</span>
                    Enviar para WhatsApp
                  </button>
                  <button
                    className='clear-btn'
                    onClick={() => setSelectedParts([])}
                  >
                    Limpar Tudo
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Cart Toggle */}
      <button className='mobile-cart-toggle' onClick={() => setShowCart(true)}>
        <span className='cart-icon'>🛒</span>
        {selectedParts.length > 0 && (
          <span className='cart-badge'>{selectedParts.length}</span>
        )}
      </button>
    </div>
  );
};

export default BudgetDetails;
