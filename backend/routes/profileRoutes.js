const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');

// GET /api/profile - Get profile info
router.get('/', getProfile);

// PUT /api/profile - Update profile (Admin)
router.put('/', updateProfile);

module.exports = router;
