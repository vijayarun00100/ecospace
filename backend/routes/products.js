const router = require('express').Router();
const Product = require('../models/Product');
const User = require('../models/User');
const { auth, optionalAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// GET /api/products
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { category, certification, sort, minPrice, maxPrice, q } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const filter = {};

    if (category) filter.category = category;
    if (certification) filter.certification = certification;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ];
    }

    let sortObj = { createdAt: -1 };
    if (sort === 'price_asc') sortObj = { price: 1 };
    else if (sort === 'price_desc') sortObj = { price: -1 };
    else if (sort === 'rating') sortObj = { rating: -1 };
    else if (sort === 'discount') sortObj = { discount: -1 };

    const products = await Product.find(filter)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    // Add wishlist flag
    let productsWithFlags = products.map((p) => p.toObject());
    if (req.userId) {
      const user = await User.findById(req.userId);
      productsWithFlags = productsWithFlags.map((p) => ({
        ...p,
        isWishlisted: user.wishlist.some((id) => id.toString() === p._id.toString()),
      }));
    }

    res.json({ products: productsWithFlags, page, totalPages: Math.ceil(total / limit), total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    const certifications = await Product.distinct('certification');
    res.json({ categories, certifications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('reviews.user', 'name avatar')
      .populate('seller', 'name avatar');
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const p = product.toObject();
    if (req.userId) {
      const user = await User.findById(req.userId);
      p.isWishlisted = user.wishlist.some((id) => id.toString() === p._id.toString());
    }

    res.json({ product: p });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products - Create (admin)
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  try {
    const data = req.body;
    const images = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];
    if (data.colors && typeof data.colors === 'string') data.colors = JSON.parse(data.colors);
    if (data.sizes && typeof data.sizes === 'string') data.sizes = JSON.parse(data.sizes);
    if (data.benefits && typeof data.benefits === 'string') data.benefits = JSON.parse(data.benefits);
    if (data.quantities && typeof data.quantities === 'string') data.quantities = JSON.parse(data.quantities);

    const product = new Product({ ...data, images, seller: req.userId });
    await product.save();
    res.status(201).json({ product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products/:id/review
router.post('/:id/review', auth, async (req, res) => {
  try {
    const { title, text, rating } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.reviews.push({ user: req.userId, title, text, rating: rating || 5, isVerifiedPurchase: true });

    // Recalculate average rating
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = totalRating / product.reviews.length;
    product.ratingsCount = product.reviews.length;

    await product.save();
    await product.populate('reviews.user', 'name avatar');
    res.json({ reviews: product.reviews, rating: product.rating, ratingsCount: product.ratingsCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products/:id/wishlist
router.post('/:id/wishlist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const idx = user.wishlist.indexOf(req.params.id);
    if (idx > -1) {
      user.wishlist.splice(idx, 1);
    } else {
      user.wishlist.push(req.params.id);
    }
    await user.save();
    res.json({ isWishlisted: idx === -1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products/:id/question
router.post('/:id/question', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.questions.push({ user: req.userId, text });
    await product.save();
    res.json({ questions: product.questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
