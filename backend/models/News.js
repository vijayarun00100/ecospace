const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, default: '' },
  image: { type: String, default: '' },
  category: { type: String, default: 'General' },
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);
