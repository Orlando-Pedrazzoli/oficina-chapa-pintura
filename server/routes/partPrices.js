import express from 'express';
import PartPrice from '../models/PartPrice.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const prices = await PartPrice.find({ active: true });
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar preços' });
  }
});

router.get('/admin', protect, async (req, res) => {
  try {
    const prices = await PartPrice.find().sort({ partId: 1 });
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar preços' });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const price = await PartPrice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!price) {
      return res.status(404).json({ message: 'Preço não encontrado' });
    }
    res.json(price);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar preço' });
  }
});

export default router;