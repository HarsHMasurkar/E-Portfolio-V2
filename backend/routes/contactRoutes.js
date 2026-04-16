const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitContact, getContacts } = require('../controllers/contactController');

// Validation rules for contact form
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name too long'),
  body('email')
    .trim()
    .isEmail().withMessage('Valid email required')
    .normalizeEmail(),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 2000 }).withMessage('Message too long'),
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Subject too long'),
];

// POST /api/contact - Submit contact form
router.post('/', contactValidation, submitContact);

// GET /api/contact - Get all submissions (Admin only)
router.get('/', getContacts);

module.exports = router;
