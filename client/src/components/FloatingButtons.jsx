// src/components/FloatingButtons.jsx - VERSÃO COM MONGODB
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { floatingButtonsTranslations } from '../translations/floatingButtons';
import { useSiteContent } from '../hooks/useSiteContent';
import './FloatingButtons.css';

const FloatingButtons = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { language } = useLanguage();

  // Buscar contactos do MongoDB
  const { content: dbContacts } = useSiteContent('contact');

  // Obter traduções do idioma atual
  const t = floatingButtonsTranslations[language];

  // Helper para obter contacto do MongoDB
  const getContact = (key, fallback) => {
    if (dbContacts && dbContacts[`contact_${key}`]) {
      const value = dbContacts[`contact_${key}`];
      if (typeof value === 'object' && value[language]) return value[language];
      if (typeof value === 'object' && value.pt) return value.pt;
      if (typeof value === 'string') return value;
    }
    return fallback;
  };

  // WhatsApp do MongoDB (fallback para hardcoded)
  const WHATSAPP_NUMBER = getContact('whatsapp', '351960172705');

  // Horários do MongoDB
  const weekdayHours = getContact('weekday_hours', '09:00 - 18:00');
  const saturdayHours = getContact('saturday_hours', 'Encerrado');
  const scheduleDisplay = getContact('schedule', 'Seg-Sex: 9h-18h');

  // Inicializar mensagens quando o componente monta ou idioma muda
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: t.initialMessage,
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }, [language, t.initialMessage]);

  const openWhatsApp = () => {
    const message =
      language === 'pt'
        ? 'Olá! Gostaria de informações sobre os serviços da Street Paint.'
        : 'Hello! I would like information about Street Paint services.';
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, '_blank');
  };

  // Função para gerar resposta de horário dinâmica
  const getScheduleResponse = () => {
    const isSaturdayClosed = saturdayHours.toLowerCase() === 'encerrado' || 
                             saturdayHours.toLowerCase() === 'closed' ||
                             saturdayHours.toLowerCase() === 'fechado';
    
    if (language === 'pt') {
      return `Nosso horário de funcionamento é:\n` +
             `📅 Segunda a Sexta: ${weekdayHours}\n` +
             `📅 Sábado: ${isSaturdayClosed ? 'Encerrado' : saturdayHours}\n` +
             `📅 Domingo: Encerrado\n\n` +
             `Pode sempre enviar mensagem pelo WhatsApp! 📱`;
    } else {
      return `Our business hours are:\n` +
             `📅 Monday to Friday: ${weekdayHours}\n` +
             `📅 Saturday: ${isSaturdayClosed ? 'Closed' : saturdayHours}\n` +
             `📅 Sunday: Closed\n\n` +
             `You can always send a message via WhatsApp! 📱`;
    }
  };

  const findResponse = userMessage => {
    const message = userMessage.toLowerCase();

    // Verificar se é pergunta sobre horário
    const schedulePatterns = language === 'pt' 
      ? ['horário', 'horario', 'hora', 'aberto', 'fechado', 'funciona', 'abre', 'fecha']
      : ['hours', 'hour', 'open', 'close', 'schedule', 'time'];
    
    if (schedulePatterns.some(pattern => message.includes(pattern))) {
      return getScheduleResponse();
    }

    for (const [key, data] of Object.entries(t.knowledgeBase)) {
      if (key === 'defaultResponse') continue;

      if (data.patterns.some(pattern => message.includes(pattern))) {
        return data.responses[
          Math.floor(Math.random() * data.responses.length)
        ];
      }
    }

    return t.knowledgeBase.defaultResponse;
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
          aria-label={t.aria.chat}
        >
          <span className='btn-icon'>{isChatOpen ? '✕' : '💬'}</span>
          <span className='btn-tooltip'>{t.tooltips.chat}</span>
        </button>

        {/* Botão do WhatsApp - COM LOGO */}
        <button
          className='floating-btn whatsapp-btn'
          onClick={openWhatsApp}
          aria-label={t.aria.whatsapp}
        >
          <WhatsAppIcon />
          <span className='btn-tooltip'>{t.tooltips.whatsapp}</span>
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
                <h4>{t.chatHeader.title}</h4>
                <span className='chat-status'>{t.chatHeader.status}</span>
              </div>
            </div>
            <button
              className='chat-close'
              onClick={() => setIsChatOpen(false)}
              aria-label={t.aria.close}
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
            {t.quickReplies.map((reply, index) => (
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
              placeholder={t.inputPlaceholder}
            />
            <button onClick={sendMessage} className='send-btn'>
              ➤
            </button>
          </div>

          {/* WhatsApp Call-to-Action */}
          <button className='chat-whatsapp-cta' onClick={openWhatsApp}>
            <WhatsAppIcon />
            {t.whatsappCTA}
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;