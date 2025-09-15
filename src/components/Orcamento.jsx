// src/components/Orcamento.jsx - CÓDIGO COMPLETO ATUALIZADO
import { useState } from 'react';
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

  const WHATSAPP_NUMBER = '351960172705'; // Número real da Street Paint

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
    let message = `NOVO PEDIDO DE ORÇAMENTO - STREET PAINT\n\n`;
    message += `Cliente: ${formData.firstName} ${formData.lastName}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Telefone: ${formData.phone}\n`;
    message += `Veículo: ${formData.carModel}\n`;

    if (formData.location) {
      message += `Localização: ${formData.location}\n`;
    }

    message += `\nDescrição dos Danos:\n${formData.damage}\n`;

    if (selectedFiles.length > 0) {
      message += `\nFotos selecionadas: ${selectedFiles.length} imagem(ns)\n`;
      message += `IMPORTANTE: Após enviar esta mensagem, por favor anexe as ${selectedFiles.length} foto(s) manualmente no chat do WhatsApp para completar o orçamento.\n`;
    }

    message += `\nData/Hora: ${new Date().toLocaleString('pt-PT')}\n`;
    message += `\nEnviado automaticamente pelo site Street Paint`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappURL, '_blank');

      // Mostrar instruções específicas sobre as fotos
      if (selectedFiles.length > 0) {
        alert(
          `Orçamento enviado com sucesso!\n\nATENÇÃO: Você selecionou ${selectedFiles.length} foto(s).\n\nO WhatsApp irá abrir com seus dados. Após enviar a mensagem de texto, por favor:\n\n1. Clique no ícone de anexo no WhatsApp\n2. Selecione "Fotos" ou "Galeria"\n3. Envie as ${selectedFiles.length} foto(s) dos danos\n\nIsso nos ajudará a dar um orçamento mais preciso!`
        );
      } else {
        alert(
          'Orçamento enviado! O WhatsApp irá abrir com sua mensagem pronta.\n\nDica: Se possível, envie também algumas fotos dos danos no chat para um orçamento mais preciso!'
        );
      }

      // Reset form
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
          <h2>Obtenha o Seu Orçamento Gratuito</h2>
          <p>
            Preencha o formulário abaixo e receba um orçamento personalizado da
            Street Paint em minutos
          </p>
        </div>

        <div className='orcamento-content'>
          <div className='info-section'>
            <h3>Por que escolher a Street Paint?</h3>

            <div className='benefits'>
              <div className='benefit'>
                <div className='benefit-icon'>🎯</div>
                <div>
                  <h4>Qualidade Garantida</h4>
                  <p>
                    Empresa local estabelecida com experiência comprovada em
                    Sintra
                  </p>
                </div>
              </div>

              <div className='benefit'>
                <div className='benefit-icon'>💰</div>
                <div>
                  <h4>Orçamentos Transparentes</h4>
                  <p>
                    Preços justos e competitivos, sem surpresas ou custos
                    ocultos
                  </p>
                </div>
              </div>

              <div className='benefit'>
                <div className='benefit-icon'>⚡</div>
                <div>
                  <h4>Prontidão no Atendimento</h4>
                  <p>Resposta rápida e prazos de entrega cumpridos</p>
                </div>
              </div>

              <div className='benefit'>
                <div className='benefit-icon'>🚗</div>
                <div>
                  <h4>Todas as Marcas</h4>
                  <p>Experiência em diversas marcas automóveis</p>
                </div>
              </div>
            </div>

            <div className='services-preview'>
              <h4>Nossos Serviços:</h4>
              <ul>
                <li>Martelinho de Ouro (PDR)</li>
                <li>Revitalização de Pintura</li>
                <li>Pintura de Interior</li>
                <li>Pintura de Jantes</li>
                <li>Polimento de Óticas</li>
                <li>Restauração de Volantes</li>
                <li>Limpeza de Estofos</li>
                <li>Pintura Completa</li>
              </ul>
            </div>

            <div className='contact-info'>
              <h4>Informações de Contacto:</h4>
              <p>
                <strong>📍 Localização:</strong> Avenida Pedro Álvares Cabral
                13, Sintra
              </p>
              <p>
                <strong>📞 Telefone:</strong> 960 172 705
              </p>
              <p>
                <strong>🕒 Horários:</strong> Seg-Sex: 09:00-18:00 | Sáb:
                09:00-13:00
              </p>
            </div>
          </div>

          <form className='orcamento-form' onSubmit={handleSubmit}>
            <div className='form-grid'>
              <div className='form-group'>
                <label htmlFor='firstName'>Nome *</label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder='Seu nome'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='lastName'>Apelido *</label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder='Seu apelido'
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
                <label htmlFor='phone'>Telefone *</label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  placeholder='+351 XXX XXX XXX'
                />
              </div>

              <div className='form-group'>
                <label htmlFor='carModel'>Marca/Modelo do Carro *</label>
                <input
                  type='text'
                  id='carModel'
                  name='carModel'
                  value={formData.carModel}
                  onChange={handleInputChange}
                  required
                  placeholder='Ex: BMW Serie 3, Mercedes Classe A'
                />
              </div>
            </div>

            <div className='form-group full-width'>
              <label htmlFor='damage'>Descrição dos Danos *</label>
              <textarea
                id='damage'
                name='damage'
                value={formData.damage}
                onChange={handleInputChange}
                required
                rows='4'
                placeholder='Descreva detalhadamente os danos no seu veículo: localização, tamanho, tipo de dano (risco, amolgadela, etc.)...'
              />
            </div>

            <div className='file-upload'>
              <label htmlFor='photos'>Fotos dos Danos (Opcional)</label>
              <div className='upload-info'>
                <p>Selecione fotos para enviar posteriormente no WhatsApp</p>
                <small>
                  As fotos nos ajudam a dar um orçamento mais preciso
                </small>
              </div>
              <div className='upload-area'>
                <div className='upload-content'>
                  <div className='upload-icon'>📷</div>
                  <p>Arraste fotos aqui ou clique para selecionar</p>
                  <small>Máximo 10MB por foto • JPG, PNG</small>
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
                  <h4>Fotos selecionadas ({selectedFiles.length}):</h4>
                  <p className='preview-note'>
                    Estas fotos serão enviadas manualmente no WhatsApp após o
                    formulário
                  </p>
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
                <h4>Como funciona:</h4>
                <ol>
                  <li>Preencha o formulário com seus dados</li>
                  <li>Clique em "Obter Orçamento Gratuito"</li>
                  <li>O WhatsApp abrirá com sua mensagem pronta</li>
                  <li>Se selecionou fotos, anexe-as manualmente no chat</li>
                  <li>Receba seu orçamento personalizado rapidamente</li>
                </ol>
              </div>
            </div>

            <button type='submit' className='submit-btn' disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className='spinner'></div>Preparando...
                </>
              ) : (
                'Obter Orçamento Gratuito via WhatsApp'
              )}
            </button>

            <p className='form-disclaimer'>
              * Campos obrigatórios | Seus dados são tratados com
              confidencialidade
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Orcamento;
