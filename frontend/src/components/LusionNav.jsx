/**
 * LusionNav — Lusion-inspired navigation
 * Top-left logo | Top-right: "LET'S TALK" + "MENU" with fullscreen overlay
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../store/portfolioStore';

const NAV_SECTIONS = [
  { id: 'about', label: 'About', num: '01' },
  { id: 'skills', label: 'Skills', num: '02' },
  { id: 'projects', label: 'Projects', num: '03' },
  { id: 'experience', label: 'Experience', num: '04' },
  { id: 'contact', label: 'Contact', num: '05' },
];

const LusionNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setActiveSection } = usePortfolioStore();

  const handleNav = (id) => {
    setMenuOpen(false);
    setTimeout(() => setActiveSection(id), 300);
  };

  return (
    <>
      {/* ── Fixed Top Bar ── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '28px 40px',
          pointerEvents: 'auto',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => { setMenuOpen(false); }}
          style={{
            background: 'none', border: 'none', padding: 0,
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 800,
            fontSize: '15px',
            letterSpacing: '4px',
            color: '#fff',
            textTransform: 'uppercase',
          }}
          data-hover
        >
          HM
        </button>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Let's Talk */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNav('contact')}
            data-hover
            style={{
              padding: '10px 24px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '100px',
              color: '#fff',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '1px',
              display: 'flex', alignItems: 'center', gap: '8px',
              backdropFilter: 'blur(10px)',
            }}
          >
            LET'S TALK
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#00ff9f',
              boxShadow: '0 0 6px #00ff9f',
            }} />
          </motion.button>

          {/* Menu toggle */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setMenuOpen((v) => !v)}
            data-hover
            style={{
              padding: '10px 20px',
              background: menuOpen ? '#fff' : 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '100px',
              color: menuOpen ? '#080808' : '#fff',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '1px',
              display: 'flex', alignItems: 'center', gap: '10px',
              backdropFilter: 'blur(10px)',
              transition: 'background 0.3s, color 0.3s',
            }}
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
            <span style={{ display: 'flex', flexDirection: 'column', gap: '3.5px' }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  display: 'block', width: '16px', height: '1.5px',
                  background: menuOpen ? '#080808' : '#fff',
                  borderRadius: '2px',
                  transition: 'background 0.3s',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translateY(5px)'
                      : i === 2 ? 'rotate(-45deg) translateY(-5px)'
                        : 'scaleX(0)'
                    : 'none',
                }} />
              ))}
            </span>
          </motion.button>
        </div>
      </motion.header>

      {/* ── Fullscreen Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Menu header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: 'auto', paddingTop: '80px',
            }}>
              <span className="lusion-tag">
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00ff9f' }} />
                Portfolio · 2024
              </span>
            </div>

            {/* Nav items */}
            <nav style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <hr className="lusion-rule" style={{ marginBottom: '0' }} />
              {NAV_SECTIONS.map((item, i) => (
                <div key={item.id}>
                  <motion.button
                    onClick={() => handleNav(item.id)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    data-hover
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '20px 0',
                      background: 'none', border: 'none',
                      color: '#fff',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.querySelector('.mlabel').style.color = 'rgba(255,255,255,0.3)';
                      e.currentTarget.querySelector('.mnum').style.color = 'rgba(255,255,255,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.querySelector('.mlabel').style.color = '#fff';
                      e.currentTarget.querySelector('.mnum').style.color = 'rgba(255,255,255,0.3)';
                    }}
                  >
                    <span
                      className="mlabel"
                      style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 800,
                        fontSize: 'clamp(2.8rem, 6vw, 6rem)',
                        lineHeight: 1,
                        color: '#fff',
                        transition: 'color 0.25s ease',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="mnum"
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.3)',
                        letterSpacing: '2px',
                        transition: 'color 0.25s ease',
                      }}
                    >
                      {item.num}
                    </span>
                  </motion.button>
                  <hr className="lusion-rule" />
                </div>
              ))}
            </nav>

            {/* Footer strip */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'flex-end', paddingTop: '32px',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px', letterSpacing: '2px',
              color: 'rgba(255,255,255,0.25)',
            }}>
              <span>GOA, INDIA</span>
              <span>FULL STACK · ML ENGINEER</span>
              <span>masurkarharsh22@gmail.com</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LusionNav;
