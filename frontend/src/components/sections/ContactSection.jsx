/**
 * ContactSection Component
 * Ultra-minimalist contact form with Lusion style typography
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactAPI } from '../../services/api';
import { usePortfolioStore } from '../../store/portfolioStore';

const ContactSection = ({ accentColor }) => {
  const { playSound, profile } = usePortfolioStore();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const contactData = profile || {
    email: 'masurkarharsh22@gmail.com',
    location: 'Goa, India',
    socialLinks: {
      github: 'https://github.com/HarsHMasurkar',
      linkedin: 'https://www.linkedin.com/in/harsh-masurkar-86712728b/',
    }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setMessage('Please fill in all required fields.');
      return;
    }

    setStatus('loading');
    try {
      await contactAPI.submit(form);
      setStatus('success');
      setMessage(`Message sent successfully. I will be in touch soon.`);
      playSound('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Failed to send. Please try again.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const inputStyle = {
    width: '100%',
    padding: '20px 0',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 0,
    color: '#fff',
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: 'clamp(1rem, 2vw, 1.5rem)',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '11px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '16px'
        }}>
          GET IN TOUCH
        </div>
        <h2 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          fontWeight: 800,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          margin: 0,
          color: '#fff'
        }}>
          Let's Start a <span style={{ color: accentColor }}>Project</span>
        </h2>
      </motion.div>

      <hr className="lusion-rule" />

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(300px, 1fr)', gap: '60px' }}>
        
        {/* Contact Info (Left) */}
        <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '18px',
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.7)',
            fontWeight: 300,
          }}>
            I'm currently available for work. Whether you have a project to discuss or just want to say hi, my inbox is open.
          </p>

          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', marginBottom: '8px' }}>EMAIL</div>
            <a href={`mailto:${contactData.email}`} data-hover style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: 600, color: '#fff', textDecoration: 'none' }}>
              {contactData.email}
            </a>
          </div>

          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', marginBottom: '8px' }}>LOCATION</div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '20px', color: '#fff' }}>
              {contactData.location}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', marginBottom: '12px' }}>SOCIAL</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              {Object.entries(contactData.socialLinks || {}).map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" data-hover style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '16px', color: '#fff', textTransform: 'capitalize', textDecoration: 'none',
                  borderBottom: `1px solid ${accentColor}40`, paddingBottom: '2px'
                }}>
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Form (Right) */}
        <motion.div variants={itemVariants}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = accentColor}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
              />
            </div>
            <div>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email address?"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = accentColor}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
              />
            </div>
            <div>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject?"
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = accentColor}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
              />
            </div>
            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={(e) => e.target.style.borderColor = accentColor}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
              />
            </div>

            <AnimatePresence>
              {status !== 'idle' && message && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                    color: status === 'success' ? '#00ff9f' : '#ff6464',
                    letterSpacing: '1px'
                  }}
                >
                  {message}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={status === 'loading'}
              data-hover
              style={{
                alignSelf: 'flex-start',
                marginTop: '10px',
                padding: '16px 40px',
                background: '#fff',
                border: 'none',
                borderRadius: '100px',
                color: '#080808',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '2px',
                cursor: 'none',
                opacity: status === 'loading' ? 0.7 : 1,
                transition: 'transform 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ContactSection;
