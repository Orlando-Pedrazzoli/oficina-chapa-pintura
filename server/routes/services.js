import express from 'express';
import Service from '../models/Service.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ active: true }).sort({ order: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar serviços' });
  }
});

router.get('/admin', protect, async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar serviços' });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar serviço', error: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar serviço' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }
    res.json({ message: 'Serviço deletado' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao deletar serviço' });
  }
});

router.post('/reorder', protect, async (req, res) => {
  try {
    const { serviceIds } = req.body;
    
    await Promise.all(
      serviceIds.map((id, index) => 
        Service.findByIdAndUpdate(id, { order: index })
      )
    );
    
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao reordenar serviços' });
  }
});

export default router;