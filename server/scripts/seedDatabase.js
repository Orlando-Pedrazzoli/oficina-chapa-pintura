import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import PartPrice from '../models/PartPrice.js';
import Service from '../models/Service.js';
import SiteContent from '../models/SiteContent.js';

dotenv.config();

// PREÇOS DAS PEÇAS
const partPricesData = [
  { partId: 'para-choque-dianteiro', name: { pt: 'Pára-choques Dianteiro', en: 'Front Bumper' }, prices: { paint: 180, paintAndDent: 380 } },
  { partId: 'para-choque-traseiro', name: { pt: 'Pára-choques Traseiro', en: 'Rear Bumper' }, prices: { paint: 180, paintAndDent: 380 } },
  { partId: 'capo', name: { pt: 'Capô', en: 'Hood' }, prices: { paint: 250, paintAndDent: 450 } },
  { partId: 'porta-dianteira-esquerda', name: { pt: 'Porta Dianteira (Esq.)', en: 'Front Door (Left)' }, prices: { paint: 200, paintAndDent: 400 } },
  { partId: 'porta-dianteira-direita', name: { pt: 'Porta Dianteira (Dir.)', en: 'Front Door (Right)' }, prices: { paint: 200, paintAndDent: 400 } },
  { partId: 'porta-traseira-esquerda', name: { pt: 'Porta Traseira (Esq.)', en: 'Rear Door (Left)' }, prices: { paint: 200, paintAndDent: 400 } },
  { partId: 'porta-traseira-direita', name: { pt: 'Porta Traseira (Dir.)', en: 'Rear Door (Right)' }, prices: { paint: 200, paintAndDent: 400 } },
  { partId: 'guarda-lamas-dianteiro-esquerdo', name: { pt: 'Guarda-lamas Diant. (Esq.)', en: 'Front Fender (Left)' }, prices: { paint: 150, paintAndDent: 300 } },
  { partId: 'guarda-lamas-dianteiro-direito', name: { pt: 'Guarda-lamas Diant. (Dir.)', en: 'Front Fender (Right)' }, prices: { paint: 150, paintAndDent: 300 } },
  { partId: 'ilharga-esquerda', name: { pt: 'Ilharga (Esq.)', en: 'Quarter Panel (Left)' }, prices: { paint: 150, paintAndDent: 300 } },
  { partId: 'ilharga-direita', name: { pt: 'Ilharga (Dir.)', en: 'Quarter Panel (Right)' }, prices: { paint: 150, paintAndDent: 300 } },
  { partId: 'mala', name: { pt: 'Tampa da Bagageira', en: 'Trunk Lid' }, prices: { paint: 220, paintAndDent: 420 } },
  { partId: 'tejadilho', name: { pt: 'Tejadilho', en: 'Roof' }, prices: { paint: 300, paintAndDent: 500 } },
  { partId: 'retrovisor-esquerdo', name: { pt: 'Retrovisor Esquerdo', en: 'Left Mirror' }, prices: { paint: 80, paintAndDent: 150 } },
  { partId: 'retrovisor-direito', name: { pt: 'Retrovisor Direito', en: 'Right Mirror' }, prices: { paint: 80, paintAndDent: 150 } },
  { partId: 'embaladeira-esquerda', name: { pt: 'Embaladeira (Esq.)', en: 'Rocker Panel (Left)' }, prices: { paint: 120, paintAndDent: 250 } },
  { partId: 'embaladeira-direita', name: { pt: 'Embaladeira (Dir.)', en: 'Rocker Panel (Right)' }, prices: { paint: 120, paintAndDent: 250 } },
  { partId: 'aileron', name: { pt: 'Aileron', en: 'Spoiler' }, prices: { paint: 100, paintAndDent: 200 } },
];

// TODOS OS 9 SERVIÇOS COMPLETOS
const servicesData = [
  {
    icon: '/chapa.png',
    title: { pt: 'Bate Chapa', en: 'Auto Body' },
    description: {
      pt: 'Reparação especializada de chapa e estrutura da viatura com técnicas profissionais de endireitamento.',
      en: 'Specialized repair of body and vehicle structure with professional straightening techniques.'
    },
    details: {
      pt: ['Reparação de estruturas danificadas', 'Soldadura de chapas metálicas', 'Correção de deformações', 'Substituição de painéis', 'Reparação de sinistros'],
      en: ['Damaged structure repair', 'Metal sheet welding', 'Deformation correction', 'Panel replacement', 'Accident repair']
    },
    order: 0,
    active: true
  },
  {
    icon: '/martelinho.jpg',
    title: { pt: 'Martelinho de Ouro', en: 'Paintless Dent Repair' },
    description: {
      pt: 'Técnica especializada para reparação de amolgadelas sem danificar a pintura original.',
      en: 'Specialized technique for repairing dents without damaging the original paint.'
    },
    details: {
      pt: ['Reparação sem pintura (PDR)', 'Preserva pintura original', 'Amolgadelas de granizo', 'Danos de estacionamento', 'Resultado invisível'],
      en: ['Paintless repair (PDR)', 'Preserves original paint', 'Hail dents', 'Parking damage', 'Invisible results']
    },
    order: 1,
    active: true
  },
  {
    icon: '/revitalizacao-pintura.jpg',
    title: { pt: 'Revitalização de Pintura', en: 'Paint Restoration' },
    description: {
      pt: 'Devolva o brilho original à pintura do seu veículo com técnicas profissionais de revitalização.',
      en: 'Restore the original shine to your vehicle paint with professional restoration techniques.'
    },
    details: {
      pt: ['Remoção de riscos superficiais', 'Polimento profissional', 'Correção de oxidação', 'Proteção UV', 'Acabamento espelhado'],
      en: ['Surface scratch removal', 'Professional polishing', 'Oxidation correction', 'UV protection', 'Mirror finish']
    },
    order: 2,
    active: true
  },
  {
    icon: '/pintura-interior.jpg',
    title: { pt: 'Pintura de Interior', en: 'Interior Painting' },
    description: {
      pt: 'Renovação completa do interior do veículo com pintura especializada para plásticos e tecidos.',
      en: 'Complete interior renovation with specialized painting for plastics and fabrics.'
    },
    details: {
      pt: ['Painéis e consolas', 'Molduras e acabamentos', 'Pintura de plásticos', 'Cores personalizadas', 'Proteção anti-UV'],
      en: ['Panels and consoles', 'Trims and finishes', 'Plastic painting', 'Custom colors', 'Anti-UV protection']
    },
    order: 3,
    active: true
  },
  {
    icon: '/pintura-jante.jpg',
    title: { pt: 'Pintura de Jantes', en: 'Rim Painting' },
    description: {
      pt: 'Restauração e pintura de jantes com acabamentos especiais e cores personalizadas.',
      en: 'Restoration and painting of rims with special finishes and custom colors.'
    },
    details: {
      pt: ['Preparação completa', 'Primer especializado', 'Cores metalizadas', 'Acabamento mate ou brilhante', 'Proteção anti-corrosão'],
      en: ['Complete preparation', 'Specialized primer', 'Metallic colors', 'Matte or glossy finish', 'Anti-corrosion protection']
    },
    order: 4,
    active: true
  },
  {
    icon: '/polimento-otica.jpg',
    title: { pt: 'Polimento de Óticas', en: 'Headlight Polishing' },
    description: {
      pt: 'Restauração da transparência dos faróis e farolins para melhor visibilidade e estética.',
      en: 'Restoration of headlight and taillight transparency for better visibility and aesthetics.'
    },
    details: {
      pt: ['Remoção de amarelecimento', 'Polimento profissional', 'Proteção UV', 'Melhora da iluminação', 'Aspeto como novo'],
      en: ['Yellowing removal', 'Professional polishing', 'UV protection', 'Improved lighting', 'Like-new appearance']
    },
    order: 5,
    active: true
  },
  {
    icon: '/restauracao-volante.jpg',
    title: { pt: 'Restauração de Volantes', en: 'Steering Wheel Restoration' },
    description: {
      pt: 'Renovação completa de volantes em pele, couro ou outros materiais com acabamento profissional.',
      en: 'Complete renovation of leather, suede or other material steering wheels with professional finishing.'
    },
    details: {
      pt: ['Reparação de desgaste', 'Retintura de pele/couro', 'Restauração de costuras', 'Acabamentos personalizados', 'Proteção contra desgaste'],
      en: ['Wear repair', 'Leather/suede re-dyeing', 'Stitch restoration', 'Custom finishes', 'Wear protection']
    },
    order: 6,
    active: true
  },
  {
    icon: '/estofo.jpg',
    title: { pt: 'Limpeza de Estofos', en: 'Upholstery Cleaning' },
    description: {
      pt: 'Limpeza profunda e tratamento de estofos em tecido, pele e outros materiais.',
      en: 'Deep cleaning and treatment of upholstery in fabric, leather and other materials.'
    },
    details: {
      pt: ['Limpeza a vapor', 'Remoção de nódoas', 'Tratamento anti-bacteriano', 'Proteção de tecidos', 'Desodorização profissional'],
      en: ['Steam cleaning', 'Stain removal', 'Anti-bacterial treatment', 'Fabric protection', 'Professional deodorization']
    },
    order: 7,
    active: true
  },
  {
    icon: '/pintura-de-carro.jpg',
    title: { pt: 'Pintura Completa', en: 'Complete Painting' },
    description: {
      pt: 'Pintura total do veículo com preparação completa e acabamentos de qualidade premium.',
      en: 'Full vehicle painting with complete preparation and premium quality finishes.'
    },
    details: {
      pt: ['Preparação total da carroçaria', 'Primer de alta qualidade', 'Pintura em cabine', 'Verniz de proteção', 'Garantia de qualidade'],
      en: ['Complete body preparation', 'High-quality primer', 'Booth painting', 'Protective varnish', 'Quality guarantee']
    },
    order: 8,
    active: true
  }
];

// CONTEÚDO DO SITE - CONTACTOS E HORÁRIOS
const siteContentData = [
  // CONTACTOS
  { key: 'contact_phone', section: 'contact', content: { pt: '+351 960 172 705', en: '+351 960 172 705' } },
  { key: 'contact_email', section: 'contact', content: { pt: 'info@streetpaint.pt', en: 'info@streetpaint.pt' } },
  { key: 'contact_whatsapp', section: 'contact', content: { pt: '351960172705', en: '351960172705' } },
  { key: 'contact_address', section: 'contact', content: { pt: 'Rua da Oficina, 123, Sintra', en: 'Rua da Oficina, 123, Sintra' } },
  
  // HORÁRIOS
  { key: 'contact_schedule', section: 'contact', content: { pt: 'Seg-Sex: 9h-18h', en: 'Mon-Fri: 9am-6pm' } },
  { key: 'contact_weekday_hours', section: 'contact', content: { pt: '09:00 - 18:00', en: '09:00 - 18:00' } },
  { key: 'contact_saturday_hours', section: 'contact', content: { pt: 'Encerrado', en: 'Closed' } },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    // Limpar dados
    await User.deleteMany({});
    await PartPrice.deleteMany({});
    await Service.deleteMany({});
    await SiteContent.deleteMany({});
    console.log('🗑️  Dados antigos removidos');

    // Criar admin
    await User.create({ username: 'admin', password: 'admin123' });
    console.log('👤 Admin criado');

    // Criar preços
    await PartPrice.insertMany(partPricesData);
    console.log('💰 Preços criados (18 peças)');

    // Criar serviços
    await Service.insertMany(servicesData);
    console.log('🔧 Serviços criados (9 serviços)');

    // Criar conteúdo
    await SiteContent.insertMany(siteContentData);
    console.log('📝 Conteúdo criado (contactos + horários)');

    console.log('\n═══════════════════════════════════════');
    console.log('✅ Database populada com sucesso!');
    console.log('═══════════════════════════════════════');
    console.log('📝 Login: admin / admin123');
    console.log('🌐 Admin: http://localhost:5173/admin/login');
    console.log('═══════════════════════════════════════');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
};

seedDatabase();