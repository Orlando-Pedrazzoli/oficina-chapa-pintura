import express from 'express';
import SiteContent from '../models/SiteContent.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const content = await SiteContent.find();
    
    const organized = {};
    content.forEach(item => {
      if (!organized[item.section]) {
        organized[item.section] = {};
      }
      organized[item.section][item.key] = item.content;
    });
    
    res.json(organized);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar conteúdo' });
  }
});

router.get('/admin', protect, async (req, res) => {
  try {
    const content = await SiteContent.find().sort({ section: 1, key: 1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar conteúdo' });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const content = await SiteContent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!content) {
      return res.status(404).json({ message: 'Conteúdo não encontrado' });
    }
    
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar conteúdo' });
  }
});

router.post('/upsert', protect, async (req, res) => {
  try {
    const { key, section, content } = req.body;
    
    const siteContent = await SiteContent.findOneAndUpdate(
      { key, section },
      { content },
      { new: true, upsert: true }
    );
    
    res.json(siteContent);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao salvar conteúdo' });
  }
});

export default router;