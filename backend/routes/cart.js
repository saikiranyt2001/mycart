const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const ensureOwner = (req, res) => {
  if (req.userId !== req.params.userId) {
    res.status(403).json({ message: 'Not authorized for this cart' });
    return false;
  }
  return true;
};

const recalcTotals = (cart) => {
  cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  cart.updatedAt = new Date();
};

// Get user cart
router.get('/:userId', async (req, res) => {
  if (!ensureOwner(req, res)) return;

  try {
    let cart = await Cart.findOne({ user: req.params.userId }).populate('items.product', 'name price seller');
    if (!cart) {
      return res.json({ items: [], totalPrice: 0 });
    }
    return res.json(cart);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add item to cart
router.post('/:userId/add', async (req, res) => {
  if (!ensureOwner(req, res)) return;

  try {
    const { productId, quantity = 1 } = req.body;
    const qty = Number(quantity);

    if (!productId || Number.isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: 'productId and positive quantity are required' });
    }

    const product = await Product.findOne({ _id: productId, isActive: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or inactive' });
    }

    let cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) {
      cart = new Cart({ user: req.params.userId, items: [] });
    }

    const existing = cart.items.find((item) => item.product.toString() === productId);
    if (existing) {
      existing.quantity += qty;
      existing.price = product.price;
    } else {
      cart.items.push({ product: productId, quantity: qty, price: product.price });
    }

    recalcTotals(cart);
    await cart.save();
    await cart.populate('items.product', 'name price seller');

    return res.status(201).json(cart);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update cart item quantity
router.put('/:userId/update/:productId', async (req, res) => {
  if (!ensureOwner(req, res)) return;

  try {
    const { quantity } = req.body;
    const qty = Number(quantity);

    if (Number.isNaN(qty)) {
      return res.status(400).json({ message: 'Quantity is required' });
    }

    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find((i) => i.product.toString() === req.params.productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (qty <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    } else {
      item.quantity = qty;
    }

    recalcTotals(cart);
    await cart.save();
    await cart.populate('items.product', 'name price seller');

    return res.json(cart);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove item from cart
router.delete('/:userId/remove/:productId', async (req, res) => {
  if (!ensureOwner(req, res)) return;

  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const before = cart.items.length;
    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);

    if (cart.items.length === before) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    recalcTotals(cart);
    await cart.save();
    await cart.populate('items.product', 'name price seller');

    return res.json(cart);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
