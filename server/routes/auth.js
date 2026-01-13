import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Aumentado para 7 dias
    );

    res.json({ token, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// GET /api/auth/verify - Verificar se token é válido
router.get('/verify', protect, async (req, res) => {
  try {
    // Se chegou aqui, o middleware protect já validou o token
    res.json({ 
      valid: true, 
      user: {
        id: req.user.id,
        username: req.user.username
      }
    });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Token inválido' });
  }
});

export default router;