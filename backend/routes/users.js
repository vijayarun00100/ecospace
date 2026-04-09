const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const Article = require('../models/Article');
const Product = require('../models/Product');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// GET /api/users/me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password -otp -otpExpiry')
      .populate('followers', 'name avatar')
      .populate('following', 'name avatar');

    const postCount = await Post.countDocuments({ author: req.userId });
    const articleCount = await Article.countDocuments({ author: req.userId });
    const productCount = await Product.countDocuments({ seller: req.userId });

    res.json({
      user,
      stats: {
        posts: postCount,
        articles: articleCount,
        products: productCount,
        followers: user.followers.length,
        following: user.following.length,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -otp -otpExpiry')
      .populate('followers', 'name avatar')
      .populate('following', 'name avatar');
    if (!user) return res.status(404).json({ error: 'User not found' });

    const postCount = await Post.countDocuments({ author: req.params.id });
    const articleCount = await Article.countDocuments({ author: req.params.id });
    const productCount = await Product.countDocuments({ seller: req.params.id });

    res.json({
      user,
      stats: {
        posts: postCount,
        articles: articleCount,
        products: productCount,
        followers: user.followers.length,
        following: user.following.length,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/users/me - Edit profile
router.put('/me', auth, upload.single('avatar'), async (req, res) => {
  try {
    const { name, bio, phone } = req.body;
    const user = req.user;
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (phone) user.phone = phone;
    if (req.file) {
      user.avatar = `/uploads/${req.file.filename}`;
    }
    await user.save();
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users/:id/follow
router.post('/:id/follow', auth, async (req, res) => {
  try {
    if (req.params.id === req.userId.toString()) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ error: 'User not found' });

    const isFollowing = req.user.following.includes(req.params.id);
    if (isFollowing) {
      req.user.following.pull(req.params.id);
      target.followers.pull(req.userId);
    } else {
      req.user.following.push(req.params.id);
      target.followers.push(req.userId);
    }
    await req.user.save();
    await target.save();

    res.json({ following: !isFollowing });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:id/posts
router.get('/:id/posts', async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id })
      .sort({ createdAt: -1 })
      .populate('author', 'name avatar');
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:id/articles
router.get('/:id/articles', async (req, res) => {
  try {
    const articles = await Article.find({ author: req.params.id })
      .sort({ createdAt: -1 })
      .populate('author', 'name avatar');
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/:id/products
router.get('/:id/products', async (req, res) => {
  try {
    const products = await Product.find({ seller: req.params.id })
      .sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users/me/bookmarks
router.get('/me/bookmarks', auth, async (req, res) => {
  console.log(`[Bookmarks] User ${req.userId} requested bookmarks`);
  try {
    const [posts, articles] = await Promise.all([
      Post.find({ bookmarks: req.userId }).populate('author', 'name avatar').lean(),
      Article.find({ bookmarks: req.userId }).populate('author', 'name avatar').lean()
    ]);

    const all = [
      ...posts.map(p => ({ ...p, contentType: 'Post' })),
      ...articles.map(a => ({ ...a, contentType: 'Article' }))
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    console.log(`[Bookmarks] Success: ${posts.length} posts, ${articles.length} articles`);
    res.json({ posts, articles, all });
  } catch (err) {
    console.error(`[Bookmarks] Error:`, err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
