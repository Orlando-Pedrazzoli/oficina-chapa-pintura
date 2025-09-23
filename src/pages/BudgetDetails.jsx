// src/pages/BudgetDetails.jsx - CÓDIGO COMPLETO ATUALIZADO
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
  const [activePopup, setActivePopup] = useState(null); // Novo estado para controlar popup ativo
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });

  // Preços base - iguais para todos os tipos de carro
  const basePrices = {
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

  // ESTRUTURA COMPLETA: Peças por vista para cada tipo de carro
  const partsByCarType = {
    // SPORT
    sport: {
      front: [
        {
          id: 'para-choque-dianteiro',
          name: 'Pára-choques Dianteiro',
          x: 47,
          y: 60,
        },
        {
          id: 'capo',
          name: 'Capô',
          x: 47,
          y: 37,
        },
        {
          id: 'retrovisor-esquerdo',
          name: 'Retrovisor Esquerdo',
          x: 8,
          y: 25,
        },
        {
          id: 'retrovisor-direito',
          name: 'Retrovisor Direito',
          x: 86,
          y: 25,
        },
      ],
      back: [
        {
          id: 'para-choque-traseiro',
          name: 'Pára-choques Traseiro',
          x: 47,
          y: 62,
        },
        {
          id: 'mala',
          name: 'Tampa da Bagageira',
          x: 47,
          y: 40,
        },
      ],
      left: [
        {
          id: 'porta-dianteira-esquerda',
          name: 'Porta Dianteira (Lado Esq.)',
          x: 44,
          y: 45,
        },

        {
          id: 'guarda-lamas-dianteiro-esquerdo',
          name: 'Guarda-lamas Dianteiro (Lado Esq.)',
          x: 24,
          y: 41,
        },
        {
          id: 'ilharga-esquerda',
          name: 'Ilharga (Lado Esq.)',
          x: 70,
          y: 39,
        },
        {
          id: 'embaladeira-esquerda',
          name: 'Embaladeira (Lado Esq.)',
          x: 50,
          y: 61,
        },
      ],
      right: [
        {
          id: 'porta-dianteira-direita',
          name: 'Porta Dianteira (Lado Dir.)',
          x: 50,
          y: 45,
        },

        {
          id: 'guarda-lamas-dianteiro-direito',
          name: 'Guarda-lamas Dianteiro (Lado Dir.)',
          x: 69,
          y: 43,
        },
        {
          id: 'ilharga-direita',
          name: 'Ilharga (Lado Dir.)',
          x: 26,
          y: 40,
        },
        {
          id: 'embaladeira-direita',
          name: 'Embaladeira (Lado Dir.)',
          x: 45,
          y: 62,
        },
      ],
      top: [
        {
          id: 'tejadilho',
          name: 'Tejadilho',
          x: 40,
          y: 42,
        },
      ],
    },

    // HATCHBACK
    hatchback: {
      front: [
        {
          id: 'para-choque-dianteiro',
          name: 'Pára-choques Dianteiro',
          x: 47,
          y: 62,
        },
        {
          id: 'capo',
          name: 'Capô',
          x: 47,
          y: 35,
        },
        {
          id: 'retrovisor-esquerdo',
          name: 'Retrovisor Esquerdo',
          x: 8,
          y: 25,
        },
        {
          id: 'retrovisor-direito',
          name: 'Retrovisor Direito',
          x: 86,
          y: 25,
        },
      ],
      back: [
        {
          id: 'para-choque-traseiro',
          name: 'Pára-choques Traseiro',
          x: 47,
          y: 67,
        },
        {
          id: 'mala',
          name: 'Tampa da Bagageira',
          x: 47,
          y: 45,
        },
      ],
      left: [
        {
          id: 'porta-dianteira-esquerda',
          name: 'Porta Dianteira (Lado Esq.)',
          x: 40,
          y: 45,
        },
        {
          id: 'porta-traseira-esquerda',
          name: 'Porta Traseira (Lado Esq.)',
          x: 60,
          y: 45,
        },
        {
          id: 'guarda-lamas-dianteiro-esquerdo',
          name: 'Guarda-lamas Dianteiro (Lado Esq.)',
          x: 24,
          y: 43,
        },
        {
          id: 'ilharga-esquerda',
          name: 'Ilharga (Lado Esq.)',
          x: 78,
          y: 40,
        },
        {
          id: 'embaladeira-esquerda',
          name: 'Embaladeira (Lado Esq.)',
          x: 50,
          y: 64,
        },
      ],
      right: [
        {
          id: 'porta-dianteira-direita',
          name: 'Porta Dianteira (Lado Dir.)',
          x: 52,
          y: 45,
        },
        {
          id: 'porta-traseira-direita',
          name: 'Porta Traseira (Lado Dir.)',
          x: 32,
          y: 45,
        },
        {
          id: 'guarda-lamas-dianteiro-direito',
          name: 'Guarda-lamas Dianteiro (Lado Dir.)',
          x: 69,
          y: 43,
        },
        {
          id: 'ilharga-direita',
          name: 'Ilharga (Lado Dir.)',
          x: 16,
          y: 40,
        },
        {
          id: 'embaladeira-direita',
          name: 'Embaladeira (Lado Dir.)',
          x: 45,
          y: 64,
        },
      ],
      top: [
        {
          id: 'tejadilho',
          name: 'Tejadilho',
          x: 40,
          y: 42,
        },
        {
          id: 'aileron',
          name: 'Aileron',
          x: 16,
          y: 42,
        },
      ],
    },

    // SEDAN
    sedan: {
      front: [
        {
          id: 'para-choque-dianteiro',
          name: 'Pára-choques Dianteiro',
          x: 47,
          y: 62,
        },
        {
          id: 'capo',
          name: 'Capô',
          x: 47,
          y: 35,
        },
        {
          id: 'retrovisor-esquerdo',
          name: 'Retrovisor Esquerdo',
          x: 8,
          y: 25,
        },
        {
          id: 'retrovisor-direito',
          name: 'Retrovisor Direito',
          x: 86,
          y: 25,
        },
      ],
      back: [
        {
          id: 'para-choque-traseiro',
          name: 'Pára-choques Traseiro',
          x: 47,
          y: 63,
        },
        {
          id: 'mala',
          name: 'Tampa da Bagageira',
          x: 47,
          y: 45,
        },
      ],
      left: [
        {
          id: 'porta-dianteira-esquerda',
          name: 'Porta Dianteira (Lado Esq.)',
          x: 40,
          y: 45,
        },
        {
          id: 'porta-traseira-esquerda',
          name: 'Porta Traseira (Lado Esq.)',
          x: 60,
          y: 45,
        },
        {
          id: 'guarda-lamas-dianteiro-esquerdo',
          name: 'Guarda-lamas Dianteiro (Lado Esq.)',
          x: 24,
          y: 41,
        },
        {
          id: 'ilharga-esquerda',
          name: 'Ilharga (Lado Esq.)',
          x: 77,
          y: 38,
        },
        {
          id: 'embaladeira-esquerda',
          name: 'Embaladeira (Lado Esq.)',
          x: 50,
          y: 61,
        },
      ],
      right: [
        {
          id: 'porta-dianteira-direita',
          name: 'Porta Dianteira (Lado Dir.)',
          x: 55,
          y: 45,
        },
        {
          id: 'porta-traseira-direita',
          name: 'Porta Traseira (Lado Dir.)',
          x: 35,
          y: 45,
        },
        {
          id: 'guarda-lamas-dianteiro-direito',
          name: 'Guarda-lamas Dianteiro (Lado Dir.)',
          x: 69,
          y: 43,
        },
        {
          id: 'ilharga-direita',
          name: 'Ilharga (Lado Dir.)',
          x: 17,
          y: 40,
        },
        {
          id: 'embaladeira-direita',
          name: 'Embaladeira (Lado Dir.)',
          x: 45,
          y: 62,
        },
      ],
      top: [
        {
          id: 'tejadilho',
          name: 'Tejadilho',
          x: 40,
          y: 42,
        },
      ],
    },

    // SUV
    suv: {
      front: [
        {
          id: 'para-choque-dianteiro',
          name: 'Pára-choques Dianteiro',
          x: 47,
          y: 60,
        },
        {
          id: 'capo',
          name: 'Capô',
          x: 47,
          y: 35,
        },
        {
          id: 'retrovisor-esquerdo',
          name: 'Retrovisor Esquerdo',
          x: 8,
          y: 25,
        },
        {
          id: 'retrovisor-direito',
          name: 'Retrovisor Direito',
          x: 86,
          y: 25,
        },
      ],
      back: [
        {
          id: 'para-choque-traseiro',
          name: 'Pára-choques Traseiro',
          x: 47,
          y: 72,
        },
        {
          id: 'mala',
          name: 'Tampa da Bagageira',
          x: 47,
          y: 45,
        },
      ],
      left: [
        {
          id: 'porta-dianteira-esquerda',
          name: 'Porta Dianteira (Lado Esq.)',
          x: 40,
          y: 45,
        },
        {
          id: 'porta-traseira-esquerda',
          name: 'Porta Traseira (Lado Esq.)',
          x: 60,
          y: 45,
        },
        {
          id: 'guarda-lamas-dianteiro-esquerdo',
          name: 'Guarda-lamas Dianteiro (Lado Esq.)',
          x: 24,
          y: 41,
        },
        {
          id: 'ilharga-esquerda',
          name: 'Ilharga (Lado Esq.)',
          x: 77,
          y: 38,
        },
        {
          id: 'embaladeira-esquerda',
          name: 'Embaladeira (Lado Esq.)',
          x: 50,
          y: 61,
        },
      ],
      right: [
        {
          id: 'porta-dianteira-direita',
          name: 'Porta Dianteira (Lado Dir.)',
          x: 55,
          y: 45,
        },
        {
          id: 'porta-traseira-direita',
          name: 'Porta Traseira (Lado Dir.)',
          x: 35,
          y: 45,
        },
        {
          id: 'guarda-lamas-dianteiro-direito',
          name: 'Guarda-lamas Dianteiro (Lado Dir.)',
          x: 69,
          y: 43,
        },
        {
          id: 'ilharga-direita',
          name: 'Ilharga (Lado Dir.)',
          x: 17,
          y: 40,
        },
        {
          id: 'embaladeira-direita',
          name: 'Embaladeira (Lado Dir.)',
          x: 45,
          y: 62,
        },
      ],
      top: [
        {
          id: 'tejadilho',
          name: 'Tejadilho',
          x: 40,
          y: 42,
        },
        {
          id: 'aileron',
          name: 'Aileron',
          x: 16,
          y: 42,
        },
      ],
    },

    // VAN
    van: {
      front: [
        {
          id: 'para-choque-dianteiro',
          name: 'Pára-choques Dianteiro',
          x: 47,
          y: 68,
        },
        {
          id: 'capo',
          name: 'Capô',
          x: 47,
          y: 35,
        },
        {
          id: 'retrovisor-esquerdo',
          name: 'Retrovisor Esquerdo',
          x: 8,
          y: 27,
        },
        {
          id: 'retrovisor-direito',
          name: 'Retrovisor Direito',
          x: 86,
          y: 27,
        },
      ],
      back: [
        {
          id: 'para-choque-traseiro',
          name: 'Pára-choques Traseiro',
          x: 47,
          y: 75,
        },
        {
          id: 'mala',
          name: 'Portas Traseiras',
          x: 47,
          y: 45,
        },
      ],
      left: [
        {
          id: 'porta-dianteira-esquerda',
          name: 'Porta Dianteira (Lado Esq.)',
          x: 36,
          y: 48,
        },
        {
          id: 'porta-traseira-esquerda',
          name: 'Porta Lateral Deslizante (Lado Esq.)',
          x: 57,
          y: 48,
        },
        {
          id: 'guarda-lamas-dianteiro-esquerdo',
          name: 'Guarda-lamas Dianteiro (Lado Esq.)',
          x: 21,
          y: 45,
        },
        {
          id: 'ilharga-esquerda',
          name: 'Ilharga (Lado Esq.)',
          x: 77,
          y: 43,
        },
        {
          id: 'embaladeira-esquerda',
          name: 'Embaladeira (Lado Esq.)',
          x: 46,
          y: 64,
        },
      ],
      right: [
        {
          id: 'porta-dianteira-direita',
          name: 'Porta Dianteira (Lado Dir.)',
          x: 60,
          y: 48,
        },
        {
          id: 'porta-traseira-direita',
          name: 'Porta Lateral Deslizante (Lado Dir.)',
          x: 38,
          y: 48,
        },
        {
          id: 'guarda-lamas-dianteiro-direito',
          name: 'Guarda-lamas Dianteiro (Lado Dir.)',
          x: 74,
          y: 45,
        },
        {
          id: 'ilharga-direita',
          name: 'Ilharga (Lado Dir.)',
          x: 17,
          y: 45,
        },
        {
          id: 'embaladeira-direita',
          name: 'Embaladeira (Lado Dir.)',
          x: 45,
          y: 64,
        },
      ],
      top: [
        {
          id: 'tejadilho',
          name: 'Tejadilho',
          x: 40,
          y: 42,
        },
      ],
    },

    // PICKUP
    pickup: {
      front: [
        {
          id: 'para-choque-dianteiro',
          name: 'Pára-choques Dianteiro',
          x: 47,
          y: 60,
        },
        {
          id: 'capo',
          name: 'Capô',
          x: 47,
          y: 32,
        },
        {
          id: 'retrovisor-esquerdo',
          name: 'Retrovisor Esquerdo',
          x: 8,
          y: 25,
        },
        {
          id: 'retrovisor-direito',
          name: 'Retrovisor Direito',
          x: 86,
          y: 25,
        },
      ],
      back: [
        {
          id: 'para-choque-traseiro',
          name: 'Pára-choques Traseiro',
          x: 47,
          y: 66,
        },
        {
          id: 'mala',
          name: 'Tampa da Caçamba',
          x: 47,
          y: 45,
        },
      ],
      left: [
        {
          id: 'porta-dianteira-esquerda',
          name: 'Porta Dianteira (Lado Esq.)',
          x: 37,
          y: 45,
        },
        {
          id: 'porta-traseira-esquerda',
          name: 'Porta Traseira (Lado Esq.)',
          x: 54,
          y: 45,
        },
        {
          id: 'guarda-lamas-dianteiro-esquerdo',
          name: 'Guarda-lamas Dianteiro (Lado Esq.)',
          x: 23,
          y: 41,
        },
        {
          id: 'ilharga-esquerda',
          name: 'Ilharga (Lado Esq.)',
          x: 75,
          y: 40,
        },
        {
          id: 'embaladeira-esquerda',
          name: 'Embaladeira (Lado Esq.)',
          x: 44,
          y: 58,
        },
      ],
      right: [
        {
          id: 'porta-dianteira-direita',
          name: 'Porta Dianteira (Lado Dir.)',
          x: 57,
          y: 45,
        },
        {
          id: 'porta-traseira-direita',
          name: 'Porta Traseira (Lado Dir.)',
          x: 40,
          y: 45,
        },
        {
          id: 'guarda-lamas-dianteiro-direito',
          name: 'Guarda-lamas Dianteiro (Lado Dir.)',
          x: 73,
          y: 40,
        },
        {
          id: 'ilharga-direita',
          name: 'Ilharga (Lado Dir.)',
          x: 20,
          y: 40,
        },
        {
          id: 'embaladeira-direita',
          name: 'Embaladeira (Lado Dir.)',
          x: 48,
          y: 58,
        },
      ],
      top: [
        {
          id: 'tejadilho',
          name: 'Tejadilho da Cabine',
          x: 45,
          y: 42,
        },
      ],
    },
  };

  const views = [
    { id: 'front', name: 'Frente', icon: '🚗' },
    { id: 'back', name: 'Traseira', icon: '🚙' },
    { id: 'left', name: 'Lateral Esq.', icon: '⬅️' },
    { id: 'right', name: 'Lateral Dir.', icon: '➡️' },
    { id: 'top', name: 'Superior', icon: '⬇️' },
  ];

  // Calcular preço (sem multiplicador)
  const getPrice = (partId, serviceType) => {
    const basePrice = basePrices[partId]?.[serviceType] || 0;
    return basePrice;
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
        const currentCarParts = partsByCarType[carType];
        const part =
          currentCarParts[currentView].find(p => p.id === partId) ||
          Object.values(currentCarParts)
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

  // Obter as peças baseado no tipo de carro atual
  const getCurrentParts = () => {
    // Verificar se o tipo de carro existe na estrutura
    if (!partsByCarType[carType]) {
      console.warn(
        `Tipo de carro '${carType}' não encontrado. Usando hatchback como padrão.`
      );
      return partsByCarType.hatchback[currentView] || [];
    }

    // Retornar as peças específicas do tipo de carro e vista atual
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
                  // Previne loop infinito
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
                  className={`part-point ${
                    isPartSelected(part.id) ? 'selected' : ''
                  } ${activePopup === part.id ? 'popup-visible' : ''}`}
                  style={{ left: `${part.x}%`, top: `${part.y}%` }}
                  onClick={e => {
                    // Para mobile - controle por click
                    if (window.innerWidth <= 768) {
                      e.stopPropagation();
                      if (activePopup === part.id) {
                        setActivePopup(null);
                      } else {
                        setActivePopup(part.id);
                      }
                    }
                  }}
                  onMouseEnter={() => {
                    // Para desktop - mantém hover
                    if (window.innerWidth > 768) {
                      setActivePopup(part.id);
                    }
                  }}
                  onMouseLeave={() => {
                    // Para desktop - remove hover
                    if (window.innerWidth > 768) {
                      setActivePopup(null);
                    }
                  }}
                >
                  <div
                    className='part-popup'
                    style={{
                      opacity: activePopup === part.id ? 1 : 0,
                      visibility:
                        activePopup === part.id ? 'visible' : 'hidden',
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
                    <h4>{part.name}</h4>
                    <div className='service-options'>
                      <button
                        className={`service-btn ${
                          getSelectedService(part.id) === 'paint'
                            ? 'active'
                            : ''
                        }`}
                        onClick={e => {
                          e.stopPropagation();
                          togglePart(part.id, 'paint');
                        }}
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
                        onClick={e => {
                          e.stopPropagation();
                          togglePart(part.id, 'paintAndDent');
                        }}
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
            {/* Mobile overlay background */}
            {showCart && (
              <div
                className='mobile-overlay'
                onClick={() => setShowCart(false)}
              ></div>
            )}

            <div className='cart-content'>
              <div className='cart-header'>
                <h3>📋 Resumo do Orçamento</h3>
                <button
                  className='cart-close mobile-only'
                  onClick={() => setShowCart(false)}
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
                        setCustomerInfo({
                          ...customerInfo,
                          name: e.target.value,
                        })
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
      </div>

      {/* Mobile Cart Toggle - Só aparece se houver itens selecionados */}
      {selectedParts.length > 0 && (
        <button
          className='mobile-cart-toggle'
          onClick={() => setShowCart(true)}
        >
          <span className='cart-icon'>🛒</span>
          <span className='cart-badge'>{selectedParts.length}</span>
          <span className='cart-total-preview'>€{calculateTotal()}</span>
        </button>
      )}
    </div>
  );
};

export default BudgetDetails;
