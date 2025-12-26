const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const auth = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', auth, require('./routes/cart'));
app.use('/api/orders', auth, require('./routes/orders'));
app.use('/api/users', auth, require('./routes/users'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Mask MongoDB URI for safe logging (hide password)
const maskMongoUri = (uri) => {
  if (!uri) return '';
  try {
    return uri.replace(/(mongodb\+srv:\/\/[^:]+):([^@]+)@/, (_, userPart) => `${userPart}:****@`);
  } catch {
    return '[invalid URI]';
  }
};

const start = async () => {
  if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI. Set it in your environment to start the server.');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...', maskMongoUri(MONGODB_URI));
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server');
    console.error('Error name:', err.name);
    if (err.reason) console.error('Reason:', err.reason);
    console.error('Message:', err.message);
    process.exit(1);
  }
};

start();

const gracefulShutdown = async () => {
  await mongoose.connection.close();
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
