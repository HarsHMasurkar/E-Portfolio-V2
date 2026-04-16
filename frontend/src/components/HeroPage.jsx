/**
 * HeroPage Component
 * Main landing page with clickable section cards
 */

import { motion } from 'framer-motion';
import { usePortfolioStore } from '../store/portfolioStore';

const NAV_CARDS = [
  {
    id: 'about',
    icon: '👤',
    label: 'About Me',
    desc: 'Who I am, my story & values',
    color: '#00ffff',
    bg: 'rgba(0,255,255,0.06)',
  },
  {
    id: 'skills',
    icon: '⚡',
    label: 'Skills',
    desc: 'Tech stack & expertise',
    color: '#7b00ff',
    bg: 'rgba(123,0,255,0.06)',
  },
  {
    id: 'projects',
    icon: '🗂️',
    label: 'Projects',
    desc: 'Work I\'ve built & shipped',
    color: '#ff007a',
    bg: 'rgba(255,0,122,0.06)',
  },
  {
    id: 'experience',
    icon: '💼',
    label: 'Experience',
    desc: 'My professional journey',
    color: '#00ff9f',
    bg: 'rgba(0,255,159,0.06)',
  },
  {
    id: 'contact',
    icon: '✉️',
    label: 'Contact',
    desc: 'Let\'s work together',
    color: '#ffaa00',
    bg: 'rgba(255,170,0,0.06)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 180, damping: 20 } },
};

const HeroPage = () => {
  const { setActiveSection } = usePortfolioStore();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '15%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,255,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '10%',
        width: '350px', height: '350px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,0,255,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '50%', right: '20%',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,0,122,0.06) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      {/* ── Hero Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 18px',
            background: 'rgba(0,255,159,0.08)',
            border: '1px solid rgba(0,255,159,0.3)',
            borderRadius: '100px',
            marginBottom: '24px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '2px',
            color: '#00ff9f',
          }}
        >
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#00ff9f',
            boxShadow: '0 0 8px #00ff9f',
            animation: 'pulseGlowCyan 2s infinite',
          }} />
          AVAILABLE FOR WORK
        </motion.div>

        {/* Name */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '-1px',
            lineHeight: 1.05,
            marginBottom: '16px',
          }}
        >
          <span className="text-gradient-cyan-purple">HARSH</span>
          <br />
          <span style={{ color: 'var(--color-text-primary)' }}>MASURKAR</span>
        </h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            letterSpacing: '4px',
            color: 'var(--color-text-secondary)',
            marginBottom: '12px',
          }}
        >
          FULL STACK DEVELOPER  ·  ML ENGINEER  ·  MERN STACK
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: '16px',
            color: 'rgba(136,146,176,0.7)',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          Building immersive digital experiences with modern web technologies and machine learning.
        </motion.p>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity, repeatDelay: 1 }}
          style={{
            marginTop: '28px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '3px',
            color: 'var(--color-neon-cyan)',
          }}
        >
          ↓ EXPLORE SECTIONS BELOW
        </motion.p>
      </motion.div>

      {/* ── Section Cards Grid ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        {NAV_CARDS.map((card) => (
          <motion.button
            key={card.id}
            variants={cardVariants}
            onClick={() => setActiveSection(card.id)}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: card.bg,
              border: `1px solid ${card.color}25`,
              borderRadius: '16px',
              padding: '28px 20px',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              transition: 'border-color 0.25s, box-shadow 0.25s',
              outline: 'none',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${card.color}60`;
              e.currentTarget.style.boxShadow = `0 8px 32px ${card.color}18, 0 0 0 1px ${card.color}20`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${card.color}25`;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Top gradient accent */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: `linear-gradient(90deg, transparent, ${card.color}80, transparent)`,
              opacity: 0.7,
            }} />

            {/* Icon */}
            <div style={{
              fontSize: '28px',
              width: '48px', height: '48px',
              background: `${card.color}12`,
              border: `1px solid ${card.color}25`,
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {card.icon}
            </div>

            {/* Label */}
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '17px',
              color: card.color,
              letterSpacing: '0.5px',
            }}>
              {card.label}
            </div>

            {/* Description */}
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.5,
            }}>
              {card.desc}
            </div>

            {/* Arrow */}
            <div style={{
              position: 'absolute', bottom: '16px', right: '16px',
              fontSize: '16px', color: `${card.color}60`,
              fontFamily: 'var(--font-mono)',
            }}>
              →
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* ── Footer strip ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          marginTop: '60px',
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '2px',
          color: 'rgba(136,146,176,0.35)',
        }}
      >
        {['REACT', 'NODE.JS', 'PYTHON', 'MONGODB', 'ML / AI'].map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroPage;
