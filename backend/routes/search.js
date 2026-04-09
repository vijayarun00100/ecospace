const router = require('express').Router();
const Post = require('../models/Post');
const Article = require('../models/Article');
const Product = require('../models/Product');
const User = require('../models/User');

// GET /api/search?q=&type=
router.get('/', async (req, res) => {
  try {
    const { q, type } = req.query;
    if (!q) return res.json({ posts: [], articles: [], products: [], users: [] });

    const regex = { $regex: q, $options: 'i' };
    const results = {};

    if (!type || type === 'posts') {
      results.posts = await Post.find({
        $or: [{ caption: regex }, { hashtags: regex }],
      })
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('author', 'name avatar');
    }

    if (!type || type === 'articles') {
      results.articles = await Article.find({
        $or: [{ title: regex }, { content: regex }],
        isPublished: true,
      })
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('author', 'name avatar');
    }

    if (!type || type === 'products') {
      results.products = await Product.find({
        $or: [{ name: regex }, { description: regex }, { category: regex }],
      })
        .sort({ createdAt: -1 })
        .limit(10);
    }

    if (!type || type === 'users') {
      results.users = await User.find({
        $or: [{ name: regex }, { bio: regex }],
      })
        .select('name avatar bio carbonSaved plasticSaved followers')
        .limit(10);
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
