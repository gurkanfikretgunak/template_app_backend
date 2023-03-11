// PACKAGES
const express = require('express');
const router = express.Router();

// ROUTES
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const shopRoutes = require('./shop.routes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/shop', shopRoutes);

module.exports = router;