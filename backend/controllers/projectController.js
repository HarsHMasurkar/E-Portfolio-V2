/**
 * Project Controller
 * Handles all project-related CRUD operations
 */

const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const { category, featured, limit } = req.query;
    
    let filter = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    let query = Project.find(filter).sort({ featured: -1, order: 1, createdAt: -1 });
    
    if (limit) query = query.limit(parseInt(limit));

    const projects = await query.exec();
    
    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error('Get Projects Error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch projects' });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Get Project Error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch project' });
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('Create Project Error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    console.error('Update Project Error:', error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete Project Error:', error);
    res.status(500).json({ success: false, error: 'Failed to delete project' });
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
