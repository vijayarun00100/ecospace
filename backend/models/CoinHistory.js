const mongoose = require('mongoose');

const coinHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['earned', 'redeemed'], required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: 'bag' },
}, { timestamps: true });

module.exports = mongoose.model('CoinHistory', coinHistorySchema);
