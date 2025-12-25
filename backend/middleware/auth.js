const jwt = require('jsonwebtoken');

// Simple JWT authentication middleware
module.exports = (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server configuration error: missing JWT secret' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    return next();
  } catch (err) {
    const status = err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError' ? 401 : 500;
    return res.status(status).json({ message: 'Invalid or expired token' });
  }
};
