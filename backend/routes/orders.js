const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');

const ensureOwner = (req, res) => {
  if (req.userId !== req.params.userId) {
    res.status(403).json({ message: 'Not authorized for these orders' });
    return false;
  }
  return true;
};

// List orders for a user
router.get('/:userId', async (req, res) => {
  if (!ensureOwner(req, res)) return;

  try {
    const orders = await Order.find({ user: req.params.userId })
      .sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create an order from the user's cart
router.post('/:userId/create', async (req, res) => {
  if (!ensureOwner(req, res)) return;

  try {
    const { paymentMethod, shippingAddress = {} } = req.body;

    const allowedPaymentMethods = ['Credit Card', 'Debit Card', 'UPI', 'Bank Transfer', 'Wallet'];
    if (!paymentMethod || !allowedPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({ message: 'Valid paymentMethod is required' });
    }

    const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product', 'seller');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalFromCart = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    cart.totalPrice = totalFromCart;

    const order = new Order({
      orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      user: req.params.userId,
      items: cart.items.map((item) => ({
        product: item.product._id || item.product,
        quantity: item.quantity,
        price: item.price,
        seller: item.product.seller
      })),
      totalAmount: totalFromCart,
      paymentMethod,
      paymentStatus: 'Pending',
      shippingAddress,
      status: 'Pending'
    });

    await order.save();

    cart.items = [];
    cart.totalPrice = 0;
    cart.updatedAt = new Date();
    await cart.save();

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get specific order details
router.get('/:userId/:orderId', async (req, res) => {
  if (!ensureOwner(req, res)) return;

  try {
    const order = await Order.findOne({ _id: req.params.orderId, user: req.params.userId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
