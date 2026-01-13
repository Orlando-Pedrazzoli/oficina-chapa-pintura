import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  content: {
    pt: mongoose.Schema.Types.Mixed,
    en: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

// Compound index: combinação key+section deve ser única
siteContentSchema.index({ key: 1, section: 1 }, { unique: true });

export default mongoose.model('SiteContent', siteContentSchema);