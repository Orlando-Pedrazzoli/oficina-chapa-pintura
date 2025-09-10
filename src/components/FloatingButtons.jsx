// src/components/FloatingButtons.jsx - COM LOGO WHATSAPP E CHATBOT VERMELHO
import { useState } from 'react';
import './FloatingButtons.css';

const FloatingButtons = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Bem-vindo à Street Paint. Como posso ajudá-lo hoje?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const WHATSAPP_NUMBER = '351960172705';

  // Base de conhecimento do chatbot
  const knowledgeBase = {
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
  };

  const quickReplies = [
    'Que serviços oferecem?',
    'Onde estão localizados?',
    'Horários',
    'Orçamento',
  ];

  const openWhatsApp = () => {
    const message =
      'Olá! Gostaria de informações sobre os serviços da Street Paint.';
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, '_blank');
  };

  const findResponse = userMessage => {
    const message = userMessage.toLowerCase();

    for (const [, data] of Object.entries(knowledgeBase)) {
      if (data.patterns.some(pattern => message.includes(pattern))) {
        return data.responses[
          Math.floor(Math.random() * data.responses.length)
        ];
      }
    }

    return 'Para informações específicas, clique no WhatsApp abaixo ou ligue 960 172 705!';
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: findResponse(inputText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const sendQuickReply = reply => {
    setInputText(reply);
    setTimeout(() => sendMessage(), 100);
  };

  // SVG do WhatsApp como componente
  const WhatsAppIcon = () => (
    <svg
      viewBox='0 0 32 32'
      width='30'
      height='30'
      fill='white'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.333c-2.663 0-5.258-0.82-7.46-2.355l-0.535-0.372-4.997 1.337 1.34-4.953-0.393-0.553c-1.567-2.207-2.389-4.82-2.389-7.54 0-7.363 5.97-13.333 13.333-13.333s13.333 5.97 13.333 13.333-5.97 13.333-13.333 13.333zM23.007 19.46c-0.383-0.192-2.268-1.12-2.62-1.247s-0.607-0.192-0.863 0.192-0.99 1.247-1.213 1.503-0.447 0.288-0.83 0.097c-0.383-0.192-1.62-0.597-3.083-1.903-1.14-1.017-1.91-2.273-2.133-2.657s-0.023-0.59 0.167-0.78c0.173-0.173 0.383-0.447 0.575-0.67s0.257-0.383 0.383-0.64 0.063-0.48-0.032-0.67-0.863-2.080-1.183-2.847c-0.31-0.747-0.627-0.647-0.863-0.657-0.223-0.010-0.48-0.013-0.735-0.013s-0.67 0.097-1.02 0.48c-0.35 0.383-1.34 1.31-1.34 3.197s1.373 3.71 1.563 3.967 2.703 4.127 6.547 5.787c0.913 0.393 1.627 0.63 2.183 0.807 0.917 0.29 1.753 0.25 2.413 0.15 0.737-0.11 2.267-0.927 2.587-1.82s0.32-1.663 0.223-1.82c-0.097-0.16-0.35-0.257-0.733-0.447z' />
    </svg>
  );

  return (
    <>
      {/* Container dos Botões Flutuantes */}
      <div className='floating-buttons-container'>
        {/* Botão do Chatbot - VERMELHO */}
        <button
          className={`floating-btn chatbot-btn ${isChatOpen ? 'active' : ''}`}
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label='Chat'
        >
          <span className='btn-icon'>{isChatOpen ? '✕' : '💬'}</span>
          <span className='btn-tooltip'>Chat</span>
        </button>

        {/* Botão do WhatsApp - COM LOGO */}
        <button
          className='floating-btn whatsapp-btn'
          onClick={openWhatsApp}
          aria-label='WhatsApp'
        >
          <WhatsAppIcon />
          <span className='btn-tooltip'>WhatsApp</span>
        </button>
      </div>

      {/* Janela do Chat */}
      {isChatOpen && (
        <div className='chatbot-window'>
          {/* Header - VERMELHO */}
          <div className='chat-header'>
            <div className='chat-header-info'>
              <div className='chat-avatar'>SP</div>
              <div>
                <h4>Assistente Street Paint</h4>
                <span className='chat-status'>Online • Resposta rápida</span>
              </div>
            </div>
            <button
              className='chat-close'
              onClick={() => setIsChatOpen(false)}
              aria-label='Fechar'
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className='chat-messages'>
            {messages.map(message => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className='message-bubble'>{message.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className='message bot'>
                <div className='message-bubble typing'>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          <div className='quick-replies'>
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className='quick-reply-btn'
                onClick={() => sendQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className='chat-input'>
            <input
              type='text'
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
              placeholder='Digite sua mensagem...'
            />
            <button onClick={sendMessage} className='send-btn'>
              ➤
            </button>
          </div>

          {/* WhatsApp Call-to-Action */}
          <button className='chat-whatsapp-cta' onClick={openWhatsApp}>
            <WhatsAppIcon />
            Prefere WhatsApp? Clique aqui
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;
