// PACKAGES
const express = require('express');
const router = express.Router();

// ROUTES
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;