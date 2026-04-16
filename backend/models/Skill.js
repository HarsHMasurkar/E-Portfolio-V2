/**
 * Skill Model
 * Represents a technical skill with proficiency level and category
 */

const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    unique: true,
  },
  level: {
    type: Number,
    required: true,
    min: [0, 'Level must be at least 0'],
    max: [100, 'Level cannot exceed 100'],
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Languages', 'Tools', 'Other'],
  },
  icon: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#00ffff',
  },
  order: {
    type: Number,
    default: 0,
  },
  yearsOfExperience: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

skillSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Skill', skillSchema);
