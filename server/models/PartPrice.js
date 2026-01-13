import mongoose from 'mongoose';

const partPriceSchema = new mongoose.Schema({
  partId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    pt: { type: String, required: true },
    en: { type: String, required: true }
  },
  prices: {
    paint: { type: Number, required: true },
    paintAndDent: { type: Number, required: true }
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model('PartPrice', partPriceSchema);