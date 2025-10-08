// src/translations/floatingButtons.js
export const floatingButtonsTranslations = {
  pt: {
    tooltips: {
      chat: 'Chat',
      whatsapp: 'WhatsApp',
    },
    chatHeader: {
      title: 'Assistente Street Paint',
      status: 'Online • Resposta rápida',
    },
    initialMessage: 'Olá! Bem-vindo à Street Paint. Como posso ajudá-lo hoje?',
    quickReplies: [
      'Que serviços oferecem?',
      'Onde estão localizados?',
      'Horários',
      'Orçamento',
    ],
    knowledgeBase: {
      saudacoes: {
        patterns: ['olá', 'oi', 'bom dia', 'boa tarde', 'boa noite'],
        responses: ['Olá! Como posso ajudá-lo com seu veículo hoje?'],
      },
      servicos: {
        patterns: ['serviços', 'o que fazem', 'trabalhos'],
        responses: [
          'Oferecemos:\n• Martelinho de Ouro\n• Pintura Completa\n• Polimento\n• Restauração\n• Limpeza de Estofos\n\nQual serviço te interessa?',
        ],
      },
      localizacao: {
        patterns: ['onde', 'localização', 'endereço'],
        responses: ['📍 Av. Pedro Álvares Cabral 13, Sintra\n📞 960 172 705'],
      },
      horarios: {
        patterns: ['horário', 'horas', 'quando abrem'],
        responses: [
          '⏰ Seg-Sex: 09:00-18:00\n⏰ Sábado: 09:00-13:00\n⏰ Domingo: Fechado',
        ],
      },
      precos: {
        patterns: ['preço', 'quanto custa', 'orçamento'],
        responses: [
          'Orçamento GRATUITO! Clique no WhatsApp para falar conosco ou visite-nos.',
        ],
      },
      defaultResponse:
        'Para informações específicas, clique no WhatsApp abaixo ou ligue 960 172 705!',
    },
    inputPlaceholder: 'Digite sua mensagem...',
    whatsappCTA: 'Prefere WhatsApp? Clique aqui',
    aria: {
      chat: 'Chat',
      whatsapp: 'WhatsApp',
      close: 'Fechar',
    },
  },
  en: {
    tooltips: {
      chat: 'Chat',
      whatsapp: 'WhatsApp',
    },
    chatHeader: {
      title: 'Street Paint Assistant',
      status: 'Online • Quick response',
    },
    initialMessage: 'Hello! Welcome to Street Paint. How can I help you today?',
    quickReplies: [
      'What services do you offer?',
      'Where are you located?',
      'Hours',
      'Quote',
    ],
    knowledgeBase: {
      saudacoes: {
        patterns: [
          'hello',
          'hi',
          'good morning',
          'good afternoon',
          'good evening',
        ],
        responses: ['Hello! How can I help you with your vehicle today?'],
      },
      servicos: {
        patterns: ['services', 'what do you do', 'work'],
        responses: [
          'We offer:\n• Paintless Dent Repair\n• Complete Painting\n• Polishing\n• Restoration\n• Upholstery Cleaning\n\nWhich service interests you?',
        ],
      },
      localizacao: {
        patterns: ['where', 'location', 'address'],
        responses: ['📍 Av. Pedro Álvares Cabral 13, Sintra\n📞 960 172 705'],
      },
      horarios: {
        patterns: ['hours', 'schedule', 'when open'],
        responses: [
          '⏰ Mon-Fri: 09:00-18:00\n⏰ Saturday: 09:00-13:00\n⏰ Sunday: Closed',
        ],
      },
      precos: {
        patterns: ['price', 'how much', 'quote', 'budget'],
        responses: ['FREE Quote! Click on WhatsApp to talk to us or visit us.'],
      },
      defaultResponse:
        'For specific information, click on WhatsApp below or call 960 172 705!',
    },
    inputPlaceholder: 'Type your message...',
    whatsappCTA: 'Prefer WhatsApp? Click here',
    aria: {
      chat: 'Chat',
      whatsapp: 'WhatsApp',
      close: 'Close',
    },
  },
};
