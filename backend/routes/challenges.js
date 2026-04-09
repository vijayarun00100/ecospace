const router = require('express').Router();
const Challenge = require('../models/Challenge');
const User = require('../models/User');
const CoinHistory = require('../models/CoinHistory');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

// GET /api/challenges
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const challenges = await Challenge.find(filter)
      .sort({ createdAt: -1 })
      .populate('participants.user', 'name avatar');
    res.json({ challenges });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/challenges/:id
router.get('/:id', async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('participants.user', 'name avatar');
    if (!challenge) return res.status(404).json({ error: 'Challenge not found' });

    const completedCount = challenge.participants.filter((p) => p.status === 'completed').length;
    const ongoingCount = challenge.participants.filter((p) => p.status === 'accepted').length;

    res.json({ challenge, completedCount, ongoingCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/challenges/:id/accept
router.post('/:id/accept', auth, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ error: 'Challenge not found' });

    const already = challenge.participants.find(
      (p) => p.user.toString() === req.userId.toString()
    );
    if (already) return res.status(400).json({ error: 'Already participating' });

    challenge.participants.push({ user: req.userId, status: 'accepted' });
    challenge.acceptedCount += 1;
    await challenge.save();
    res.json({ message: 'Challenge accepted', acceptedCount: challenge.acceptedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/challenges/:id/submit
router.post('/:id/submit', auth, upload.single('proof'), async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ error: 'Challenge not found' });

    const participant = challenge.participants.find(
      (p) => p.user.toString() === req.userId.toString()
    );
    if (!participant) return res.status(400).json({ error: 'Not a participant' });

    participant.proof = req.file ? `/uploads/${req.file.filename}` : '';
    participant.submittedAt = new Date();
    participant.status = 'completed';
    await challenge.save();

    // Award coins
    if (challenge.reward > 0) {
      const user = await User.findById(req.userId);
      user.coins += challenge.reward;
      await user.save();

      await CoinHistory.create({
        user: req.userId,
        amount: challenge.reward,
        type: 'earned',
        description: `Completed challenge: ${challenge.title}`,
      });
    }

    res.json({ message: 'Challenge completed! Coins awarded.', reward: challenge.reward });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/challenges/history
router.get('/user/history', auth, async (req, res) => {
  try {
    const challenges = await Challenge.find({
      'participants.user': req.userId,
    }).populate('participants.user', 'name avatar');
    res.json({ challenges });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
