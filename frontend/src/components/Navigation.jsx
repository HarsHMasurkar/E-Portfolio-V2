/**
 * Navigation Component
 * Floating HUD-style top navigation bar
 */

import { motion } from 'framer-motion';
import { usePortfolioStore } from '../store/portfolioStore';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const Navigation = () => {
  const { setActiveSection, activeSection, soundEnabled, toggleSound } = usePortfolioStore();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, type: 'spring' }}
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        background: 'rgba(13, 17, 23, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(0, 255, 255, 0.15)',
        borderRadius: '100px',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: '14px',
          marginRight: '16px',
          background: 'linear-gradient(135deg, #00ffff, #7b00ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '2px',
        }}
      >
        HM
      </span>

      {/* Nav Items */}
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          style={{
            padding: '6px 16px',
            borderRadius: '100px',
            border: 'none',
            background: activeSection === item.id
              ? 'linear-gradient(135deg, rgba(0,255,255,0.2), rgba(123,0,255,0.2))'
              : 'transparent',
            color: activeSection === item.id
              ? 'var(--color-neon-cyan)'
              : 'var(--color-text-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            borderBottom: activeSection === item.id ? '1px solid var(--color-neon-cyan)' : '1px solid transparent',
          }}
          onMouseEnter={(e) => {
            if (activeSection !== item.id) {
              e.target.style.color = 'var(--color-text-primary)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeSection !== item.id) {
              e.target.style.color = 'var(--color-text-secondary)';
            }
          }}
        >
          {item.label}
        </button>
      ))}

      {/* Sound Toggle */}
      <button
        onClick={toggleSound}
        title={soundEnabled ? 'Mute' : 'Unmute'}
        style={{
          marginLeft: '12px',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 255, 255, 0.2)',
          background: 'transparent',
          color: soundEnabled ? 'var(--color-neon-cyan)' : 'var(--color-text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          transition: 'all 0.2s ease',
        }}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>
    </motion.nav>
  );
};

export default Navigation;
