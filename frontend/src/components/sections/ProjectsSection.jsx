/**
 * ProjectsSection Component
 * Lusion-inspired sleek project listing
 */

import { motion } from 'framer-motion';
import { usePortfolioStore } from '../../store/portfolioStore';
import { useState } from 'react';

const CATEGORY_MAP = ['All', 'Web', 'AI/ML', 'Mobile', 'Game'];

const ProjectItem = ({ project, index, accentColor }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr',
        gap: '24px',
        alignItems: 'center',
        padding: '32px 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Title & Category */}
      <div>
        <h3 style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
          fontWeight: 800,
          color: hovered ? accentColor : '#fff',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          marginBottom: '8px',
          transition: 'color 0.3s ease',
        }}>
          {project.title}
        </h3>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          {project.category}
        </div>
      </div>

      {/* Description & Tech */}
      <div>
        <p style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '15px',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.5,
          fontWeight: 300,
          marginBottom: '12px',
        }}>
          {project.shortDescription || project.description?.substring(0, 100) + '...'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {project.technologies?.map((tech) => (
            <span key={tech} style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px',
              color: hovered ? accentColor : 'rgba(255,255,255,0.5)',
              padding: '2px 8px',
              border: `1px solid ${hovered ? accentColor + '40' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '4px',
              transition: 'all 0.3s',
            }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" data-hover style={{
            fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#fff', textDecoration: 'none',
            borderBottom: `1px solid ${accentColor}40`, paddingBottom: '2px',
            textTransform: 'uppercase', letterSpacing: '1px'
          }}>
            GitHub
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" data-hover style={{
            fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: accentColor, textDecoration: 'none',
            borderBottom: `1px solid ${accentColor}`, paddingBottom: '2px',
            textTransform: 'uppercase', letterSpacing: '1px'
          }}>
            Live ↗
          </a>
        )}
      </div>
    </motion.div>
  );
};

const ProjectsSection = ({ accentColor }) => {
  const { projects } = usePortfolioStore();
  const [category, setCategory] = useState('All');

  const data = projects.length > 0 ? projects : [
    {
      title: '3D E-Portfolio',
      shortDescription: 'Interactive 3D portfolio using Three.js & MERN stack. Designed with a cinematic, Lusion-inspired aesthetic.',
      technologies: ['React', 'Three.js', 'Node.js', 'MongoDB'],
      category: 'Web', liveUrl: '#', githubUrl: '#',
    },
    {
      title: 'AI Gen-Slides',
      shortDescription: 'SaaS application to generate PowerPoint slides instantly using AI topic ingestion and intelligent layouts.',
      technologies: ['React', 'OpenAI', 'Node.js', 'MongoDB'],
      category: 'AI/ML', githubUrl: '#',
    },
    {
      title: 'Ocean Guard AI',
      shortDescription: 'ML-powered computer vision application for detecting underwater plastic waste from oceanic drone footage.',
      technologies: ['Python', 'YOLOv8', 'Streamlit', 'OpenCV'],
      category: 'AI/ML', githubUrl: '#',
    },
    {
      title: 'Pulse Chat',
      shortDescription: 'Ultra-low latency real-time messaging platform using WebSockets with end-to-end encryption.',
      technologies: ['React', 'Socket.io', 'Redis', 'Node.js'],
      category: 'Web', githubUrl: '#',
    },
  ];

  const filtered = category === 'All' ? data : data.filter(p => p.category === category);

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
          SELECTED WORKS
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
          Featured <span style={{ color: accentColor }}>Projects</span>
        </h2>
      </motion.div>

      {/* Category Filters */}
      <motion.div variants={itemVariants} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {CATEGORY_MAP.map((cat) => (
          <button
            key={cat}
            data-hover
            onClick={() => setCategory(cat)}
            style={{
              padding: '10px 20px',
              borderRadius: '100px',
              border: `1px solid ${category === cat ? accentColor : 'rgba(255,255,255,0.15)'}`,
              background: 'transparent',
              color: category === cat ? accentColor : 'rgba(255,255,255,0.6)',
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

      {/* Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)',
          fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px'
        }}>
          <span>PROJECT</span>
          <span>DETAILS</span>
          <span style={{ textAlign: 'right' }}>LINKS</span>
        </div>
        
        {filtered.map((project, i) => (
          <ProjectItem
            key={project.title}
            project={project}
            index={i}
            accentColor={accentColor}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsSection;
