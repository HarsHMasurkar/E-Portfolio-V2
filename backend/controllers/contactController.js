/**
 * Contact Controller
 * Handles contact form submissions with email notification
 */

const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { createTransporter } = require('../config/email');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Save to database
    const contact = await Contact.create({
      name,
      email,
      subject: subject || 'Portfolio Inquiry',
      message,
      ipAddress: req.ip,
    });

    // Send email notification
    try {
      const transporter = createTransporter();
      
      // Email to portfolio owner
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `[Portfolio] New Message: ${subject || 'Portfolio Inquiry'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #00ffff, #7b00ff); padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; color: #000;">New Portfolio Message</h1>
            </div>
            <div style="padding: 30px;">
              <p><strong style="color: #00ffff;">From:</strong> ${name} (${email})</p>
              <p><strong style="color: #00ffff;">Subject:</strong> ${subject || 'Portfolio Inquiry'}</p>
              <div style="background: #1a1a2e; border-left: 4px solid #00ffff; padding: 20px; border-radius: 0 8px 8px 0; margin: 20px 0;">
                <p style="margin: 0; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              <p style="color: #666; font-size: 12px;">Received at ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      });

      // Auto-reply to sender
      await transporter.sendMail({
        from: `"Harsh Masurkar" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Thanks for reaching out, ${name}!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #00ffff, #7b00ff); padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; color: #000;">Thank You! 🚀</h1>
            </div>
            <div style="padding: 30px;">
              <p>Hi <strong>${name}</strong>,</p>
              <p>Thank you for reaching out through my portfolio. I've received your message and will get back to you within 24-48 hours.</p>
              <div style="background: #1a1a2e; border-left: 4px solid #7b00ff; padding: 20px; border-radius: 0 8px 8px 0; margin: 20px 0;">
                <p style="margin: 0; font-style: italic; color: #aaa;">"${message.substring(0, 100)}${message.length > 100 ? '...' : ''}"</p>
              </div>
              <p>Best regards,<br><strong style="color: #00ffff;">Harsh Masurkar</strong></p>
            </div>
          </div>
        `,
      });
    } catch (emailError) {
      // Email failure is non-critical — log but don't fail the request
      console.error('Email sending failed:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you soon.',
      data: { id: contact._id, name, email },
    });
  } catch (error) {
    console.error('Contact Submit Error:', error);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
};

// @desc    Get all contact submissions (Admin)
// @route   GET /api/contact
// @access  Private
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch contacts' });
  }
};

module.exports = { submitContact, getContacts };
