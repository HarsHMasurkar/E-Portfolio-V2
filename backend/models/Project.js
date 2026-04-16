/**
 * Project Model
 * Represents a portfolio project with all relevant details
 */

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: [200, 'Short description cannot exceed 200 characters'],
  },
  technologies: [{
    type: String,
    trim: true,
  }],
  imageUrl: {
    type: String,
    default: '',
  },
  liveUrl: {
    type: String,
    default: '',
  },
  githubUrl: {
    type: String,
    default: '',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    enum: ['Web', 'Mobile', 'AI/ML', 'Game', 'Other'],
    default: 'Web',
  },
  order: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed',
  },
}, { timestamps: true });

// Index for faster queries
projectSchema.index({ featured: -1, order: 1 });

module.exports = mongoose.model('Project', projectSchema);
