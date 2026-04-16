/**
 * ExperienceSection Component
 * Professional timeline of work experience - Lusion style layout
 */

import { motion } from 'framer-motion';
import { usePortfolioStore } from '../../store/portfolioStore';

const ExperienceSection = ({ accentColor }) => {
  const { profile } = usePortfolioStore();

  const experiences = profile?.experience || [
    {
      company: 'Tech Startup XYZ',
      role: 'Full Stack Developer',
      duration: '2023 - Present',
      current: true,
      description: 'Building scalable web applications using MERN stack. Led development of 3 major features that increased user engagement by 40%.',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
    },
    {
      company: 'Digital Agency ABC',
      role: 'Frontend Developer',
      duration: '2022 - 2023',
      current: false,
      description: 'Developed responsive web interfaces for 15+ client projects. Implemented modern UI/UX designs with React and Tailwind CSS.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    },
    {
      company: 'Freelance',
      role: 'Web Developer',
      duration: '2021 - 2022',
      current: false,
      description: 'Built custom websites and web apps for small businesses. Gained experience across multiple domains.',
      technologies: ['JavaScript', 'HTML/CSS', 'WordPress'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
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
          CAREER PATH
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
          Work <span style={{ color: accentColor }}>Experience</span>
        </h2>
      </motion.div>

      <hr className="lusion-rule" />

      {/* Timeline List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(200px, 1fr) 2fr',
              gap: '40px',
              alignItems: 'start',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: '40px'
            }}
          >
            {/* Left side: Role & Duration */}
            <div>
              <h3 style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '24px',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '8px'
              }}>
                {exp.role}
              </h3>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                color: accentColor,
                letterSpacing: '1px',
                marginBottom: '12px'
              }}>
                {exp.company.toUpperCase()}
              </div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                color: 'rgba(255,255,255,0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '100px'
              }}>
                {exp.current && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor, boxShadow: `0 0 8px ${accentColor}` }} />}
                {exp.duration}
              </div>
            </div>

            {/* Right side: Description & Tech */}
            <div style={{ paddingTop: '6px' }}>
              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '16px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '24px',
                fontWeight: 300
              }}>
                {exp.description}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {exp.technologies?.map((tech) => (
                  <span key={tech} style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.5)',
                    padding: '4px 10px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '4px',
                    letterSpacing: '1px'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperienceSection;
