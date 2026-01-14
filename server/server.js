import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import partPriceRoutes from './routes/partPrices.js';
import serviceRoutes from './routes/services.js';
import siteContentRoutes from './routes/siteContent.js';
import uploadRoutes from './routes/upload.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS configurado para produção e desenvolvimento
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://www.streetpaint.pt',
    'https://streetpaint.pt',
    'https://oficina-chapa-pintura.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/part-prices', partPriceRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/site-content', siteContentRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Street Paint API rodando!' });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Street Paint API - Use /api/health para verificar status' });
});

// Conexão MongoDB com cache para serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
    });
    isConnected = true;
    console.log('✅ MongoDB conectado');
  } catch (err) {
    console.error('❌ Erro MongoDB:', err);
    throw err;
  }
};

// Conectar ao MongoDB
connectDB();

// Para desenvolvimento local
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
}

// IMPORTANTE: Exportar app para o Vercel
export default app;