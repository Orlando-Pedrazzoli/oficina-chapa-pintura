// src/pages/Contact.jsx - VERSÃO COM TRADUÇÃO COMPLETA
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { contactTranslations } from '../translations/contact';
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
  const { language } = useLanguage();

  // Obter traduções do idioma atual
  const t = contactTranslations[language];

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
    let message =
      language === 'pt'
        ? `📞 *CONTACTO DO WEBSITE*\n\n`
        : `📞 *WEBSITE CONTACT*\n\n`;

    message +=
      language === 'pt'
        ? `👤 *Nome:* ${formData.name}\n`
        : `👤 *Name:* ${formData.name}\n`;

    message += `📧 *Email:* ${formData.email}\n`;

    message +=
      language === 'pt'
        ? `📱 *Telefone:* ${formData.phone}\n`
        : `📱 *Phone:* ${formData.phone}\n`;

    message +=
      language === 'pt'
        ? `📋 *Assunto:* ${formData.subject}\n\n`
        : `📋 *Subject:* ${formData.subject}\n\n`;

    message +=
      language === 'pt'
        ? `💬 *Mensagem:*\n${formData.message}\n\n`
        : `💬 *Message:*\n${formData.message}\n\n`;

    message +=
      language === 'pt'
        ? `⏰ *Enviado em:* ${new Date().toLocaleString('pt-PT')}`
        : `⏰ *Sent at:* ${new Date().toLocaleString('en-US')}`;

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

      alert(t.form.alert);
    }, 1500);
  };

  return (
    <div className='contact-page'>
      <div className='contact-hero'>
        <div className='container'>
          <h1>{t.hero.title}</h1>
          <p>{t.hero.subtitle}</p>
        </div>
      </div>

      <div className='container'>
        <div className='contact-content'>
          <div className='contact-info'>
            <h2>{t.info.title}</h2>

            <div className='contact-methods'>
              <div className='contact-method'>
                <div className='method-icon'>📍</div>
                <div className='method-details'>
                  <h3>{t.info.methods.location.title}</h3>
                  <p>{t.info.methods.location.value}</p>
                  <small>{t.info.methods.location.description}</small>
                </div>
              </div>

              <div className='contact-method'>
                <div className='method-icon'>📞</div>
                <div className='method-details'>
                  <h3>{t.info.methods.phone.title}</h3>
                  <p>{t.info.methods.phone.value}</p>
                  <small>{t.info.methods.phone.description}</small>
                </div>
              </div>

              <div className='contact-method'>
                <div className='method-icon'>✉️</div>
                <div className='method-details'>
                  <h3>{t.info.methods.email.title}</h3>
                  <p>{t.info.methods.email.value}</p>
                  <small>{t.info.methods.email.description}</small>
                </div>
              </div>

              <div className='contact-method'>
                <div className='method-icon'>📱</div>
                <div className='method-details'>
                  <h3>{t.info.methods.whatsapp.title}</h3>
                  <p>{t.info.methods.whatsapp.value}</p>
                  <small>{t.info.methods.whatsapp.description}</small>
                </div>
              </div>
            </div>

            <div className='working-hours'>
              <h3>{t.workingHours.title}</h3>
              <div className='hours-grid'>
                <div className='hours-day'>
                  <span className='day'>{t.workingHours.days.monday}</span>
                  <span className='time'>{t.workingHours.times.weekday}</span>
                </div>
                <div className='hours-day'>
                  <span className='day'>{t.workingHours.days.tuesday}</span>
                  <span className='time'>{t.workingHours.times.weekday}</span>
                </div>
                <div className='hours-day'>
                  <span className='day'>{t.workingHours.days.wednesday}</span>
                  <span className='time'>{t.workingHours.times.weekday}</span>
                </div>
                <div className='hours-day'>
                  <span className='day'>{t.workingHours.days.thursday}</span>
                  <span className='time'>{t.workingHours.times.weekday}</span>
                </div>
                <div className='hours-day'>
                  <span className='day'>{t.workingHours.days.friday}</span>
                  <span className='time'>{t.workingHours.times.weekday}</span>
                </div>
                <div className='hours-day'>
                  <span className='day'>{t.workingHours.days.saturday}</span>
                  <span className='time'>{t.workingHours.times.saturday}</span>
                </div>
                <div className='hours-day'>
                  <span className='day'>{t.workingHours.days.sunday}</span>
                  <span className='time'>{t.workingHours.times.closed}</span>
                </div>
              </div>
            </div>
          </div>

          <div className='contact-form-section'>
            <h2>{t.form.title}</h2>
            <p>{t.form.subtitle}</p>

            <form className='contact-form' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='name'>{t.form.fields.name.label} *</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder={t.form.fields.name.placeholder}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='email'>{t.form.fields.email.label} *</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder={t.form.fields.email.placeholder}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='phone'>{t.form.fields.phone.label}</label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t.form.fields.phone.placeholder}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='subject'>{t.form.fields.subject.label} *</label>
                <select
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                >
                  <option value=''>{t.form.fields.subject.placeholder}</option>
                  <option value={t.form.fields.subject.options.budget}>
                    {t.form.fields.subject.options.budget}
                  </option>
                  <option value={t.form.fields.subject.options.info}>
                    {t.form.fields.subject.options.info}
                  </option>
                  <option value={t.form.fields.subject.options.scheduling}>
                    {t.form.fields.subject.options.scheduling}
                  </option>
                  <option value={t.form.fields.subject.options.complaint}>
                    {t.form.fields.subject.options.complaint}
                  </option>
                  <option value={t.form.fields.subject.options.suggestion}>
                    {t.form.fields.subject.options.suggestion}
                  </option>
                  <option value={t.form.fields.subject.options.other}>
                    {t.form.fields.subject.options.other}
                  </option>
                </select>
              </div>

              <div className='form-group full-width'>
                <label htmlFor='message'>{t.form.fields.message.label} *</label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows='6'
                  placeholder={t.form.fields.message.placeholder}
                />
              </div>

              <button
                type='submit'
                className='submit-btn'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className='spinner'></div>
                    {t.form.submit.sending}
                  </>
                ) : (
                  t.form.submit.button
                )}
              </button>
            </form>
          </div>
        </div>

        <div className='emergency-contact'>
          <div className='emergency-content'>
            <h3>{t.emergency.title}</h3>
            <p>{t.emergency.subtitle}</p>
            <a href='tel:+351912164220' className='emergency-btn'>
              {t.emergency.button}
            </a>
          </div>
        </div>

        <div className='faq-section'>
          <h3>{t.faq.title}</h3>
          <div className='faq-grid'>
            {t.faq.items.map((item, index) => (
              <div key={index} className='faq-item'>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
