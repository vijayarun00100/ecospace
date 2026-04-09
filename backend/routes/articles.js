const router = require('express').Router();
const Article = require('../models/Article');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// GET /api/articles
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const filter = category ? { category, isPublished: true } : { isPublished: true };

    const articles = await Article.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'name avatar');

    const total = await Article.countDocuments(filter);
    res.json({ articles, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/articles/top
router.get('/top', async (req, res) => {
  try {
    const articles = await Article.find({ isPublished: true })
      .sort({ 'likes.length': -1, createdAt: -1 })
      .limit(10)
      .populate('author', 'name avatar');
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/articles/:id
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'name avatar')
      .populate('comments.user', 'name avatar');
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json({ article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/articles
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  try {
    const { title, category, content, hashtags, readingTime, scheduledAt } = req.body;
    const images = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];
    const tags = hashtags ? (typeof hashtags === 'string' ? JSON.parse(hashtags) : hashtags) : [];

    const article = new Article({
      author: req.userId,
      title,
      category: category || 'General',
      content: content || '',
      images,
      hashtags: tags,
      readingTime: readingTime || 5,
      scheduledAt: scheduledAt || null,
      isPublished: !scheduledAt,
    });
    await article.save();
    await article.populate('author', 'name avatar');
    res.status(201).json({ article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/articles/search
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ articles: [] });
    const articles = await Article.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { hashtags: { $regex: q, $options: 'i' } },
      ],
      isPublished: true,
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('author', 'name avatar');
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/articles/:id/like
router.post('/:id/like', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    const isLiked = article.likes.includes(req.userId);
    if (isLiked) {
      article.likes = article.likes.filter((id) => id.toString() !== req.userId.toString());
    } else {
      article.likes.push(req.userId);
      article.dislikes = article.dislikes.filter((id) => id.toString() !== req.userId.toString());
    }
    await article.save();
    res.json({ likes: article.likes, dislikes: article.dislikes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/articles/:id/dislike
router.post('/:id/dislike', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    const isDisliked = article.dislikes.includes(req.userId);
    if (isDisliked) {
      article.dislikes = article.dislikes.filter((id) => id.toString() !== req.userId.toString());
    } else {
      article.dislikes.push(req.userId);
      article.likes = article.likes.filter((id) => id.toString() !== req.userId.toString());
    }
    await article.save();
    res.json({ likes: article.likes, dislikes: article.dislikes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/articles/:id/bookmark
router.post('/:id/bookmark', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    const isBookmarked = article.bookmarks.includes(req.userId);
    if (isBookmarked) {
      article.bookmarks = article.bookmarks.filter((id) => id.toString() !== req.userId.toString());
    } else {
      article.bookmarks.push(req.userId);
    }
    await article.save();
    res.json({ bookmarks: article.bookmarks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/articles/:id/share
router.post('/:id/share', auth, async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, { $inc: { shares: 1 } }, { new: true });
    res.json({ shares: article.shares });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
