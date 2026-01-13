// src/translations/orcamento.js
export const orcamentoTranslations = {
  pt: {
    header: {
      title: 'Obtenha o Seu Orçamento Gratuito',
      subtitle:
        'Preencha o formulário abaixo e receba um orçamento personalizado da Street Paint em minutos',
    },
    benefits: {
      title: 'Por que escolher a Street Paint?',
      items: [
        {
          title: 'Qualidade Garantida',
          description:
            'Empresa local estabelecida com experiência comprovada em Sintra',
        },
        {
          title: 'Orçamentos Transparentes',
          description:
            'Preços justos e competitivos, sem surpresas ou custos ocultos',
        },
        {
          title: 'Prontidão no Atendimento',
          description: 'Resposta rápida e prazos de entrega cumpridos',
        },
        {
          title: 'Todas as Marcas',
          description: 'Experiência em diversas marcas automóveis',
        },
      ],
    },
    services: {
      title: 'Nossos Serviços:',
      items: [
        'Martelinho de Ouro (PDR)',
        'Revitalização de Pintura',
        'Pintura de Interior',
        'Pintura de Jantes',
        'Polimento de Óticas',
        'Restauração de Volantes',
        'Limpeza de Estofos',
        'Pintura Completa',
      ],
    },
    contact: {
      title: 'Informações de Contacto:',
      location: 'Localização:',
      locationValue: 'Avenida Pedro Álvares Cabral 13, Sintra',
      phone: 'Telefone:',
      phoneValue: '960 172 705',
      hours: 'Horários:',
      hoursValue: 'Seg-Sex: 09:00-18:00 | Sáb: 09:00-13:00',
    },
    form: {
      fields: {
        firstName: {
          label: 'Nome',
          placeholder: 'Seu nome',
        },
        lastName: {
          label: 'Apelido',
          placeholder: 'Seu apelido',
        },
        email: {
          label: 'Email',
          placeholder: 'seu@email.com',
        },
        phone: {
          label: 'Telefone',
          placeholder: '+351 XXX XXX XXX',
        },
        carModel: {
          label: 'Marca/Modelo do Carro',
          placeholder: 'Ex: BMW Serie 3, Mercedes Classe A',
        },
        damage: {
          label: 'Descrição dos Danos',
          placeholder:
            'Descreva detalhadamente os danos no seu veículo: localização, tamanho, tipo de dano (risco, amolgadela, etc.)...',
        },
      },
      photos: {
        title: 'Fotos dos Danos (Opcional)',
        info: 'Selecione fotos para enviar posteriormente no WhatsApp',
        help: 'As fotos nos ajudam a dar um orçamento mais preciso',
        dragText: 'Arraste fotos aqui ou clique para selecionar',
        formats: 'Máximo 10MB por foto • JPG, PNG',
        selected: 'Fotos selecionadas',
        note: 'Estas fotos serão enviadas manualmente no WhatsApp após o formulário',
      },
      whatsappInfo: {
        title: 'Como funciona:',
        steps: [
          'Preencha o formulário com seus dados',
          'Clique em "Obter Orçamento Gratuito"',
          'O WhatsApp abrirá com sua mensagem pronta',
          'Se selecionou fotos, anexe-as manualmente no chat',
          'Receba seu orçamento personalizado rapidamente',
        ],
      },
      submit: {
        button: 'Obter Orçamento Gratuito via WhatsApp',
        preparing: 'Preparando...',
      },
      disclaimer:
        '* Campos obrigatórios | Seus dados são tratados com confidencialidade',
    },
    alerts: {
      successWithPhotos: count =>
        `Orçamento enviado com sucesso!\n\nATENÇÃO: Você selecionou ${count} foto(s).\n\nO WhatsApp irá abrir com seus dados. Após enviar a mensagem de texto, por favor:\n\n1. Clique no ícone de anexo no WhatsApp\n2. Selecione "Fotos" ou "Galeria"\n3. Envie as ${count} foto(s) dos danos\n\nIsso nos ajudará a dar um orçamento mais preciso!`,
      successNoPhotos:
        'Orçamento enviado! O WhatsApp irá abrir com sua mensagem pronta.\n\nDica: Se possível, envie também algumas fotos dos danos no chat para um orçamento mais preciso!',
    },
  },
  en: {
    header: {
      title: 'Get Your Free Quote',
      subtitle:
        'Fill out the form below and receive a personalized quote from Street Paint in minutes',
    },
    benefits: {
      title: 'Why choose Street Paint?',
      items: [
        {
          title: 'Quality Guaranteed',
          description:
            'Established local company with proven experience in Sintra',
        },
        {
          title: 'Transparent Quotes',
          description:
            'Fair and competitive prices, no surprises or hidden costs',
        },
        {
          title: 'Prompt Service',
          description: 'Quick response and delivery deadlines met',
        },
        {
          title: 'All Brands',
          description: 'Experience in various car brands',
        },
      ],
    },
    services: {
      title: 'Our Services:',
      items: [
        'Paintless Dent Repair (PDR)',
        'Paint Restoration',
        'Interior Painting',
        'Rim Painting',
        'Headlight Polishing',
        'Steering Wheel Restoration',
        'Upholstery Cleaning',
        'Complete Painting',
      ],
    },
    contact: {
      title: 'Contact Information:',
      location: 'Location:',
      locationValue: 'Avenida Pedro Álvares Cabral 13, Sintra',
      phone: 'Phone:',
      phoneValue: '960 172 705',
      hours: 'Hours:',
      hoursValue: 'Mon-Fri: 09:00-18:00 | Sat: 09:00-13:00',
    },
    form: {
      fields: {
        firstName: {
          label: 'First Name',
          placeholder: 'Your first name',
        },
        lastName: {
          label: 'Last Name',
          placeholder: 'Your last name',
        },
        email: {
          label: 'Email',
          placeholder: 'your@email.com',
        },
        phone: {
          label: 'Phone',
          placeholder: '+351 XXX XXX XXX',
        },
        carModel: {
          label: 'Car Make/Model',
          placeholder: 'Ex: BMW 3 Series, Mercedes A Class',
        },
        damage: {
          label: 'Damage Description',
          placeholder:
            'Describe in detail the damage to your vehicle: location, size, type of damage (scratch, dent, etc.)...',
        },
      },
      photos: {
        title: 'Damage Photos (Optional)',
        info: 'Select photos to send later on WhatsApp',
        help: 'Photos help us give a more accurate quote',
        dragText: 'Drag photos here or click to select',
        formats: 'Maximum 10MB per photo • JPG, PNG',
        selected: 'Selected photos',
        note: 'These photos will be sent manually on WhatsApp after the form',
      },
      whatsappInfo: {
        title: 'How it works:',
        steps: [
          'Fill out the form with your information',
          'Click "Get Free Quote"',
          'WhatsApp will open with your message ready',
          'If you selected photos, attach them manually in the chat',
          'Receive your personalized quote quickly',
        ],
      },
      submit: {
        button: 'Get Free Quote via WhatsApp',
        preparing: 'Preparing...',
      },
      disclaimer: '* Required fields | Your data is treated confidentially',
    },
    alerts: {
      successWithPhotos: count =>
        `Quote sent successfully!\n\nATTENTION: You selected ${count} photo(s).\n\nWhatsApp will open with your data. After sending the text message, please:\n\n1. Click the attachment icon on WhatsApp\n2. Select "Photos" or "Gallery"\n3. Send the ${count} damage photo(s)\n\nThis will help us give a more accurate quote!`,
      successNoPhotos:
        'Quote sent! WhatsApp will open with your message ready.\n\nTip: If possible, also send some damage photos in the chat for a more accurate quote!',
    },
  },
};
