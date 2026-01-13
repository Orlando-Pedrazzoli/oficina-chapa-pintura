import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import PartPrice from '../models/PartPrice.js';
import Service from '../models/Service.js';
import SiteContent from '../models/SiteContent.js';

dotenv.config();

const partPricesData = [
  {
    partId: 'para-choque-dianteiro',
    name: { pt: 'Pára-choques Dianteiro', en: 'Front Bumper' },
    prices: { paint: 180, paintAndDent: 380 }
  },
  {
    partId: 'para-choque-traseiro',
    name: { pt: 'Pára-choques Traseiro', en: 'Rear Bumper' },
    prices: { paint: 180, paintAndDent: 380 }
  },
  {
    partId: 'capo',
    name: { pt: 'Capô', en: 'Hood' },
    prices: { paint: 250, paintAndDent: 450 }
  },
  {
    partId: 'porta-dianteira-esquerda',
    name: { pt: 'Porta Dianteira (Esq.)', en: 'Front Door (Left)' },
    prices: { paint: 200, paintAndDent: 400 }
  },
  {
    partId: 'porta-dianteira-direita',
    name: { pt: 'Porta Dianteira (Dir.)', en: 'Front Door (Right)' },
    prices: { paint: 200, paintAndDent: 400 }
  },
  {
    partId: 'porta-traseira-esquerda',
    name: { pt: 'Porta Traseira (Esq.)', en: 'Rear Door (Left)' },
    prices: { paint: 200, paintAndDent: 400 }
  },
  {
    partId: 'porta-traseira-direita',
    name: { pt: 'Porta Traseira (Dir.)', en: 'Rear Door (Right)' },
    prices: { paint: 200, paintAndDent: 400 }
  },
  {
    partId: 'guarda-lamas-dianteiro-esquerdo',
    name: { pt: 'Guarda-lamas Dianteiro (Esq.)', en: 'Front Fender (Left)' },
    prices: { paint: 150, paintAndDent: 300 }
  },
  {
    partId: 'guarda-lamas-dianteiro-direito',
    name: { pt: 'Guarda-lamas Dianteiro (Dir.)', en: 'Front Fender (Right)' },
    prices: { paint: 150, paintAndDent: 300 }
  },
  {
    partId: 'ilharga-esquerda',
    name: { pt: 'Ilharga (Esq.)', en: 'Quarter Panel (Left)' },
    prices: { paint: 150, paintAndDent: 300 }
  },
  {
    partId: 'ilharga-direita',
    name: { pt: 'Ilharga (Dir.)', en: 'Quarter Panel (Right)' },
    prices: { paint: 150, paintAndDent: 300 }
  },
  {
    partId: 'mala',
    name: { pt: 'Tampa da Bagageira', en: 'Trunk Lid' },
    prices: { paint: 220, paintAndDent: 420 }
  },
  {
    partId: 'tejadilho',
    name: { pt: 'Tejadilho', en: 'Roof' },
    prices: { paint: 300, paintAndDent: 500 }
  },
  {
    partId: 'retrovisor-esquerdo',
    name: { pt: 'Retrovisor Esquerdo', en: 'Left Mirror' },
    prices: { paint: 80, paintAndDent: 150 }
  },
  {
    partId: 'retrovisor-direito',
    name: { pt: 'Retrovisor Direito', en: 'Right Mirror' },
    prices: { paint: 80, paintAndDent: 150 }
  },
  {
    partId: 'embaladeira-esquerda',
    name: { pt: 'Embaladeira (Esq.)', en: 'Rocker Panel (Left)' },
    prices: { paint: 120, paintAndDent: 250 }
  },
  {
    partId: 'embaladeira-direita',
    name: { pt: 'Embaladeira (Dir.)', en: 'Rocker Panel (Right)' },
    prices: { paint: 120, paintAndDent: 250 }
  },
  {
    partId: 'aileron',
    name: { pt: 'Aileron', en: 'Spoiler' },
    prices: { paint: 100, paintAndDent: 200 }
  }
];

const servicesData = [
  {
    icon: '/chapa.png',
    title: {
      pt: 'Bate Chapa',
      en: 'Auto Body'
    },
    description: {
      pt: 'Reparação especializada de chapa e estrutura da viatura com técnicas profissionais de endireitamento.',
      en: 'Specialized repair of body and vehicle structure with professional straightening techniques.'
    },
    details: {
      pt: [
        'Reparação de estruturas danificadas',
        'Soldadura de chapas metálicas',
        'Correção de deformações',
        'Substituição de painéis',
        'Reparação de sinistros'
      ],
      en: [
        'Damaged structure repair',
        'Metal sheet welding',
        'Deformation correction',
        'Panel replacement',
        'Accident repair'
      ]
    },
    order: 0,
    active: true
  },
  {
    icon: '/martelinho.jpg',
    title: {
      pt: 'Martelinho de Ouro',
      en: 'Paintless Dent Repair'
    },
    description: {
      pt: 'Técnica especializada para reparação de amolgadelas sem danificar a pintura original.',
      en: 'Specialized technique for repairing dents without damaging the original paint.'
    },
    details: {
      pt: [
        'Reparação sem pintura (PDR)',
        'Preserva pintura original',
        'Amolgadelas de granizo',
        'Danos de estacionamento',
        'Resultado invisível'
      ],
      en: [
        'Paintless repair (PDR)',
        'Preserves original paint',
        'Hail dents',
        'Parking damage',
        'Invisible results'
      ]
    },
    order: 1,
    active: true
  },
  {
    icon: '/pintura-de-carro.jpg',
    title: {
      pt: 'Pintura Completa',
      en: 'Complete Painting'
    },
    description: {
      pt: 'Pintura total do veículo com preparação completa e acabamentos de qualidade premium.',
      en: 'Full vehicle painting with complete preparation and premium quality finishes.'
    },
    details: {
      pt: [
        'Preparação total da carroçaria',
        'Primer de alta qualidade',
        'Pintura em cabine',
        'Verniz de proteção',
        'Garantia de qualidade'
      ],
      en: [
        'Complete body preparation',
        'High-quality primer',
        'Booth painting',
        'Protective varnish',
        'Quality guarantee'
      ]
    },
    order: 2,
    active: true
  }
];

const siteContentData = [
  {
    key: 'hero_title',
    section: 'homepage',
    content: {
      pt: 'Excelência em Reparação Automóvel',
      en: 'Excellence in Auto Repair'
    }
  },
  {
    key: 'hero_subtitle',
    section: 'homepage',
    content: {
      pt: 'Mais de 15 anos de experiência em pintura, chapa e estética automóvel em Sintra',
      en: 'Over 15 years of experience in painting, body work and automotive aesthetics in Sintra'
    }
  },
  {
    key: 'about_title',
    section: 'services',
    content: {
      pt: 'A Nossa História',
      en: 'Our History'
    }
  },
  {
    key: 'about_text',
    section: 'services',
    content: {
      pt: 'Temos vindo a servir a grande área de Lisboa há mais de 15 anos. Somos dedicados a proporcionar aos nossos clientes trabalho de qualidade a um preço justo.',
      en: 'We have been serving the greater Lisbon area for over 15 years. We are dedicated to providing our customers with quality work at a fair price.'
    }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    await User.deleteMany({});
    await PartPrice.deleteMany({});
    await Service.deleteMany({});
    await SiteContent.deleteMany({});
    console.log('🗑️  Dados antigos removidos');

    await User.create({
      username: 'admin',
      password: 'admin123'
    });
    console.log('👤 Usuário admin criado');

    await PartPrice.insertMany(partPricesData);
    console.log('💰 Preços das peças criados');

    await Service.insertMany(servicesData);
    console.log('🔧 Serviços criados');

    await SiteContent.insertMany(siteContentData);
    console.log('📝 Conteúdo do site criado');

    console.log('\n✅ Database populada com sucesso!');
    console.log('📝 Login: admin / admin123');
    console.log('🌐 Acesse: http://localhost:5173/admin/login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
};

seedDatabase();