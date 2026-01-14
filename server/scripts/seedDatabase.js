// server/scripts/seedDatabase.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PartPrice from '../models/PartPrice.js';
import Service from '../models/Service.js';
import SiteContent from '../models/SiteContent.js';
import User from '../models/User.js';

dotenv.config();

// Dados das peças com preços (18 peças)
const partPrices = [
  // Frente
  { partId: 'hood', namePT: 'Capô', nameEN: 'Hood', paintPrice: 180, paintDentPrice: 280, position: 'front' },
  { partId: 'front-bumper', namePT: 'Para-choques Frontal', nameEN: 'Front Bumper', paintPrice: 200, paintDentPrice: 300, position: 'front' },
  { partId: 'front-fender-left', namePT: 'Para-lamas Frontal Esquerdo', nameEN: 'Front Left Fender', paintPrice: 150, paintDentPrice: 250, position: 'front' },
  { partId: 'front-fender-right', namePT: 'Para-lamas Frontal Direito', nameEN: 'Front Right Fender', paintPrice: 150, paintDentPrice: 250, position: 'front' },
  
  // Laterais
  { partId: 'front-door-left', namePT: 'Porta Frontal Esquerda', nameEN: 'Front Left Door', paintPrice: 180, paintDentPrice: 280, position: 'left' },
  { partId: 'front-door-right', namePT: 'Porta Frontal Direita', nameEN: 'Front Right Door', paintPrice: 180, paintDentPrice: 280, position: 'right' },
  { partId: 'rear-door-left', namePT: 'Porta Traseira Esquerda', nameEN: 'Rear Left Door', paintPrice: 180, paintDentPrice: 280, position: 'left' },
  { partId: 'rear-door-right', namePT: 'Porta Traseira Direita', nameEN: 'Rear Right Door', paintPrice: 180, paintDentPrice: 280, position: 'right' },
  { partId: 'side-skirt-left', namePT: 'Saia Lateral Esquerda', nameEN: 'Left Side Skirt', paintPrice: 120, paintDentPrice: 200, position: 'left' },
  { partId: 'side-skirt-right', namePT: 'Saia Lateral Direita', nameEN: 'Right Side Skirt', paintPrice: 120, paintDentPrice: 200, position: 'right' },
  
  // Traseira
  { partId: 'trunk', namePT: 'Mala/Porta-bagagens', nameEN: 'Trunk', paintPrice: 200, paintDentPrice: 300, position: 'back' },
  { partId: 'rear-bumper', namePT: 'Para-choques Traseiro', nameEN: 'Rear Bumper', paintPrice: 200, paintDentPrice: 300, position: 'back' },
  { partId: 'rear-fender-left', namePT: 'Para-lamas Traseiro Esquerdo', nameEN: 'Rear Left Fender', paintPrice: 180, paintDentPrice: 280, position: 'back' },
  { partId: 'rear-fender-right', namePT: 'Para-lamas Traseiro Direito', nameEN: 'Rear Right Fender', paintPrice: 180, paintDentPrice: 280, position: 'back' },
  
  // Topo
  { partId: 'roof', namePT: 'Tejadilho', nameEN: 'Roof', paintPrice: 300, paintDentPrice: 450, position: 'top' },
  
  // Espelhos
  { partId: 'mirror-left', namePT: 'Espelho Esquerdo', nameEN: 'Left Mirror', paintPrice: 50, paintDentPrice: 80, position: 'left' },
  { partId: 'mirror-right', namePT: 'Espelho Direito', nameEN: 'Right Mirror', paintPrice: 50, paintDentPrice: 80, position: 'right' },
  
  // Completo
  { partId: 'full-car', namePT: 'Carro Completo', nameEN: 'Full Car', paintPrice: 2500, paintDentPrice: 3500, position: 'full' },
];

// Dados dos 9 serviços
const services = [
  {
    order: 0,
    icon: '/chapa.png',
    title: { pt: 'Bate Chapa', en: 'Auto Body' },
    description: {
      pt: 'Reparação profissional de carroçaria com técnicas avançadas para restaurar a estrutura original do seu veículo.',
      en: 'Professional body repair with advanced techniques to restore your vehicle\'s original structure.'
    },
    details: {
      pt: ['Reparação de amolgadelas', 'Substituição de painéis', 'Alinhamento de carroçaria', 'Soldadura especializada'],
      en: ['Dent repair', 'Panel replacement', 'Body alignment', 'Specialized welding']
    },
    isActive: true
  },
  {
    order: 1,
    icon: '/martelinho.jpg',
    title: { pt: 'Martelinho de Ouro', en: 'Paintless Dent Repair' },
    description: {
      pt: 'Técnica especializada para remover amolgadelas sem danificar a pintura original do veículo.',
      en: 'Specialized technique to remove dents without damaging the vehicle\'s original paint.'
    },
    details: {
      pt: ['Preserva pintura original', 'Processo rápido', 'Custo reduzido', 'Resultado invisível'],
      en: ['Preserves original paint', 'Quick process', 'Reduced cost', 'Invisible result']
    },
    isActive: true
  },
  {
    order: 2,
    icon: '/revitalizacao-pintura.jpg',
    title: { pt: 'Revitalização de Pintura', en: 'Paint Restoration' },
    description: {
      pt: 'Restauramos o brilho original da pintura do seu carro com polimento profissional e tratamentos especializados.',
      en: 'We restore the original shine of your car\'s paint with professional polishing and specialized treatments.'
    },
    details: {
      pt: ['Polimento técnico', 'Correção de riscos', 'Proteção cerâmica', 'Brilho duradouro'],
      en: ['Technical polishing', 'Scratch correction', 'Ceramic protection', 'Long-lasting shine']
    },
    isActive: true
  },
  {
    order: 3,
    icon: '/pintura-interior.jpg',
    title: { pt: 'Pintura de Interior', en: 'Interior Painting' },
    description: {
      pt: 'Renovação completa das peças interiores do veículo com acabamento de fábrica.',
      en: 'Complete renovation of vehicle interior parts with factory finish.'
    },
    details: {
      pt: ['Tablier e consolas', 'Painéis de portas', 'Acabamento premium', 'Cores personalizadas'],
      en: ['Dashboard and consoles', 'Door panels', 'Premium finish', 'Custom colors']
    },
    isActive: true
  },
  {
    order: 4,
    icon: '/pintura-jante.jpg',
    title: { pt: 'Pintura de Jantes', en: 'Rim Painting' },
    description: {
      pt: 'Transforme o visual do seu carro com pintura profissional de jantes em qualquer cor.',
      en: 'Transform the look of your car with professional rim painting in any color.'
    },
    details: {
      pt: ['Qualquer cor disponível', 'Reparação de danos', 'Acabamento brilhante ou mate', 'Proteção duradoura'],
      en: ['Any color available', 'Damage repair', 'Glossy or matte finish', 'Durable protection']
    },
    isActive: true
  },
  {
    order: 5,
    icon: '/polimento-otica.jpg',
    title: { pt: 'Polimento de Óticas', en: 'Headlight Polishing' },
    description: {
      pt: 'Restauração completa de faróis oxidados, devolvendo a transparência e melhorando a iluminação.',
      en: 'Complete restoration of oxidized headlights, restoring transparency and improving lighting.'
    },
    details: {
      pt: ['Remove oxidação', 'Melhora iluminação', 'Aumenta segurança', 'Resultado imediato'],
      en: ['Removes oxidation', 'Improves lighting', 'Increases safety', 'Immediate result']
    },
    isActive: true
  },
  {
    order: 6,
    icon: '/restauracao-volante.jpg',
    title: { pt: 'Restauração de Volantes', en: 'Steering Wheel Restoration' },
    description: {
      pt: 'Renovação completa de volantes em pele, restaurando o conforto e aparência original.',
      en: 'Complete renovation of leather steering wheels, restoring comfort and original appearance.'
    },
    details: {
      pt: ['Restauro de pele', 'Recosedura', 'Hidratação profunda', 'Personalização'],
      en: ['Leather restoration', 'Restitching', 'Deep conditioning', 'Customization']
    },
    isActive: true
  },
  {
    order: 7,
    icon: '/estofo.jpg',
    title: { pt: 'Limpeza de Estofos', en: 'Upholstery Cleaning' },
    description: {
      pt: 'Limpeza profunda de estofos e interiores, eliminando manchas e odores indesejados.',
      en: 'Deep cleaning of upholstery and interiors, eliminating stains and unwanted odors.'
    },
    details: {
      pt: ['Limpeza a vapor', 'Remove manchas difíceis', 'Elimina odores', 'Higienização completa'],
      en: ['Steam cleaning', 'Removes tough stains', 'Eliminates odors', 'Complete sanitization']
    },
    isActive: true
  },
  {
    order: 8,
    icon: '/pintura-de-carro.jpg',
    title: { pt: 'Pintura Completa', en: 'Complete Painting' },
    description: {
      pt: 'Pintura total do veículo com acabamento de fábrica e garantia de qualidade.',
      en: 'Total vehicle painting with factory finish and quality guarantee.'
    },
    details: {
      pt: ['Preparação completa', 'Tinta de alta qualidade', 'Acabamento premium', 'Garantia incluída'],
      en: ['Complete preparation', 'High quality paint', 'Premium finish', 'Warranty included']
    },
    isActive: true
  }
];

// Conteúdo do site (contactos) - SÁBADO FECHADO
const siteContents = [
  { key: 'contact_phone', section: 'contact', content: { pt: '+351 960 172 705', en: '+351 960 172 705' } },
  { key: 'contact_email', section: 'contact', content: { pt: 'info@streetpaint.pt', en: 'info@streetpaint.pt' } },
  { key: 'contact_whatsapp', section: 'contact', content: '351960172705' },
  { key: 'contact_address', section: 'contact', content: { pt: 'Av. Pedro Álvares Cabral 13, Armazém B13, 2710-263 Sintra', en: 'Av. Pedro Álvares Cabral 13, Warehouse B13, 2710-263 Sintra' } },
  { key: 'contact_schedule', section: 'contact', content: { pt: 'Seg-Sex: 9h-18h', en: 'Mon-Fri: 9am-6pm' } },
  { key: 'contact_weekday_hours', section: 'contact', content: { pt: '09:00 - 18:00', en: '09:00 - 18:00' } },
  { key: 'contact_saturday_hours', section: 'contact', content: { pt: 'Encerrado', en: 'Closed' } },
];

// Admin user
const adminUser = {
  username: 'admin',
  password: 'streetpaint2024',
};

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB conectado');

    // Limpar dados existentes
    await PartPrice.deleteMany({});
    await Service.deleteMany({});
    await SiteContent.deleteMany({});
    console.log('🗑️ Dados antigos removidos');

    // Inserir preços das peças
    await PartPrice.insertMany(partPrices);
    console.log(`✅ ${partPrices.length} preços de peças inseridos`);

    // Inserir serviços
    await Service.insertMany(services);
    console.log(`✅ ${services.length} serviços inseridos`);

    // Inserir conteúdos do site
    await SiteContent.insertMany(siteContents);
    console.log(`✅ ${siteContents.length} conteúdos do site inseridos`);

    // Verificar se admin existe, se não, criar
    const existingAdmin = await User.findOne({ username: adminUser.username });
    if (!existingAdmin) {
      await User.create(adminUser);
      console.log('✅ Utilizador admin criado');
    } else {
      console.log('ℹ️ Utilizador admin já existe');
    }

    console.log('\n🎉 Base de dados populada com sucesso!');
    console.log('📊 Resumo:');
    console.log(`   - ${partPrices.length} preços de peças`);
    console.log(`   - ${services.length} serviços`);
    console.log(`   - ${siteContents.length} conteúdos (contactos)`);
    console.log(`   - 1 utilizador admin`);
    console.log('\n⏰ Horário configurado:');
    console.log('   - Segunda a Sexta: 09:00 - 18:00');
    console.log('   - Sábado: FECHADO');
    console.log('   - Domingo: FECHADO');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao popular base de dados:', error);
    process.exit(1);
  }
}

seedDatabase();