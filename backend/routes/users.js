const express = require('express');
const router = express.Router();

// User endpoints
router.get('/:userId', (req, res) => {
  res.json({ message: 'Get user profile' });
});

router.put('/:userId/update', (req, res) => {
  res.json({ message: 'Update user profile' });
});

module.exports = router;
