const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, default: '' },
  text: { type: String, default: '' },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  isVerifiedPurchase: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const questionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true },
  answer: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, default: '' },
  shortDescription: { type: String, default: '' },
  images: [{ type: String }],
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  ratingsCount: { type: Number, default: 0 },
  reviews: [reviewSchema],
  questions: [questionSchema],
  colors: [{ name: String, hex: String }],
  sizes: [{ label: String, value: String }],
  category: { type: String, default: 'General' },
  certification: { type: String, default: '' },
  carbonSaved: { type: String, default: '0g' },
  plasticSaved: { type: String, default: '0g' },
  benefits: [{ type: String }],
  stock: { type: Number, default: 100 },
  deliveryDays: { type: Number, default: 2 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
