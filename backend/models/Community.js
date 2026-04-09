const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    senderName: { type: String },
    content: { type: String, default: '' },
    type: { type: String, enum: ['text', 'image', 'sticker'], default: 'text' },
    createdAt: { type: Date, default: Date.now },
  }],
  lastMessage: { type: String, default: '' },
  lastMessageAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Community', communitySchema);
