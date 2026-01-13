import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
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

export default mongoose.model('SiteContent', siteContentSchema);