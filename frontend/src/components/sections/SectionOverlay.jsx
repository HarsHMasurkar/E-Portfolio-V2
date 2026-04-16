/**
 * SectionOverlay Component
 * Animated modal overlay wrapper for all portfolio sections
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

const SECTION_COLORS = {
  about: '#00ffff',
  skills: '#7b00ff',
  projects: '#ff007a',
  experience: '#00ff9f',
  contact: '#ffaa00',
};

const SectionOverlay = () => {
  const { activeSection, closeSection } = usePortfolioStore();
  const SectionComponent = activeSection ? SECTION_COMPONENTS[activeSection] : null;
  const accentColor = activeSection ? SECTION_COLORS[activeSection] : '#00ffff';

  return (
    <AnimatePresence>
      {activeSection && SectionComponent && (
        <>
          {/* Backdrop */}
          <motion.div
            className="overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeSection}
          />

          {/* Panel */}
          <motion.div
            className="overlay-panel glass-card"
            style={{ borderColor: `${accentColor}30` }}
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Top accent line */}
            <div style={{
              height: '3px',
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              borderRadius: '3px 3px 0 0',
            }} />

            {/* Close button */}
            <button
              onClick={closeSection}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: `1px solid ${accentColor}40`,
                background: 'transparent',
                color: accentColor,
                cursor: 'pointer',
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${accentColor}20`;
                e.currentTarget.style.boxShadow = `0 0 10px ${accentColor}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              ✕
            </button>

            {/* Section Content */}
            <div style={{ padding: '32px 32px 32px 32px', paddingTop: '20px' }}>
              <SectionComponent accentColor={accentColor} />
            </div>

            {/* Bottom accent line */}
            <div style={{
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
              borderRadius: '0 0 3px 3px',
            }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SectionOverlay;
