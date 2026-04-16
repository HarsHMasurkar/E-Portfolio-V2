/**
 * SectionPage Component
 * Full-page view for each portfolio section
 * Replaces the modal overlay — renders sections as full scrollable pages
 */

import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../../store/portfolioStore';
import AboutSection from './AboutSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ExperienceSection from './ExperienceSection';
import ContactSection from './ContactSection';

const SECTION_COMPONENTS = {
  about: AboutSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  experience: ExperienceSection,
  contact: ContactSection,
};

const SECTION_META = {
  about:      { color: '#00ffff', label: 'About Me',    icon: '👤' },
  skills:     { color: '#7b00ff', label: 'Skills',      icon: '⚡' },
  projects:   { color: '#ff007a', label: 'Projects',    icon: '🗂️' },
  experience: { color: '#00ff9f', label: 'Experience',  icon: '💼' },
  contact:    { color: '#ffaa00', label: 'Contact',     icon: '✉️' },
};

const SECTION_ORDER = ['about', 'skills', 'projects', 'experience', 'contact'];

const SectionPage = () => {
  const { activeSection, closeSection, setActiveSection } = usePortfolioStore();
  const SectionComponent = activeSection ? SECTION_COMPONENTS[activeSection] : null;
  const meta = activeSection ? SECTION_META[activeSection] : null;

  const currentIndex = SECTION_ORDER.indexOf(activeSection);
  const prevSection = currentIndex > 0 ? SECTION_ORDER[currentIndex - 1] : null;
  const nextSection = currentIndex < SECTION_ORDER.length - 1 ? SECTION_ORDER[currentIndex + 1] : null;

  return (
    <AnimatePresence mode="wait">
      {activeSection && SectionComponent && (
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'var(--color-bg-primary)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* ── Top accent bar ── */}
          <div style={{
            height: '3px',
            background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)`,
            flexShrink: 0,
          }} />

          {/* ── Header bar ── */}
          <div style={{
            position: 'sticky', top: 0, zIndex: 10,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: `1px solid ${meta.color}20`,
            padding: '14px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexShrink: 0,
          }}>
            {/* Back button */}
            <motion.button
              whileHover={{ x: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeSection}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 16px',
                background: 'transparent',
                border: `1px solid ${meta.color}30`,
                borderRadius: '100px',
                color: meta.color,
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                cursor: 'pointer',
                letterSpacing: '1px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${meta.color}15`;
                e.currentTarget.style.borderColor = meta.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = `${meta.color}30`;
              }}
            >
              ← BACK
            </motion.button>

            {/* Logo */}
            <div style={{
              marginLeft: '8px',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '14px',
              background: 'linear-gradient(135deg, #00ffff, #7b00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '2px',
            }}>
              HM
            </div>

            {/* Breadcrumb */}
            <span style={{
              color: 'rgba(136,146,176,0.4)',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
            }}>
              /
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{meta.icon}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: meta.color,
                letterSpacing: '2px',
              }}>
                {meta.label.toUpperCase()}
              </span>
            </div>

            {/* Right side: section tabs */}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {SECTION_ORDER.map((id) => {
                const m = SECTION_META[id];
                const isActive = id === activeSection;
                return (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    style={{
                      padding: '5px 14px',
                      borderRadius: '100px',
                      border: isActive ? `1px solid ${m.color}60` : '1px solid transparent',
                      background: isActive ? `${m.color}12` : 'transparent',
                      color: isActive ? m.color : 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'var(--color-text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = 'var(--color-text-secondary)';
                    }}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Section Content ── */}
          <div style={{
            flex: 1,
            maxWidth: '960px',
            width: '100%',
            margin: '0 auto',
            padding: '48px 32px 80px',
          }}>
            <SectionComponent accentColor={meta.color} />
          </div>

          {/* ── Prev / Next navigation ── */}
          <div style={{
            borderTop: '1px solid rgba(0,255,255,0.08)',
            padding: '20px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '960px',
            width: '100%',
            margin: '0 auto',
            flexShrink: 0,
          }}>
            {prevSection ? (
              <motion.button
                whileHover={{ x: -4 }}
                onClick={() => setActiveSection(prevSection)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'transparent', border: 'none',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-mono)', fontSize: '12px',
                  cursor: 'pointer', letterSpacing: '1px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = SECTION_META[prevSection].color}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              >
                ← {SECTION_META[prevSection].label}
              </motion.button>
            ) : <div />}

            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {SECTION_ORDER.map((id) => (
                <motion.div
                  key={id}
                  onClick={() => setActiveSection(id)}
                  whileHover={{ scale: 1.4 }}
                  style={{
                    width: id === activeSection ? '20px' : '7px',
                    height: '7px',
                    borderRadius: '4px',
                    background: id === activeSection ? SECTION_META[id].color : 'rgba(136,146,176,0.25)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: id === activeSection ? `0 0 8px ${SECTION_META[id].color}60` : 'none',
                  }}
                />
              ))}
            </div>

            {nextSection ? (
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => setActiveSection(nextSection)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'transparent', border: 'none',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-mono)', fontSize: '12px',
                  cursor: 'pointer', letterSpacing: '1px',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = SECTION_META[nextSection].color}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              >
                {SECTION_META[nextSection].label} →
              </motion.button>
            ) : <div />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SectionPage;
