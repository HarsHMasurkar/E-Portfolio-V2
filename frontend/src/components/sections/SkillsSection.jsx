/**
 * SkillsSection Component
 * Displays tech stack with Lusion-style minimal aesthetic
 */

import { motion } from 'framer-motion';
import { usePortfolioStore } from '../../store/portfolioStore';
import { useState } from 'react';

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Languages', 'DevOps', 'Tools'];

const SkillItem = ({ skill, delay, accentColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: '24px 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div style={{
        fontFamily: 'Outfit, sans-serif',
        fontSize: 'clamp(1.5rem, 2vw, 2rem)',
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '-0.02em',
      }}>
        {skill.name}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '14px',
          color: 'rgba(255,255,255,0.4)',
        }}>
          {skill.category}
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '14px',
          color: skill.color || accentColor,
        }}>
          {skill.level}%
        </div>
      </div>
    </motion.div>
  );
};

const SkillsSection = ({ accentColor }) => {
  const { skills } = usePortfolioStore();
  const [activeCategory, setActiveCategory] = useState('All');

  // Fallback skills
  const data = skills.length > 0 ? skills : [
    { name: 'React.js', level: 92, category: 'Frontend', color: '#61dafb' },
    { name: 'Node.js', level: 88, category: 'Backend', color: '#68a063' },
    { name: 'MongoDB', level: 85, category: 'Database', color: '#47a248' },
    { name: 'JavaScript', level: 93, category: 'Languages', color: '#f7df1e' },
    { name: 'Three.js', level: 78, category: 'Frontend', color: '#049ef4' },
    { name: 'Docker', level: 72, category: 'DevOps', color: '#2496ed' },
    { name: 'TypeScript', level: 85, category: 'Frontend', color: '#3178c6' },
  ];

  const filtered = activeCategory === 'All'
    ? data
    : data.filter(s => s.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
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
          TECHNICAL ARSENAL
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
          Core <span style={{ color: accentColor }}>Skills</span>
        </h2>
      </motion.div>

      {/* Category Filters */}
      <motion.div variants={itemVariants} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            data-hover
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '10px 20px',
              borderRadius: '100px',
              border: `1px solid ${activeCategory === cat ? accentColor : 'rgba(255,255,255,0.15)'}`,
              background: 'transparent',
              color: activeCategory === cat ? accentColor : 'rgba(255,255,255,0.6)',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '13px',
              letterSpacing: '1px',
              cursor: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <hr className="lusion-rule" />

      {/* Skills List */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>TECHNOLOGY</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px' }}>PROFICIENCY</span>
        </div>
        
        {filtered.map((skill, i) => (
          <SkillItem
            key={skill.name}
            skill={skill}
            delay={i * 0.05}
            accentColor={accentColor}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsSection;
