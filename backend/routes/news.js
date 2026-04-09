const router = require('express').Router();
const News = require('../models/News');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// GET /api/news
router.get('/', async (req, res) => {
  try {
    const news = await News.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('author', 'name avatar');
    res.json({ news });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/news
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const news = new News({
      author: req.userId,
      title,
      content: content || '',
      image,
      category: category || 'General',
    });
    await news.save();
    await news.populate('author', 'name avatar');
    res.status(201).json({ news });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
