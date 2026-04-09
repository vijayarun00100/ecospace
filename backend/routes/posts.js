const router = require('express').Router();
const Post = require('../models/Post');
const { auth, optionalAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// GET /api/posts - Feed (paginated)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name avatar')
      .populate('comments.user', 'name avatar');

    const total = await Post.countDocuments();

    // Add user-specific flags
    const postsWithFlags = posts.map((post) => {
      const p = post.toObject();
      if (req.userId) {
        p.isLiked = post.likes.some((id) => id.toString() === req.userId.toString());
        p.isDisliked = post.dislikes.some((id) => id.toString() === req.userId.toString());
        p.isBookmarked = post.bookmarks.some((id) => id.toString() === req.userId.toString());
      }
      p.likeCount = post.likes.length;
      p.dislikeCount = post.dislikes.length;
      p.commentCount = post.comments.length;
      return p;
    });

    res.json({ posts: postsWithFlags, page, totalPages: Math.ceil(total / limit), total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/posts - Create post
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  try {
    const { caption, hashtags } = req.body;
    const images = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];
    const tags = hashtags ? (typeof hashtags === 'string' ? JSON.parse(hashtags) : hashtags) : [];

    const post = new Post({
      author: req.userId,
      images,
      caption: caption || '',
      hashtags: tags,
    });
    await post.save();
    await post.populate('author', 'name avatar');
    res.status(201).json({ post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/posts/:id/like
router.post('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const idx = post.likes.indexOf(req.userId);
    if (idx > -1) {
      post.likes.splice(idx, 1);
    } else {
      post.likes.push(req.userId);
      // Remove from dislikes if present
      const dIdx = post.dislikes.indexOf(req.userId);
      if (dIdx > -1) post.dislikes.splice(dIdx, 1);
    }
    await post.save();
    res.json({ likeCount: post.likes.length, isLiked: idx === -1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/posts/:id/dislike
router.post('/:id/dislike', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const idx = post.dislikes.indexOf(req.userId);
    if (idx > -1) {
      post.dislikes.splice(idx, 1);
    } else {
      post.dislikes.push(req.userId);
      const lIdx = post.likes.indexOf(req.userId);
      if (lIdx > -1) post.likes.splice(lIdx, 1);
    }
    await post.save();
    res.json({ dislikeCount: post.dislikes.length, isDisliked: idx === -1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/posts/:id/comment
router.post('/:id/comment', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Comment text required' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.comments.push({ user: req.userId, text });
    await post.save();
    await post.populate('comments.user', 'name avatar');

    res.json({ comments: post.comments, commentCount: post.comments.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/posts/:id/share
router.post('/:id/share', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.shares += 1;
    await post.save();
    res.json({ shares: post.shares });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/posts/:id/bookmark
router.post('/:id/bookmark', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const idx = post.bookmarks.indexOf(req.userId);
    if (idx > -1) {
      post.bookmarks.splice(idx, 1);
    } else {
      post.bookmarks.push(req.userId);
    }
    await post.save();
    res.json({ isBookmarked: idx === -1 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/posts/search
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ posts: [] });

    const posts = await Post.find({
      $or: [
        { caption: { $regex: q, $options: 'i' } },
        { hashtags: { $regex: q, $options: 'i' } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('author', 'name avatar');

    res.json({ posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/posts/:id
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name avatar')
      .populate('comments.user', 'name avatar');
    
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const p = post.toObject();
    if (req.userId) {
      p.isLiked = post.likes.some((id) => id.toString() === req.userId.toString());
      p.isDisliked = post.dislikes.some((id) => id.toString() === req.userId.toString());
      p.isBookmarked = post.bookmarks.some((id) => id.toString() === req.userId.toString());
    }
    p.likeCount = post.likes.length;
    p.dislikeCount = post.dislikes.length;
    p.commentCount = post.comments.length;

    res.json({ post: p });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
