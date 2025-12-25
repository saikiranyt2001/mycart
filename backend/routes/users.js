const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');

const ensureOwner = (req, res) => {
  if (req.userId !== req.params.userId) {
    res.status(403).json({ message: 'Not authorized for this profile' });
    return false;
  }
  return true;
};

// Get user profile
router.get('/:userId', async (req, res) => {
  if (!ensureOwner(req, res)) return;

  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/:userId/update', async (req, res) => {
  if (!ensureOwner(req, res)) return;

  try {
    const {
      name,
      phone,
      companyName,
      businessType,
      address,
      newPassword
    } = req.body;

    const updates = {};
    if (name) updates.name = name.trim();
    if (phone) updates.phone = phone.trim();
    if (companyName) updates.companyName = companyName.trim();
    if (address) updates.address = address;

    const allowedBusinessTypes = ['B2B', 'Retailer', 'Distributor', 'Individual'];
    if (businessType) {
      if (!allowedBusinessTypes.includes(businessType)) {
        return res.status(400).json({ message: 'Invalid business type' });
      }
      updates.businessType = businessType;
    }

    if (newPassword) {
      if (newPassword.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(newPassword, salt);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided to update' });
    }

    updates.updatedAt = new Date();

    const user = await User.findByIdAndUpdate(req.params.userId, updates, {
      new: true,
      runValidators: true
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
