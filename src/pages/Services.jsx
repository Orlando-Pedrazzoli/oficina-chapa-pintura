// src/pages/Services.jsx
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: '/chapa.png',
      title: 'Bate Chapa',
      description:
        'Reparação especializada de chapa e estrutura da viatura com técnicas profissionais de endireitamento.',
      details: [
        'Reparação de estruturas danificadas',
        'Soldadura de chapas metálicas',
        'Correção de deformações',
        'Substituição de painéis',
        'Reparação de sinistros',
      ],
    },
    {
      icon: '/martelinho.jpg',
      title: 'Martelinho de Ouro',
      description:
        'Técnica especializada para reparação de amolgadelas sem danificar a pintura original.',
      details: [
        'Reparação sem pintura (PDR)',
        'Preserva pintura original',
        'Amolgadelas de granizo',
        'Danos de estacionamento',
        'Resultado invisível',
      ],
    },
    {
      icon: '/revitalizacao-pintura.jpg',
      title: 'Revitalização de Pintura',
      description:
        'Devolva o brilho original à pintura do seu veículo com técnicas profissionais de revitalização.',
      details: [
        'Remoção de riscos superficiais',
        'Polimento profissional',
        'Correção de oxidação',
        'Proteção UV',
        'Acabamento espelhado',
      ],
    },
    {
      icon: '/pintura-interior.jpg',
      title: 'Pintura de Interior',
      description:
        'Renovação completa do interior do veículo com pintura especializada para plásticos e tecidos.',
      details: [
        'Painéis e consolas',
        'Molduras e acabamentos',
        'Pintura de plásticos',
        'Cores personalizadas',
        'Proteção anti-UV',
      ],
    },
    {
      icon: '/pintura-jante.jpg',
      title: 'Pintura de Jantes',
      description:
        'Restauração e pintura de jantes com acabamentos especiais e cores personalizadas.',
      details: [
        'Preparação completa',
        'Primer especializado',
        'Cores metalizadas',
        'Acabamento mate ou brilhante',
        'Proteção anti-corrosão',
      ],
    },
    {
      icon: '/polimento-otica.jpg',
      title: 'Polimento de Óticas',
      description:
        'Restauração da transparência dos faróis e farolins para melhor visibilidade e estética.',
      details: [
        'Remoção de amarelecimento',
        'Polimento profissional',
        'Proteção UV',
        'Melhora da iluminação',
        'Aspeto como novo',
      ],
    },
    {
      icon: '/restauracao-volante.jpg',
      title: 'Restauração de Volantes',
      description:
        'Renovação completa de volantes em pele, couro ou outros materiais com acabamento profissional.',
      details: [
        'Reparação de desgaste',
        'Retintura de pele/couro',
        'Restauração de costuras',
        'Acabamentos personalizados',
        'Proteção contra desgaste',
      ],
    },
    {
      icon: '/estofo.jpg',
      title: 'Limpeza de Estofos',
      description:
        'Limpeza profunda e tratamento de estofos em tecido, pele e outros materiais.',
      details: [
        'Limpeza a vapor',
        'Remoção de nódoas',
        'Tratamento anti-bacteriano',
        'Proteção de tecidos',
        'Desodorização profissional',
      ],
    },
    {
      icon: '/pintura-de-carro.jpg',
      title: 'Pintura Completa',
      description:
        'Pintura total do veículo com preparação completa e acabamentos de qualidade premium.',
      details: [
        'Preparação total da carroçaria',
        'Primer de alta qualidade',
        'Pintura em cabine',
        'Verniz de proteção',
        'Garantia de qualidade',
      ],
    },
  ];

  const additionalServices = [
    'Proteção Cerâmica',
    'Detailing Completo',
    'Reparação de Para-choques',
    'Aplicação de Películas',
    'Tratamento Anti-Corrosão',
    'Serviço ao Domicílio',
  ];

  return (
    <div className='services-page'>
      <div className='services-hero'>
        <div className='container'>
          <h1>Nossos Serviços</h1>
          <p>
            Soluções completas em reparação e estética automóvel com mais de 15
            anos de experiência
          </p>
        </div>
      </div>

      <div className='container'>
        <div className='services-grid'>
          {services.map((service, index) => (
            <div key={index} className='service-card'>
              <div className='service-icon'>
                {service.icon.startsWith('/') ? (
                  <img src={service.icon} alt={service.title} />
                ) : (
                  service.icon
                )}
              </div>
              <h3>{service.title}</h3>
              <p className='service-description'>{service.description}</p>
              <ul className='service-details'>
                {service.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='about-section'>
          <div className='about-content'>
            <div className='about-text'>
              <span className='section-label'>SOBRE NÓS</span>
              <h2>A Nossa História</h2>
              <p>
                Temos vindo a servir a grande área de Lisboa há mais de 15 anos.
                Somos dedicados a proporcionar aos nossos clientes trabalho de
                qualidade a um preço justo, utilizando alguns dos melhores
                materiais disponíveis.
              </p>
              <p>
                Começámos como uma pequena oficina familiar e crescemos
                lentamente para nos tornarmos numa referência em reparação
                automóvel. Especializamo-nos tanto em reparações estruturais
                como em serviços de estética automóvel.
              </p>
              <p>
                Trabalhamos em qualquer tipo de veículo, desde europeus,
                japoneses, coreanos e americanos. A nossa equipa também se
                especializa em restaurações de carros clássicos e serviços de
                detailing premium.
              </p>
              <p>
                Quer precise de uma reparação após acidente, queira renovar a
                estética do seu veículo ou restaurar aquele carro clássico, a
                Street Paint tem tudo coberto.
              </p>
            </div>

            <div className='about-image'>
              <img src='/julios.jpg' alt='Oficina de Reparação Automóvel' />
            </div>
          </div>
        </div>

        <div className='additional-services'>
          <h3>Serviços Adicionais</h3>
          <div className='services-list'>
            {additionalServices.map((service, index) => (
              <div key={index} className='service-item'>
                <span className='check-icon'>✓</span>
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='quality-guarantee'>
          <div className='guarantee-content'>
            <h3>Garantia de Qualidade</h3>
            <p>
              Todos os nossos trabalhos incluem garantia e utilizamos apenas
              materiais de primeira qualidade. A sua satisfação é a nossa
              prioridade.
            </p>
            <div className='guarantee-features'>
              <div className='feature'>
                <span className='feature-icon'>🛡️</span>
                <span>Garantia de 2 anos</span>
              </div>
              <div className='feature'>
                <span className='feature-icon'>⭐</span>
                <span>Materiais premium</span>
              </div>
              <div className='feature'>
                <span className='feature-icon'>🏆</span>
                <span>Técnicos certificados</span>
              </div>
            </div>
          </div>
        </div>

        <div className='cta-section'>
          <h3>Precisa de uma Reparação?</h3>
          <p>Contacte-nos hoje para um orçamento gratuito e sem compromisso.</p>
          <div className='cta-buttons'>
            <a href='#estimate-section' className='btn-primary'>
              Orçamento Gratuito
            </a>
            <a href='tel:+351960172705' className='btn-secondary'>
              📞 Ligar Agora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
