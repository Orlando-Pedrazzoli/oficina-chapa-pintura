// src/pages/Contact.jsx
import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);

    // Preparar mensagem para WhatsApp
    let message = `📞 *CONTACTO DO WEBSITE*\n\n`;
    message += `👤 *Nome:* ${formData.name}\n`;
    message += `📧 *Email:* ${formData.email}\n`;
    message += `📱 *Telefone:* ${formData.phone}\n`;
    message += `📋 *Assunto:* ${formData.subject}\n\n`;
    message += `💬 *Mensagem:*\n${formData.message}\n\n`;
    message += `⏰ *Enviado em:* ${new Date().toLocaleString('pt-PT')}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/351912164220?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappURL, '_blank');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);

      alert(
        'Mensagem preparada! O WhatsApp irá abrir para enviar o seu contacto.'
      );
    }, 1500);
  };

  return (
    <div className='contact-page'>
      <div className='contact-hero'>
        <div className='container'>
          <h1>Contacte-nos</h1>
          <p>
            Estamos aqui para ajudar com todas as suas necessidades de reparação
            automóvel
          </p>
        </div>
      </div>

      <div className='container'>
        <div className='contact-content'>
          <div className='contact-info'>
            <h2>Informações de Contacto</h2>

            <div className='contact-methods'>
              <div className='contact-method'>
                <div className='method-icon'>📍</div>
                <div className='method-details'>
                  <h3>Localização</h3>
                  <p>Lisboa, Portugal</p>
                  <small>Servimos toda a região de Lisboa</small>
                </div>
              </div>

              <div className='contact-method'>
                <div className='method-icon'>📞</div>
                <div className='method-details'>
                  <h3>Telefone</h3>
                  <p>+351 XXX XXX XXX</p>
                  <small>Segunda a Sexta: 8h-18h</small>
                </div>
              </div>

              <div className='contact-method'>
                <div className='method-icon'>✉️</div>
                <div className='method-details'>
                  <h3>Email</h3>
                  <p>info@chapapinturalisboa.pt</p>
                  <small>Resposta em 24h</small>
                </div>
              </div>

              <div className='contact-method'>
                <div className='method-icon'>📱</div>
                <div className='method-details'>
                  <h3>WhatsApp</h3>
                  <p>+351 XXX XXX XXX</p>
                  <small>Resposta rápida</small>
                </div>
              </div>
            </div>

            <div className='working-hours'>
              <h3>Horário de Funcionamento</h3>
              <div className='hours-grid'>
                <div className='hours-day'>
                  <span className='day'>Segunda-feira</span>
                  <span className='time'>08:00 - 18:00</span>
                </div>
                <div className='hours-day'>
                  <span className='day'>Terça-feira</span>
                  <span className='time'>08:00 - 18:00</span>
                </div>
                <div className='hours-day'>
                  <span className='day'>Quarta-feira</span>
                  <span className='time'>08:00 - 18:00</span>
                </div>
                <div className='hours-day'>
                  <span className='day'>Quinta-feira</span>
                  <span className='time'>08:00 - 18:00</span>
                </div>
                <div className='hours-day'>
                  <span className='day'>Sexta-feira</span>
                  <span className='time'>08:00 - 18:00</span>
                </div>
                <div className='hours-day'>
                  <span className='day'>Sábado</span>
                  <span className='time'>09:00 - 13:00</span>
                </div>
                <div className='hours-day'>
                  <span className='day'>Domingo</span>
                  <span className='time'>Fechado</span>
                </div>
              </div>
            </div>

            <div className='service-areas'>
              <h3>Áreas de Serviço</h3>
              <div className='areas-grid'>
                <span>Lisboa Centro</span>
                <span>Benfica</span>
                <span>Alvalade</span>
                <span>Lumiar</span>
                <span>Olivais</span>
                <span>Marvila</span>
                <span>Beato</span>
                <span>Areeiro</span>
                <span>Avenidas Novas</span>
                <span>Campo de Ourique</span>
                <span>Estrela</span>
                <span>Misericórdia</span>
              </div>
            </div>
          </div>

          <div className='contact-form-section'>
            <h2>Envie-nos uma Mensagem</h2>
            <p>
              Tem alguma dúvida? Entre em contacto connosco e responderemos o
              mais rapidamente possível.
            </p>

            <form className='contact-form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='name'>Nome Completo *</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder='Seu nome completo'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Email *</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder='seu@email.com'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='phone'>Telefone</label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder='+351 912164220'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='subject'>Assunto *</label>
                <select
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value=''>Selecione o assunto</option>
                  <option value='Orçamento'>Pedido de Orçamento</option>
                  <option value='Informações'>
                    Informações sobre Serviços
                  </option>
                  <option value='Agendamento'>Agendamento</option>
                  <option value='Reclamação'>Reclamação</option>
                  <option value='Sugestão'>Sugestão</option>
                  <option value='Outro'>Outro</option>
                </select>
              </div>

              <div className='form-group full-width'>
                <label htmlFor='message'>Mensagem *</label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows='6'
                  placeholder='Escreva aqui a sua mensagem...'
                />
              </div>

              <button
                type='submit'
                className='submit-btn'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className='spinner'></div>A enviar...
                  </>
                ) : (
                  'Enviar Mensagem'
                )}
              </button>
            </form>
          </div>
        </div>

        <div className='emergency-contact'>
          <div className='emergency-content'>
            <h3>🚨 Contacto de Emergência</h3>
            <p>
              Para situações urgentes ou acidentes, contacte-nos imediatamente:
            </p>
            <a href='tel:+351912164220' className='emergency-btn'>
              📞 Ligar Agora: +351 912164220
            </a>
          </div>
        </div>

        <div className='faq-section'>
          <h3>Perguntas Frequentes</h3>
          <div className='faq-grid'>
            <div className='faq-item'>
              <h4>Quanto tempo demora uma reparação?</h4>
              <p>
                Depende da extensão dos danos. Reparações simples podem demorar
                1-2 dias, enquanto trabalhos mais complexos podem levar uma
                semana.
              </p>
            </div>
            <div className='faq-item'>
              <h4>Trabalham com seguradoras?</h4>
              <p>
                Sim, trabalhamos com todas as principais companhias de seguro em
                Portugal.
              </p>
            </div>
            <div className='faq-item'>
              <h4>Oferecem garantia?</h4>
              <p>
                Todos os nossos trabalhos incluem garantia de 2 anos para sua
                tranquilidade.
              </p>
            </div>
            <div className='faq-item'>
              <h4>Fazem orçamentos gratuitos?</h4>
              <p>Sim, todos os orçamentos são gratuitos e sem compromisso.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
