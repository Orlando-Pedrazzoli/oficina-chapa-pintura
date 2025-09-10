import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  const messagesEndRef = useRef(null);

  // Base de conhecimento da Street Paint
  const knowledgeBase = {
    saudacoes: {
      patterns: [
        'olá',
        'oi',
        'bom dia',
        'boa tarde',
        'boa noite',
        'hey',
        'hello',
      ],
      responses: [
        'Olá! Bem-vindo à Street Paint! Como posso ajudá-lo?',
        'Oi! Sou o assistente da Street Paint. No que posso ser útil?',
        'Olá! Pronto para ajudá-lo com qualquer dúvida sobre nossos serviços!',
      ],
    },
    servicos: {
      patterns: [
        'serviços',
        'o que fazem',
        'que serviços',
        'trabalhos',
        'especialidades',
      ],
      responses: [
        'A Street Paint oferece serviços completos de chapa e pintura:\n\n• Martelinho de Ouro\n• Revitalização de Pintura\n• Pintura de Interior\n• Pintura de Jantes\n• Polimento de Óticas\n• Restauração de Volantes\n• Limpeza de Estofos\n• Pintura Completa\n• Reparação de chapa (bate-chapa)\n• Recondicionamento geral de veículos\n\nTrabalhamos com todas as marcas automóveis. Qual serviço te interessa?',
      ],
    },
    localizacao: {
      patterns: ['onde', 'localização', 'morada', 'endereço', 'sintra'],
      responses: [
        'Localização Street Paint:\n\nAvenida Pedro Álvares Cabral 13\nSintra, Lisboa\nCEP: 2710-144\n\nServimos Sintra e toda a região envolvente. Localização de fácil acesso com estacionamento disponível.',
      ],
    },
    horarios: {
      patterns: ['horário', 'horas', 'quando abrem', 'funcionamento'],
      responses: [
        'Horários de Funcionamento Street Paint:\n\nSegunda a Sexta: 09:00 às 18:00\nSábado: 09:00 às 13:00\nDomingo: Fechado\n\nTemos flexibilidade para casos urgentes. Contacte-nos para situações especiais!',
      ],
    },
    contato: {
      patterns: ['contacto', 'telefone', 'whatsapp', 'ligar'],
      responses: [
        'Como Contactar a Street Paint:\n\nTelefone: 960 172 705\n• Chamada direta durante horário comercial\n• WhatsApp disponível\n• Resposta rápida garantida\n• Atendimento personalizado\n\nEstamos sempre disponíveis para ajudar!',
      ],
    },
    precos: {
      patterns: ['preço', 'quanto custa', 'valor', 'orçamento', 'custo'],
      responses: [
        'Orçamentos Street Paint:\n\n• Orçamento GRATUITO e sem compromisso\n• Preços justos e competitivos\n• Avaliação personalizada para cada caso\n• Transparência total nos valores\n• Atendimento personalizado\n• Facilidades de pagamento\n\nPara um orçamento preciso, contacte-nos pelos nossos canais!',
      ],
    },
    martelinho: {
      patterns: ['martelinho', 'amolgadelas', 'pdr', 'danos granizo'],
      responses: [
        'Martelinho de Ouro (PDR):\n\n• Reparação sem pintura\n• Preserva pintura original\n• Ideal para amolgadelas de granizo\n• Danos de estacionamento\n• Resultado completamente invisível\n\nÉ uma técnica especializada que mantém a pintura original do seu veículo.',
      ],
    },
    pintura: {
      patterns: ['pintura', 'pintar', 'tinta', 'cor', 'verniz'],
      responses: [
        'Serviços de Pintura Street Paint:\n\n• Pintura Completa do veículo\n• Revitalização de pintura existente\n• Pintura de interior (painéis, consolas)\n• Retoque de riscos e arranhões\n• Verniz de proteção UV\n• Acabamento profissional\n• Cores personalizadas disponíveis\n\nUsamos equipamentos modernos e técnicas de qualidade.',
      ],
    },
    seguros: {
      patterns: ['seguro', 'seguradora', 'sinistro', 'acidente'],
      responses: [
        'Trabalho com Seguradoras:\n\n• Aceitamos todas as companhias de seguro\n• Tratamento direto com seguradoras\n• Orçamentos para sinistros\n• Experiência com processos de seguro\n• Facilita todo o processo\n• Transparência no orçamento\n\nDeixe-nos tratar de tudo com sua seguradora!',
      ],
    },
    manutencao: {
      patterns: ['manutenção', 'cuidados', 'conservação', 'preservar'],
      responses: [
        'Dicas de Manutenção Automotiva:\n\n• Lave o carro regularmente (semanal)\n• Aplique cera protetora a cada 3 meses\n• Evite estacionar sob árvores\n• Repare riscos rapidamente\n• Use produtos de qualidade\n• Mantenha interior limpo\n\nPrevenir é sempre melhor que reparar!',
      ],
    },
    lavagem: {
      patterns: [
        'como lavar',
        'lavar carro',
        'técnica lavagem',
        'lavagem correta',
      ],
      responses: [
        'Técnica Correta de Lavagem:\n\nPasso a passo:\n1. Enxague com água fria\n2. Use método dos dois baldes\n3. Lave de cima para baixo\n4. Enxague constantemente\n5. Seque com toalha limpa\n6. Aplique proteção\n\nEvite:\n• Lavar no sol direto\n• Produtos domésticos\n• Esponjas abrasivas',
      ],
    },
  };

  const quickReplies = [
    'Que serviços oferecem?',
    'Onde estão localizados?',
    'Horários de funcionamento',
    'Como lavar o carro?',
    'Orçamento gratuito',
    'Trabalham com seguros?',
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const findResponse = userMessage => {
    const message = userMessage.toLowerCase();

    for (const [category, data] of Object.entries(knowledgeBase)) {
      if (data.patterns.some(pattern => message.includes(pattern))) {
        const responses = data.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    return 'Obrigado pela sua pergunta! Para uma resposta mais específica, recomendo que:\n\nLigue-nos diretamente: 960 172 705\nUse nosso WhatsApp\nSolicite um orçamento gratuito\n\nNossa equipa terá todo o prazer em ajudá-lo pessoalmente!';
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

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Botão do Chatbot */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '100px', // Aumentei para 100px para dar mais espaço
          zIndex: 1000,
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#dc2626',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(220, 38, 38, 0.4)',
            transition: 'all 0.3s ease',
            transform: isOpen ? 'scale(0.9)' : 'scale(1)',
          }}
        >
          <span style={{ fontSize: '24px', color: 'white' }}>
            {isOpen ? '✕' : '💬'}
          </span>
        </div>
      </div>

      {/* Janela do Chat */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '100px', // Alinhado com o botão do chat
            width: '350px',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header do Chat */}
          <div
            style={{
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
              color: 'white',
              padding: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              SP
            </div>
            <div>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>
                Assistente Street Paint
              </h4>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
                Online • Resposta rápida
              </p>
            </div>
          </div>

          {/* Área de Mensagens */}
          <div
            style={{
              flex: 1,
              padding: '15px',
              overflowY: 'auto',
              backgroundColor: '#f8fafc',
            }}
          >
            {messages.map(message => (
              <div
                key={message.id}
                style={{
                  marginBottom: '15px',
                  display: 'flex',
                  flexDirection:
                    message.sender === 'user' ? 'row-reverse' : 'row',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '10px 15px',
                    borderRadius: '15px',
                    backgroundColor:
                      message.sender === 'user' ? '#dc2626' : 'white',
                    color: message.sender === 'user' ? 'white' : '#374151',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    whiteSpace: 'pre-line',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <div
                  style={{
                    padding: '10px 15px',
                    backgroundColor: 'white',
                    borderRadius: '15px',
                    fontSize: '14px',
                    color: '#6b7280',
                  }}
                >
                  <span>Digitando...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Respostas Rápidas */}
          <div style={{ padding: '10px 15px 0' }}>
            <div
              style={{
                display: 'flex',
                gap: '5px',
                overflowX: 'auto',
                paddingBottom: '10px',
              }}
            >
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => sendQuickReply(reply)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '20px',
                    fontSize: '12px',
                    color: '#374151',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseOver={e => {
                    e.target.style.backgroundColor = '#dc2626';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={e => {
                    e.target.style.backgroundColor = '#f3f4f6';
                    e.target.style.color = '#374151';
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input de Mensagem */}
          <div
            style={{
              padding: '15px',
              borderTop: '1px solid #e5e7eb',
              display: 'flex',
              gap: '10px',
            }}
          >
            <input
              type='text'
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='Digite sua pergunta...'
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '20px',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#dc2626',
                border: 'none',
                borderRadius: '50%',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
