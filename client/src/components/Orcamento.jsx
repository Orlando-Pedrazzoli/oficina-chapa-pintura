// src/components/Orcamento.jsx - VERSÃO COM DADOS DO MONGODB
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSiteContent } from '../hooks/useSiteContent';
import { orcamentoTranslations } from '../translations/orcamento';
import './Orcamento.css';

const Orcamento = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    carModel: '',
    location: '',
    damage: '',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();

  // Buscar contactos do MongoDB
  const { content: dbContacts } = useSiteContent('contact');

  // Obter traduções do idioma atual
  const t = orcamentoTranslations[language];

  // Helper para obter valor do MongoDB ou fallback
  const getContact = (key, fallback) => {
    if (dbContacts && dbContacts[`contact_${key}`]) {
      const value = dbContacts[`contact_${key}`];
      if (typeof value === 'object' && value[language]) return value[language];
      if (typeof value === 'object' && value.pt) return value.pt;
      if (typeof value === 'string') return value;
    }
    return fallback;
  };

  // Dados de contacto do MongoDB
  const contactData = {
    phone: getContact('phone', '+351 960 172 705'),
    whatsapp: getContact('whatsapp', '351960172705'),
    address: getContact('address', 'Sintra, Portugal'),
    schedule: getContact('schedule', 'Seg-Sex: 9h-18h'),
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = index => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatPhoneNumber = value => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.startsWith('351')) {
      const phoneNumber = numbers.substring(3);
      if (phoneNumber.length >= 9) {
        const formatted = phoneNumber
          .substring(0, 9)
          .replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
        return `+351 ${formatted}`;
      }
    }
    return numbers;
  };

  const handlePhoneChange = e => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      phone: formatted,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    // Preparar mensagem para WhatsApp
    let message =
      language === 'pt'
        ? `NOVO PEDIDO DE ORÇAMENTO - STREET PAINT\n\n`
        : `NEW QUOTE REQUEST - STREET PAINT\n\n`;

    message +=
      language === 'pt'
        ? `Cliente: ${formData.firstName} ${formData.lastName}\n`
        : `Client: ${formData.firstName} ${formData.lastName}\n`;

    message += `Email: ${formData.email}\n`;
    message +=
      language === 'pt'
        ? `Telefone: ${formData.phone}\n`
        : `Phone: ${formData.phone}\n`;

    message +=
      language === 'pt'
        ? `Veículo: ${formData.carModel}\n`
        : `Vehicle: ${formData.carModel}\n`;

    if (formData.location) {
      message +=
        language === 'pt'
          ? `Localização: ${formData.location}\n`
          : `Location: ${formData.location}\n`;
    }

    message +=
      language === 'pt'
        ? `\nDescrição dos Danos:\n${formData.damage}\n`
        : `\nDamage Description:\n${formData.damage}\n`;

    if (selectedFiles.length > 0) {
      message +=
        language === 'pt'
          ? `\nFotos selecionadas: ${selectedFiles.length} imagem(ns)\n`
          : `\nSelected photos: ${selectedFiles.length} image(s)\n`;

      message +=
        language === 'pt'
          ? `IMPORTANTE: Após enviar esta mensagem, por favor anexe as ${selectedFiles.length} foto(s) manualmente no chat do WhatsApp para completar o orçamento.\n`
          : `IMPORTANT: After sending this message, please attach the ${selectedFiles.length} photo(s) manually in the WhatsApp chat to complete the quote.\n`;
    }

    message += `\n${
      language === 'pt' ? 'Data/Hora:' : 'Date/Time:'
    } ${new Date().toLocaleString(language === 'pt' ? 'pt-PT' : 'en-US')}\n`;

    message +=
      language === 'pt'
        ? `\nEnviado automaticamente pelo site Street Paint`
        : `\nAutomatically sent by Street Paint website`;

    const encodedMessage = encodeURIComponent(message);
    // USA WHATSAPP DO MONGODB
    const whatsappURL = `https://wa.me/${contactData.whatsapp}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappURL, '_blank');

      if (selectedFiles.length > 0) {
        alert(t.alerts.successWithPhotos(selectedFiles.length));
      } else {
        alert(t.alerts.successNoPhotos);
      }

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        carModel: '',
        location: '',
        damage: '',
      });
      setSelectedFiles([]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section id='estimate-section' className='orcamento'>
      <div className='container'>
        <div className='orcamento-header'>
          <h2>{t.header.title}</h2>
          <p>{t.header.subtitle}</p>
        </div>

        <div className='orcamento-content'>
          <div className='info-section'>
            <h3>{t.benefits.title}</h3>

            <div className='benefits'>
              {t.benefits.items.map((benefit, index) => (
                <div key={index} className='benefit'>
                  <div className='benefit-icon'>
                    {['🎯', '💰', '⚡', '🚗'][index]}
                  </div>
                  <div>
                    <h4>{benefit.title}</h4>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className='services-preview'>
              <h4>{t.services.title}</h4>
              <ul>
                {t.services.items.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>

            <div className='contact-info'>
              <h4>{t.contact.title}</h4>
              <p>
                <strong>📍 {t.contact.location}</strong> {contactData.address}
              </p>
              <p>
                <strong>📞 {t.contact.phone}</strong> {contactData.phone}
              </p>
              <p>
                <strong>🕒 {t.contact.hours}</strong> {contactData.schedule}
              </p>
            </div>
          </div>

          <form className='orcamento-form' onSubmit={handleSubmit}>
            <div className='form-grid'>
              <div className='form-group'>
                <label htmlFor='firstName'>
                  {t.form.fields.firstName.label} *
                </label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder={t.form.fields.firstName.placeholder}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='lastName'>
                  {t.form.fields.lastName.label} *
                </label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder={t.form.fields.lastName.placeholder}
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
                <label htmlFor='phone'>{t.form.fields.phone.label} *</label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  placeholder={t.form.fields.phone.placeholder}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='carModel'>
                  {t.form.fields.carModel.label} *
                </label>
                <input
                  type='text'
                  id='carModel'
                  name='carModel'
                  value={formData.carModel}
                  onChange={handleInputChange}
                  required
                  placeholder={t.form.fields.carModel.placeholder}
                />
              </div>
            </div>

            <div className='form-group full-width'>
              <label htmlFor='damage'>{t.form.fields.damage.label} *</label>
              <textarea
                id='damage'
                name='damage'
                value={formData.damage}
                onChange={handleInputChange}
                required
                rows='4'
                placeholder={t.form.fields.damage.placeholder}
              />
            </div>

            <div className='file-upload'>
              <label htmlFor='photos'>{t.form.photos.title}</label>
              <div className='upload-info'>
                <p>{t.form.photos.info}</p>
                <small>{t.form.photos.help}</small>
              </div>
              <div className='upload-area'>
                <div className='upload-content'>
                  <div className='upload-icon'>📷</div>
                  <p>{t.form.photos.dragText}</p>
                  <small>{t.form.photos.formats}</small>
                </div>
                <input
                  type='file'
                  id='photos'
                  accept='image/*'
                  multiple
                  onChange={handleFileChange}
                />
              </div>

              {selectedFiles.length > 0 && (
                <div className='file-preview'>
                  <h4>
                    {t.form.photos.selected} ({selectedFiles.length}):
                  </h4>
                  <p className='preview-note'>{t.form.photos.note}</p>
                  <div className='files-grid'>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className='file-item'>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                        />
                        <button
                          type='button'
                          className='remove-file'
                          onClick={() => removeFile(index)}
                          title='Remover foto'
                        >
                          ×
                        </button>
                        <span className='file-name'>{file.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className='whatsapp-info'>
              <div className='whatsapp-icon'>📱</div>
              <div>
                <h4>{t.form.whatsappInfo.title}</h4>
                <ol>
                  {t.form.whatsappInfo.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <button type='submit' className='submit-btn' disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className='spinner'></div>
                  {t.form.submit.preparing}
                </>
              ) : (
                t.form.submit.button
              )}
            </button>

            <p className='form-disclaimer'>{t.form.disclaimer}</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Orcamento;