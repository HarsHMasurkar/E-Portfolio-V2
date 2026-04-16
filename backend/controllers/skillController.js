/**
 * Skill Controller
 * Handles skill data retrieval and management
 */

const Skill = require('../models/Skill');

// @desc    Get all skills (grouped by category)
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res) => {
  try {
    const { category } = req.query;
    
    let filter = {};
    if (category) filter.category = category;

    const skills = await Skill.find(filter).sort({ category: 1, order: 1, level: -1 });

    // Group skills by category for easy frontend use
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json({
      success: true,
      count: skills.length,
      data: skills,
      grouped,
    });
  } catch (error) {
    console.error('Get Skills Error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch skills' });
  }
};

// @desc    Create a new skill
// @route   POST /api/skills
// @access  Private (Admin)
const createSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    const saved = await skill.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('Create Skill Error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private (Admin)
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return res.status(404).json({ success: false, error: 'Skill not found' });
    }

    res.json({ success: true, data: skill });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
const deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
