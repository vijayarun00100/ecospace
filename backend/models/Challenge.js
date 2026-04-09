const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  reward: { type: Number, default: 0 },
  rewardDescription: { type: String, default: '' },
  category: { type: String, default: 'General' },
  icon: { type: String, default: '' },
  acceptedCount: { type: Number, default: 0 },
  deadline: { type: Date },
  hoursLeft: { type: Number, default: 24 },
  conditions: [{ type: String }],
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['accepted', 'completed', 'failed'], default: 'accepted' },
    proof: { type: String },
    submittedAt: { type: Date },
    acceptedAt: { type: Date, default: Date.now },
  }],
  targetAmount: { type: String, default: '' },
  unit: { type: String, default: 'kgs' },
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
