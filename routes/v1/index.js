// PACKAGES
const express = require('express');
const router = express.Router();

// ROUTES
const authRoutes = require('./auth.routes');

router.use('/auth', authRoutes);

module.exports = router;