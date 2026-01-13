import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  icon: {
    type: String,
    default: '/default-service.png'
  },
  title: {
    pt: { type: String, required: true },
    en: { type: String, required: true }
  },
  description: {
    pt: { type: String, required: true },
    en: { type: String, required: true }
  },
  details: {
    pt: [String],
    en: [String]
  },
  order: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);