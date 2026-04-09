const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const Challenge = require('../models/Challenge');
const CoinHistory = require('../models/CoinHistory');
const Tip = require('../models/Tip');
const { auth } = require('../middleware/auth');

// GET /api/dashboard
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    // Tasks
    const completedChallenges = await Challenge.countDocuments({
      'participants': { $elemMatch: { user: req.userId, status: 'completed' } },
    });
    const ongoingChallenges = await Challenge.countDocuments({
      'participants': { $elemMatch: { user: req.userId, status: 'accepted' } },
    });
    const totalTasks = completedChallenges + ongoingChallenges;
    const progress = totalTasks > 0 ? completedChallenges / Math.max(totalTasks, 10) : 0;

    // Badge level
    let level = 'Eco Starter';
    if (completedChallenges >= 50) level = 'Climate Champion';
    else if (completedChallenges >= 30) level = 'Eco Influencer';
    else if (completedChallenges >= 20) level = 'Green Thumb';
    else if (completedChallenges >= 15) level = 'Waste Warrior';
    else if (completedChallenges >= 10) level = 'Energy Saver';
    else if (completedChallenges >= 5) level = 'Green Commuter';
    else if (completedChallenges >= 3) level = 'Plastic Free';

    // Post goal progress
    const postCount = await Post.countDocuments({ author: req.userId });
    const postGoal = 10;
    const postProgress = Math.min(postCount / postGoal, 1);

    // Challenge categories
    const categories = [
      { name: 'Plastic Free', icon: 'PlasticFree' },
      { name: 'Green Commuter', icon: 'Green_Commuter' },
      { name: 'Energy Saver', icon: 'EnergySaver' },
      { name: 'Waste Warrior', icon: 'WasteWarrior' },
      { name: 'Green Thumb', icon: 'GreenThumb' },
      { name: 'Eco Influencer', icon: 'EcoInfluencer' },
      { name: 'Climate Champion', icon: 'ClimateChampion' },
    ];

    res.json({
      level,
      progress,
      completedTasks: completedChallenges,
      pendingTasks: ongoingChallenges,
      coins: user.coins,
      carbonSaved: user.carbonSaved,
      plasticSaved: user.plasticSaved,
      postGoal: { current: postCount, target: postGoal, progress: postProgress },
      categories,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/dashboard/coins
router.get('/coins', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ coins: user.coins });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/dashboard/coin-history
router.get('/coin-history', auth, async (req, res) => {
  try {
    const history = await CoinHistory.find({ user: req.userId })
      .sort({ createdAt: -1 });
    res.json({ history, coins: req.user.coins });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/dashboard/tip
router.get('/tip', async (req, res) => {
  try {
    // Get a random tip or the latest one
    const count = await Tip.countDocuments();
    const random = Math.floor(Math.random() * count);
    const tip = await Tip.findOne().skip(random);
    res.json({ tip: tip || { title: 'Avoid Single-Use Plastics', description: 'Switching to a reusable water bottle saves you money and the planet.' } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
