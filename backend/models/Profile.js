/**
 * Profile Model
 * Stores personal information and bio for the portfolio owner
 */

const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, default: '' },
  technologies: [{ type: String }],
  current: { type: Boolean, default: false },
}, { _id: false });

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  resumeUrl: {
    type: String,
    default: '',
  },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    website: { type: String, default: '' },
  },
  experience: [experienceSchema],
  availableForWork: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
