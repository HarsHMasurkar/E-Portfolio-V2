/**
 * LusionHero Component
 * Lusion-inspired cinematic splash page
 */

import { motion } from 'framer-motion';

const LusionHero = () => {
  // Split text for animation
  const title1 = "HARSH".split(' ');
  const title2 = "MASURKAR".split(' ');
  const title3 = "ENGINEER.".split(' ');

  const renderWords = (words, delayOffset = 0) => (
    words.map((word, i) => (
      <span key={i} style={{ display: 'inline-block', marginRight: '0.25em' }}>
        <span className="word-reveal" style={{ '--delay': `${delayOffset + i * 0.1}s` } }>
          {word}
        </span>
      </span>
    ))
  );

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '0 4vw',
      }}
    >
      {/* ── Background Elements (Lusion-style floating shapes/ambient) ── */}
      <div style={{
        position: 'absolute', top: '10%', left: '20%',
        width: '50vw', height: '50vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,255,0.06) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '10%',
        width: '40vw', height: '40vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,0,255,0.06) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      {/* ── Top small intro text ── */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '2rem',
          zIndex: 10,
        }}
      >
        PORTFOLIO OF A FULL STACK ENGINEER
      </motion.p>

      {/* ── Massive Display Text ── */}
      <div style={{ textAlign: 'center', zIndex: 10, position: 'relative' }}>
        {/* Layer 1: Solid Text */}
        <h1 className="hero-display" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ overflow: 'hidden' }}>
            {renderWords(title1, 0.2)}
          </div>
          <div style={{ overflow: 'hidden' }}>
            {renderWords(title2, 0.4)}
          </div>
          <div style={{ overflow: 'hidden' }}>
            {renderWords(title3, 0.6)}
          </div>
        </h1>

        {/* Layer 2: Outline Text (Offset effect on hover/move if wanted) */}
        <h1 className="hero-display-outline" style={{
          position: 'absolute', top: 3, left: -3, zIndex: 1, pointerEvents: 'none',
          opacity: 0.5
        }}>
          <div>{title1.join(' ')}</div>
          <div>{title2.join(' ')}</div>
          <div>{title3.join(' ')}</div>
        </h1>
      </div>

      {/* ── Scroll Pill ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '8vh',
          zIndex: 10,
        }}
      >
        <button
          data-hover
          style={{
            padding: '12px 32px',
            background: '#fff',
            border: 'none',
            borderRadius: '100px',
            color: '#080808',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700,
            fontSize: '11px',
            letterSpacing: '2px',
            display: 'flex', alignItems: 'center', gap: '16px',
            cursor: 'none',
            boxShadow: '0 10px 40px rgba(255,255,255,0.1)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <span>↓</span> CONTINUE TO SCROLL <span>↓</span>
        </button>
      </motion.div>

      {/* ── Decoration pluses ── */}
      {[{ top: '30%', left: '15%' }, { top: '70%', right: '15%' }].map((pos, i) => (
        <span key={i} style={{
          position: 'absolute',
          color: 'rgba(255,255,255,0.2)',
          fontSize: '20px',
          fontFamily: 'JetBrains Mono',
          pointerEvents: 'none',
          ...pos
        }}>
          +
        </span>
      ))}
    </div>
  );
};

export default LusionHero;
