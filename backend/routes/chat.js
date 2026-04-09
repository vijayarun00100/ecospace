const router = require('express').Router();
const Chat = require('../models/Chat');
const Community = require('../models/Community');
const { auth } = require('../middleware/auth');

// POST /api/chats (Get or Create Chat)
router.post('/', auth, async (req, res) => {
  try {
    const { receiverId } = req.body;
    console.log(`Chat creation request: sender=${req.userId}, receiver=${receiverId}`);
    if (!receiverId) return res.status(400).json({ error: 'Receiver ID is required' });

    let chat = await Chat.findOne({
      participants: { $all: [req.userId, receiverId] }
    }).populate('participants', 'name avatar');

    if (!chat) {
      chat = new Chat({
        participants: [req.userId, receiverId],
        messages: []
      });
      await chat.save();
      await chat.populate('participants', 'name avatar');
    }
    
    const other = chat.participants.find(
      (p) => p._id && p._id.toString() !== req.userId.toString()
    );
    
    console.log(`Returning chat: ${chat._id}, otherUser: ${other?.name || 'unknown'}`);
    res.status(200).json({ chat: { _id: chat._id, user: other } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/chats
router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.userId })
      .populate('participants', 'name avatar')
      .sort({ lastMessageAt: -1 });

    const chatList = chats.map((chat) => {
      const other = chat.participants.find(
        (p) => p._id.toString() !== req.userId.toString()
      );
      const unread = chat.messages.filter(
        (m) => m.sender && m.sender.toString() !== req.userId.toString() && !m.readBy.includes(req.userId)
      ).length;

      return {
        _id: chat._id,
        user: other,
        lastMessage: chat.lastMessage,
        lastMessageAt: chat.lastMessageAt,
        unread,
      };
    });

    res.json({ chats: chatList });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/chats/:id/messages
router.get('/:id/messages', auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate('messages.sender', 'name avatar')
      .populate('participants', 'name avatar');
    
    if (!chat) {
        console.warn(`Chat not found for ID: ${req.params.id}`);
        return res.status(404).json({ error: 'Chat not found' });
    }

    // Mark messages as read
    chat.messages.forEach((msg) => {
      if (msg.sender && msg.sender._id.toString() !== req.userId.toString()) {
        if (!msg.readBy.includes(req.userId)) {
          msg.readBy.push(req.userId);
        }
      }
    });
    await chat.save();

    res.json({ messages: chat.messages, participants: chat.participants });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/chats/:id/messages
router.post('/:id/messages', auth, async (req, res) => {
  try {
    const { content, type } = req.body;
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ error: 'Chat not found' });

    const message = {
      sender: req.userId,
      content: content || '',
      type: type || 'text',
      readBy: [req.userId],
    };
    chat.messages.push(message);
    chat.lastMessage = content;
    chat.lastMessageAt = new Date();
    await chat.save();

    res.json({ message: chat.messages[chat.messages.length - 1] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/communities
router.get('/communities', auth, async (req, res) => {
  try {
    const communities = await Community.find({ members: req.userId })
      .sort({ lastMessageAt: -1 });

    const list = communities.map((c) => ({
      _id: c._id,
      name: c.name,
      image: c.image,
      lastMessage: c.lastMessage,
      lastMessageAt: c.lastMessageAt,
      memberCount: c.members.length,
      unread: c.messages.filter(
        (m) => m.sender && m.sender.toString() !== req.userId.toString()
      ).length,
    }));

    res.json({ communities: list });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
