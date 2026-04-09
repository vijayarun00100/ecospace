const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  content: { type: String, default: '' },
  images: [{ type: String }],
  hashtags: [{ type: String }],
  readingTime: { type: Number, default: 5 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
    createdAt: { type: Date, default: Date.now },
  }],
  isPublished: { type: Boolean, default: true },
  scheduledAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
