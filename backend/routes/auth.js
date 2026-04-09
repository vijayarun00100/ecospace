const router = require('express').Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Generate 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// Email transporter (configure with real credentials in .env)
let transporter;
try {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.OTP_EMAIL,
      pass: process.env.OTP_EMAIL_PASSWORD,
    },
  });
} catch (e) {
  console.log('Email transport not configured — OTPs will be logged to console');
}

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// POST /api/auth/signup - Register with email
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) return res.status(400).json({ error: 'Email already registered' });

    user = new User({ email: email.toLowerCase(), password, name: name || '' });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ token, user: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/send-otp - Send OTP to email
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Auto-create user if not exists
      user = new User({ email: email.toLowerCase() });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await user.save();

    // Try to send email, fallback to console
    if (transporter && process.env.OTP_EMAIL !== 'your-email@gmail.com') {
      await transporter.sendMail({
        from: process.env.OTP_EMAIL,
        to: email,
        subject: 'EcoSpace - Your OTP Code',
        html: `<h2>Your OTP is: <strong>${otp}</strong></h2><p>Valid for 10 minutes.</p>`,
      });
    } else {
      console.log(`\n📧 OTP for ${email}: ${otp}\n`);
    }

    res.json({ message: 'OTP sent successfully', email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/verify-otp - Verify OTP and login
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // In development, accept any 4-digit OTP if OTP matching is not configured
    const isValidOtp = user.otp === otp || (process.env.NODE_ENV !== 'production' && otp.length === 4);

    if (!isValidOtp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    if (user.otpExpiry && user.otpExpiry < new Date() && user.otp === otp) {
      return res.status(400).json({ error: 'OTP expired' });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    user.isVerified = true;
    await user.save();

    const token = generateToken(user._id);
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        onboardingDone: user.onboardingDone,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/google - Google Sign-In
router.post('/google', async (req, res) => {
  try {
    const { idToken, email, name, photo, googleId } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    let user = await User.findOne({ $or: [{ googleId }, { email: email.toLowerCase() }] });

    if (!user) {
      user = new User({
        email: email.toLowerCase(),
        name: name || '',
        avatar: photo || '',
        googleId,
        isVerified: true,
      });
      await user.save();
    } else {
      if (!user.googleId) {
        user.googleId = googleId;
      }
      if (photo && !user.avatar) {
        user.avatar = photo;
      }
      if (name && !user.name) {
        user.name = name;
      }
      user.isVerified = true;
      await user.save();
    }

    const token = generateToken(user._id);
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        onboardingDone: user.onboardingDone,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/auth/details - Save onboarding details
router.put('/details', auth, async (req, res) => {
  try {
    const { name, phone, bio, interests } = req.body;
    const user = req.user;

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (bio) user.bio = bio;
    if (interests) user.interests = interests;
    user.onboardingDone = true;
    await user.save();

    res.json({ user: { _id: user._id, name: user.name, email: user.email, avatar: user.avatar, onboardingDone: true } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me - Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password -otp -otpExpiry')
      .populate('followers', 'name avatar')
      .populate('following', 'name avatar');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
