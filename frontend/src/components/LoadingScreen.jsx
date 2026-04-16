/**
 * LoadingScreen Component
 * Animated document/profile loading screen for Harsh Masurkar
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_STEPS = [
  { label: 'Fetching profile data...', icon: '👤' },
  { label: 'Compiling projects...', icon: '🗂️' },
  { label: 'Loading experience...', icon: '💼' },
  { label: 'Preparing portfolio...', icon: '✨' },
];

const LoadingScreen = ({ progress = 0 }) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const step = Math.min(
      Math.floor((progress / 100) * LOADING_STEPS.length),
      LOADING_STEPS.length - 1
    );
    setStepIndex(step);
  }, [progress]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'var(--color-bg-primary)' }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {/* Subtle holographic grid */}
      <div className="absolute inset-0 holographic-grid opacity-20" />

      {/* Ambient glow blobs */}
      <div style={{
        position: 'absolute',
        top: '15%', left: '10%',
        width: '340px', height: '340px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,0,255,0.12) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%', right: '10%',
        width: '280px', height: '280px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,255,0.10) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />

      {/* ── Document Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
        style={{
          position: 'relative',
          width: 'min(92vw, 480px)',
          background: 'rgba(13, 17, 23, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0,255,255,0.18)',
          borderRadius: '20px',
          padding: '40px 36px 36px',
          boxShadow: '0 4px 60px rgba(0,0,0,0.5), 0 0 40px rgba(123,0,255,0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Gradient top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, var(--color-neon-cyan), var(--color-neon-purple), var(--color-neon-pink))',
          borderRadius: '20px 20px 0 0',
        }} />

        {/* Document corner marks */}
        {[
          { top: '14px', left: '14px', borderTop: '2px solid', borderLeft: '2px solid' },
          { top: '14px', right: '14px', borderTop: '2px solid', borderRight: '2px solid' },
          { bottom: '14px', left: '14px', borderBottom: '2px solid', borderLeft: '2px solid' },
          { bottom: '14px', right: '14px', borderBottom: '2px solid', borderRight: '2px solid' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            style={{
              position: 'absolute', width: '14px', height: '14px',
              borderColor: 'rgba(0,255,255,0.35)',
              ...s,
            }}
          />
        ))}

        {/* ── Avatar / Initials ── */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 18 }}
          style={{
            width: '72px', height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-neon-cyan) 0%, var(--color-neon-purple) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', fontWeight: 800,
            fontFamily: 'var(--font-display)',
            color: '#030712',
            margin: '0 auto 20px',
            boxShadow: '0 0 24px rgba(0,255,255,0.35), 0 0 48px rgba(123,0,255,0.2)',
            letterSpacing: '-1px',
          }}
        >
          HM
        </motion.div>

        {/* ── Name ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '6px' }}
        >
          <h1
            className="text-gradient-cyan-purple"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              fontWeight: 800,
              letterSpacing: '2px',
              margin: 0,
            }}
          >
            HARSH MASURKAR
          </h1>
        </motion.div>

        {/* ── Role tag ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '28px' }}
        >
          <span className="section-badge" style={{ fontSize: '11px', letterSpacing: '3px' }}>
            <span>◈</span> Full Stack Developer &amp; ML Engineer
          </span>
        </motion.div>

        {/* ── Document meta rows ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          style={{
            display: 'flex', flexDirection: 'column', gap: '10px',
            marginBottom: '28px',
            padding: '16px',
            background: 'rgba(0,255,255,0.03)',
            border: '1px solid rgba(0,255,255,0.08)',
            borderRadius: '12px',
          }}
        >
          {[
            { icon: '📍', label: 'Location', value: 'Goa, India' },
            { icon: '🎓', label: 'Degree', value: 'B.E. Computer Engineering' },
            { icon: '🛠️', label: 'Stack', value: 'MERN · Python · ML · Three.js' },
          ].map(({ icon, label, value }, i) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              fontFamily: 'var(--font-mono)', fontSize: '12px',
            }}>
              <span style={{ fontSize: '14px' }}>{icon}</span>
              <span style={{ color: 'var(--color-text-secondary)', minWidth: '64px' }}>{label}</span>
              <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Loading steps ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ marginBottom: '18px', minHeight: '24px', textAlign: 'center' }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.5px',
              }}
            >
              {LOADING_STEPS[stepIndex].icon}&nbsp; {LOADING_STEPS[stepIndex].label}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* ── Progress bar ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{ transformOrigin: 'left' }}
        >
          <div style={{
            width: '100%', height: '4px',
            borderRadius: '100px',
            background: 'rgba(255,255,255,0.06)',
            overflow: 'hidden',
            marginBottom: '10px',
          }}>
            <motion.div
              style={{
                height: '100%',
                borderRadius: '100px',
                background: 'linear-gradient(90deg, var(--color-neon-cyan), var(--color-neon-purple))',
                width: `${Math.min(progress, 100)}%`,
                transition: 'width 0.35s ease',
                boxShadow: '0 0 12px rgba(0,255,255,0.5)',
              }}
            />
          </div>

          {/* Progress label */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: 'rgba(136,146,176,0.5)',
            letterSpacing: '1px',
          }}>
            <span>LOADING PORTFOLIO</span>
            <motion.span
              style={{ color: 'var(--color-neon-cyan)', fontWeight: 700 }}
            >
              {Math.round(Math.min(progress, 100))}%
            </motion.span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
