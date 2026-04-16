/**
 * Profile Controller
 * Handles personal/about information retrieval
 */

const Profile = require('../models/Profile');

// @desc    Get profile info
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res) => {
  try {
    // Get the first (and only) profile document
    let profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        error: 'Profile not found. Please seed the database.' 
      });
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
};

// @desc    Update profile
// @route   PUT /api/profile
// @access  Private (Admin)
const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = new Profile(req.body);
      await profile.save();
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { getProfile, updateProfile };
