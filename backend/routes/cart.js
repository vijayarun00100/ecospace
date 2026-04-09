const router = require('express').Router();
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// GET /api/cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.userId }).populate('items.product');
    if (!cart) {
      cart = { items: [], user: req.userId };
    }

    // Calculate totals
    let subtotal = 0;
    const items = (cart.items || []).map((item) => {
      const p = item.product;
      if (!p) return null;
      const itemTotal = p.price * item.quantity;
      subtotal += itemTotal;
      return {
        _id: item._id,
        product: p,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        itemTotal,
      };
    }).filter(Boolean);

    const tax = Math.round(subtotal * 0.08);
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + tax + shipping;

    res.json({ items, subtotal, tax, shipping, total, itemCount: items.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/cart/add
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity, color, size } = req.body;
    if (!productId) return res.status(400).json({ error: 'Product ID required' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    let cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      cart = new Cart({ user: req.userId, items: [] });
    }

    const existingIdx = cart.items.findIndex(
      (i) => i.product.toString() === productId && i.color === (color || '') && i.size === (size || '')
    );

    if (existingIdx > -1) {
      cart.items[existingIdx].quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1, color: color || '', size: size || '' });
    }

    await cart.save();
    await cart.populate('items.product');
    res.json({ cart, itemCount: cart.items.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/cart/update
router.put('/update', auth, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (quantity <= 0) {
      cart.items.pull(itemId);
    } else {
      item.quantity = quantity;
    }
    await cart.save();
    await cart.populate('items.product');
    res.json({ cart, itemCount: cart.items.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/cart/remove/:itemId
router.delete('/remove/:itemId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    cart.items.pull(req.params.itemId);
    await cart.save();
    res.json({ cart, itemCount: cart.items.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/cart/checkout
router.post('/checkout', auth, async (req, res) => {
  try {
    const { paymentMethod, shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: req.userId }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    let subtotal = 0;
    const orderItems = cart.items.map((item) => {
      const p = item.product;
      subtotal += p.price * item.quantity;
      return {
        product: p._id,
        name: p.name,
        image: p.images[0] || '',
        price: p.price,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      };
    });

    const tax = Math.round(subtotal * 0.08);
    const shipping = subtotal > 500 ? 0 : 50;
    const totalAmount = subtotal + tax + shipping;

    const order = new Order({
      user: req.userId,
      items: orderItems,
      subtotal,
      tax,
      shipping,
      totalAmount,
      paymentMethod: paymentMethod || 'UPI (Google Pay)',
      shippingAddress: shippingAddress || '',
      email: req.user.email,
    });
    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    // Award coins
    const coinsEarned = Math.floor(totalAmount / 10);
    req.user.coins += coinsEarned;
    await req.user.save();

    await order.populate('items.product');
    res.status(201).json({ order, coinsEarned });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
