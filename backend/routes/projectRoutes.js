const express = require('express');
const router = express.Router();
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');

// GET /api/projects - Get all projects (with optional query filters)
router.get('/', getProjects);

// GET /api/projects/:id - Get single project
router.get('/:id', getProjectById);

// POST /api/projects - Create project (Admin)
router.post('/', createProject);

// PUT /api/projects/:id - Update project (Admin)
router.put('/:id', updateProject);

// DELETE /api/projects/:id - Delete project (Admin)
router.delete('/:id', deleteProject);

module.exports = router;
