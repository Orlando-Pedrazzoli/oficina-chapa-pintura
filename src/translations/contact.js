// src/translations/contact.js
export const contactTranslations = {
  pt: {
    hero: {
      title: 'Contacte-nos',
      subtitle:
        'Estamos aqui para ajudar com todas as suas necessidades de reparação automóvel',
    },
    info: {
      title: 'Informações de Contacto',
      methods: {
        location: {
          title: 'Localização',
          value: 'Lisboa, Portugal',
          description: 'Servimos toda a região de Lisboa',
        },
        phone: {
          title: 'Telefone',
          value: '+351 960 172 705',
          description: 'Segunda a Sexta: 8h-18h',
        },
        email: {
          title: 'Email',
          value: 'info@chapapinturalisboa.pt',
          description: 'Resposta em 24h',
        },
        whatsapp: {
          title: 'WhatsApp',
          value: '+351 960 172 705',
          description: 'Resposta rápida',
        },
      },
    },
    workingHours: {
      title: 'Horário de Funcionamento',
      days: {
        monday: 'Segunda-feira',
        tuesday: 'Terça-feira',
        wednesday: 'Quarta-feira',
        thursday: 'Quinta-feira',
        friday: 'Sexta-feira',
        saturday: 'Sábado',
        sunday: 'Domingo',
      },
      times: {
        weekday: '08:00 - 18:00',
        saturday: '09:00 - 13:00',
        closed: 'Fechado',
      },
    },
    form: {
      title: 'Envie-nos uma Mensagem',
      subtitle:
        'Tem alguma dúvida? Entre em contacto connosco e responderemos o mais rapidamente possível.',
      fields: {
        name: {
          label: 'Nome Completo',
          placeholder: 'Seu nome completo',
        },
        email: {
          label: 'Email',
          placeholder: 'seu@email.com',
        },
        phone: {
          label: 'Telefone',
          placeholder: '+351 912164220',
        },
        subject: {
          label: 'Assunto',
          placeholder: 'Selecione o assunto',
          options: {
            budget: 'Pedido de Orçamento',
            info: 'Informações sobre Serviços',
            scheduling: 'Agendamento',
            complaint: 'Reclamação',
            suggestion: 'Sugestão',
            other: 'Outro',
          },
        },
        message: {
          label: 'Mensagem',
          placeholder: 'Escreva aqui a sua mensagem...',
        },
      },
      submit: {
        button: 'Enviar Mensagem',
        sending: 'A enviar...',
      },
      alert:
        'Mensagem preparada! O WhatsApp irá abrir para enviar o seu contacto.',
    },
    emergency: {
      title: '🚨 Contacto de Emergência',
      subtitle:
        'Para situações urgentes ou acidentes, contacte-nos imediatamente:',
      button: '📞 Ligar Agora: +351 912164220',
    },
    faq: {
      title: 'Perguntas Frequentes',
      items: [
        {
          question: 'Quanto tempo demora uma reparação?',
          answer:
            'Depende da extensão dos danos. Reparações simples podem demorar 1-2 dias, enquanto trabalhos mais complexos podem levar uma semana.',
        },
        {
          question: 'Trabalham com seguradoras?',
          answer:
            'Sim, trabalhamos com todas as principais companhias de seguro em Portugal.',
        },
        {
          question: 'Oferecem garantia?',
          answer:
            'Todos os nossos trabalhos incluem garantia de 2 anos para sua tranquilidade.',
        },
        {
          question: 'Fazem orçamentos gratuitos?',
          answer: 'Sim, todos os orçamentos são gratuitos e sem compromisso.',
        },
      ],
    },
  },
  en: {
    hero: {
      title: 'Contact Us',
      subtitle: "We're here to help with all your automotive repair needs",
    },
    info: {
      title: 'Contact Information',
      methods: {
        location: {
          title: 'Location',
          value: 'Lisbon, Portugal',
          description: 'We serve the entire Lisbon region',
        },
        phone: {
          title: 'Phone',
          value: '+351 960 172 705',
          description: 'Monday to Friday: 8am-6pm',
        },
        email: {
          title: 'Email',
          value: 'info@chapapinturalisboa.pt',
          description: 'Response within 24h',
        },
        whatsapp: {
          title: 'WhatsApp',
          value: '+351 960 172 705',
          description: 'Quick response',
        },
      },
    },
    workingHours: {
      title: 'Business Hours',
      days: {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
      },
      times: {
        weekday: '08:00 - 18:00',
        saturday: '09:00 - 13:00',
        closed: 'Closed',
      },
    },
    form: {
      title: 'Send Us a Message',
      subtitle:
        'Have a question? Contact us and we will respond as quickly as possible.',
      fields: {
        name: {
          label: 'Full Name',
          placeholder: 'Your full name',
        },
        email: {
          label: 'Email',
          placeholder: 'your@email.com',
        },
        phone: {
          label: 'Phone',
          placeholder: '+351 912164220',
        },
        subject: {
          label: 'Subject',
          placeholder: 'Select subject',
          options: {
            budget: 'Quote Request',
            info: 'Service Information',
            scheduling: 'Scheduling',
            complaint: 'Complaint',
            suggestion: 'Suggestion',
            other: 'Other',
          },
        },
        message: {
          label: 'Message',
          placeholder: 'Write your message here...',
        },
      },
      submit: {
        button: 'Send Message',
        sending: 'Sending...',
      },
      alert: 'Message prepared! WhatsApp will open to send your contact.',
    },
    emergency: {
      title: '🚨 Emergency Contact',
      subtitle: 'For urgent situations or accidents, contact us immediately:',
      button: '📞 Call Now: +351 912164220',
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'How long does a repair take?',
          answer:
            'It depends on the extent of the damage. Simple repairs can take 1-2 days, while more complex work may take a week.',
        },
        {
          question: 'Do you work with insurance companies?',
          answer:
            'Yes, we work with all major insurance companies in Portugal.',
        },
        {
          question: 'Do you offer a warranty?',
          answer:
            'All our work includes a 2-year warranty for your peace of mind.',
        },
        {
          question: 'Do you provide free quotes?',
          answer: 'Yes, all quotes are free and without obligation.',
        },
      ],
    },
  },
};
