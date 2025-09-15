import React, { useState } from 'react';
import './Location.css';

const Location = () => {
  const [activeTab, setActiveTab] = useState('info');

  // Informações da oficina
  const officineInfo = {
    name: 'Oficina Street Paint',
    fullName: 'Street Paint Bate Chapa Pintura e Recondicionamento de Viaturas',
    address: 'Av. Pedro Álvares Cabral Armazém B13',
    city: 'Sintra',
    postalCode: '2710-263',
    country: 'Portugal',
    phone: '+351 960 172 705',
    coordinates: {
      lat: 38.7989,
      lng: -9.3856,
    },
  };

  const businessHours = [
    { day: 'Segunda-feira', hours: '09:00 - 18:00', isOpen: true },
    { day: 'Terça-feira', hours: '09:00 - 18:00', isOpen: true },
    { day: 'Quarta-feira', hours: '09:00 - 18:00', isOpen: true },
    { day: 'Quinta-feira', hours: '09:00 - 18:00', isOpen: true },
    { day: 'Sexta-feira', hours: '09:00 - 18:00', isOpen: true },
    { day: 'Sábado', hours: '09:00 - 13:00', isOpen: true },
    { day: 'Domingo', hours: 'Fechado', isOpen: false },
  ];

  const features = [
    {
      icon: '🚗',
      title: 'Estacionamento Gratuito',
      description: 'Amplo espaço para deixar seu veículo',
    },
    {
      icon: '🔧',
      title: 'Equipamentos Modernos',
      description: 'Tecnologia de ponta para melhor resultado',
    },
    {
      icon: '👥',
      title: 'Equipa Especializada',
      description: 'Profissionais com anos de experiência',
    },
    {
      icon: '📱',
      title: 'Fácil Acesso',
      description: 'Localização conveniente em Sintra',
    },
  ];

  // URLs para navegação
  const getGoogleMapsUrl = () => {
    const address = encodeURIComponent(
      `${officineInfo.address}, ${officineInfo.postalCode} ${officineInfo.city}, ${officineInfo.country}`
    );
    return `https://www.google.com/maps/search/?api=1&query=${address}`;
  };

  const getWazeUrl = () => {
    return `https://waze.com/ul?ll=${officineInfo.coordinates.lat},${officineInfo.coordinates.lng}&navigate=yes`;
  };

  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${officineInfo.coordinates.lat},${officineInfo.coordinates.lng}`;
  };

  // Função para determinar se está aberto agora
  const isCurrentlyOpen = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Domingo, 1 = Segunda, etc.
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    // Ajustar para o formato português (Segunda = 0)
    const dayIndex = currentDay === 0 ? 6 : currentDay - 1;
    const todayHours = businessHours[dayIndex];

    if (!todayHours.isOpen) return false;

    if (dayIndex === 5) {
      // Sábado
      return currentTime >= 540 && currentTime < 780; // 09:00 - 13:00
    } else if (dayIndex < 5) {
      // Segunda a Sexta
      return currentTime >= 540 && currentTime < 1080; // 09:00 - 18:00
    }

    return false;
  };

  return (
    <section className='location-section'>
      <div className='container'>
        <div className='location-header'>
          <h2>Encontre-nos</h2>
          <p>
            Visite a nossa oficina em Sintra para um atendimento personalizado
          </p>
        </div>

        <div className='location-content'>
          {/* Mapa e Informações */}
          <div className='location-main'>
            {/* Mapa Embed */}
            <div className='map-container'>
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3111.1234567890123!2d-9.3856!3d38.7989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ3JzU2LjAiTiA5wrAyMycwOC4wIlc!5e0!3m2!1spt!2spt!4v1620000000000!5m2!1spt!2spt`}
                width='100%'
                height='400'
                style={{ border: 0 }}
                allowFullScreen=''
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='Localização Street Paint'
              ></iframe>
            </div>

            {/* Navegação */}
            <div className='navigation-buttons'>
              <a
                href={getDirectionsUrl()}
                target='_blank'
                rel='noopener noreferrer'
                className='nav-btn google-maps'
              >
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
                    fill='currentColor'
                  />
                </svg>
                <span>Google Maps</span>
              </a>

              <a
                href={getWazeUrl()}
                target='_blank'
                rel='noopener noreferrer'
                className='nav-btn waze'
              >
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'
                    fill='currentColor'
                  />
                  <path
                    d='M12 6c-3.31 0-6 2.69-6 6 0 1.66.67 3.16 1.76 4.24l1.42-1.42C8.47 14.11 8 13.11 8 12c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.11-.47 2.11-1.18 2.82l1.42 1.42C17.33 15.16 18 13.66 18 12c0-3.31-2.69-6-6-6z'
                    fill='currentColor'
                  />
                </svg>
                <span>Waze</span>
              </a>

              <a href={`tel:${officineInfo.phone}`} className='nav-btn phone'>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02L6.62 10.79z'
                    fill='currentColor'
                  />
                </svg>
                <span>Ligar</span>
              </a>
            </div>
          </div>

          {/* Informações Detalhadas */}
          <div className='location-sidebar'>
            {/* Tabs */}
            <div className='tabs'>
              <button
                className={`tab ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => setActiveTab('info')}
              >
                Informações
              </button>
              <button
                className={`tab ${activeTab === 'hours' ? 'active' : ''}`}
                onClick={() => setActiveTab('hours')}
              >
                Horários
              </button>
              <button
                className={`tab ${activeTab === 'features' ? 'active' : ''}`}
                onClick={() => setActiveTab('features')}
              >
                Facilidades
              </button>
            </div>

            {/* Tab Content */}
            <div className='tab-content'>
              {activeTab === 'info' && (
                <div className='info-content'>
                  <div className='status-badge'>
                    <span
                      className={`status ${
                        isCurrentlyOpen() ? 'open' : 'closed'
                      }`}
                    >
                      {isCurrentlyOpen() ? 'Aberto Agora' : 'Fechado'}
                    </span>
                  </div>

                  <h3>{officineInfo.name}</h3>
                  <p className='full-name'>{officineInfo.fullName}</p>

                  <div className='contact-info'>
                    <div className='info-item'>
                      <svg
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
                          fill='#DC2626'
                        />
                      </svg>
                      <div>
                        <strong>Morada:</strong>
                        <p>{officineInfo.address}</p>
                        <p>
                          {officineInfo.postalCode} {officineInfo.city}
                        </p>
                        <p>{officineInfo.country}</p>
                      </div>
                    </div>

                    <div className='info-item'>
                      <svg
                        width='18'
                        height='18'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <path
                          d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02L6.62 10.79z'
                          fill='#DC2626'
                        />
                      </svg>
                      <div>
                        <strong>Telefone:</strong>
                        <p>{officineInfo.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hours' && (
                <div className='hours-content'>
                  <h4>Horários de Funcionamento</h4>
                  <div className='hours-list'>
                    {businessHours.map((day, index) => (
                      <div
                        key={index}
                        className={`hours-item ${!day.isOpen ? 'closed' : ''}`}
                      >
                        <span className='day'>{day.day}</span>
                        <span className='time'>{day.hours}</span>
                      </div>
                    ))}
                  </div>
                  <p className='hours-note'>
                    Temos flexibilidade para casos urgentes. Contacte-nos!
                  </p>
                </div>
              )}

              {activeTab === 'features' && (
                <div className='features-content'>
                  <h4>Facilidades</h4>
                  <div className='features-list'>
                    {features.map((feature, index) => (
                      <div key={index} className='feature-item'>
                        <span className='feature-icon'>{feature.icon}</span>
                        <div>
                          <h5>{feature.title}</h5>
                          <p>{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
