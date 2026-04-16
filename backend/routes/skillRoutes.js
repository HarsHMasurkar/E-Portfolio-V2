const express = require('express');
const router = express.Router();
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');

// GET /api/skills - Get all skills
router.get('/', getSkills);

// POST /api/skills - Create skill (Admin)
router.post('/', createSkill);

// PUT /api/skills/:id - Update skill (Admin)
router.put('/:id', updateSkill);

// DELETE /api/skills/:id - Delete skill (Admin)
router.delete('/:id', deleteSkill);

module.exports = router;
