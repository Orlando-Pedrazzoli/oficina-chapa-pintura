import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from '../routes/auth.js';
import partPriceRoutes from '../routes/partPrices.js';
import serviceRoutes from '../routes/services.js';
import siteContentRoutes from '../routes/siteContent.js';

dotenv.config();

const app = express();

// CORS configurado para produção
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://streetpaint.pt',
  'https://www.streetpaint.pt',
  'https://streetpaint-client.vercel.app' // Adiciona o domínio do Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sem origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.some(allowed => origin.startsWith(allowed.replace('www.', '')) || origin === allowed)) {
      callback(null, true);
    } else {
      callback(new Error('CORS não permitido'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Conexão MongoDB com cache para serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    cachedDb = mongoose.connection;
    console.log('✅ MongoDB conectado');
    return cachedDb;
  } catch (error) {
    console.error('❌ Erro MongoDB:', error);
    throw error;
  }
}

// Middleware para garantir conexão DB antes de cada request
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    res.status(500).json({ message: 'Erro de conexão com banco de dados' });
  }
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/part-prices', partPriceRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/site-content', siteContentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Street Paint API rodando!',
    timestamp: new Date().toISOString()
  });
});

// Rota raiz
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Street Paint API v1.0',
    endpoints: [
      '/api/health',
      '/api/auth/login',
      '/api/services',
      '/api/part-prices',
      '/api/site-content'
    ]
  });
});

// 404 handler
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'Endpoint não encontrado' });
});

// Export para Vercel Serverless
export default app;