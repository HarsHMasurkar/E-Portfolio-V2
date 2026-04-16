/**
 * AboutSection Component
 * Displays personal info, bio, and availability status - Lusion style
 */

import { motion } from 'framer-motion';
import { usePortfolioStore } from '../../store/portfolioStore';

const AboutSection = ({ accentColor }) => {
  const { profile } = usePortfolioStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  // Fallback data if backend is unavailable
  const data = profile || {
    name: 'Harsh Masurkar',
    title: 'Full Stack Developer',
    subtitle: 'Building the future, one line of code at a time',
    bio: 'I am a passionate engineer who crafts immersive, high-performance web experiences. With a deep foundation in both frontend finesse and backend robust architecture, I bring bold ideas to life.',
    location: 'Goa, India',
    email: 'masurkarharsh22@gmail.com',
    availableForWork: true,
    socialLinks: {
      github: 'https://github.com/HarsHMasurkar',
      linkedin: 'https://www.linkedin.com/in/harsh-masurkar-86712728b/',
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '60px',
      }}
    >
      {/* ── Top Layout (Title & Bio) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '40px', alignItems: 'start' }}>
        
        {/* Left: Huge Title */}
        <motion.div variants={itemVariants}>
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '16px'
          }}>
            WHO AM I
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
            {data.name.split(' ')[0]} <br />
            <span style={{ color: accentColor }}>{data.name.split(' ')[1]}</span>
          </h2>
          <div style={{
            marginTop: '24px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '1px'
          }}>
            {data.title.toUpperCase()}
          </div>
        </motion.div>

        {/* Right: Bio & Info */}
        <motion.div variants={itemVariants} style={{ paddingTop: '10px' }}>
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
            lineHeight: 1.4,
            color: 'rgba(255,255,255,0.85)',
            marginBottom: '40px',
            fontWeight: 300,
          }}>
            {data.bio}
          </p>

          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'JetBrains Mono', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', letterSpacing: '2px' }}>LOCATION</div>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>{data.location}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'JetBrains Mono', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', letterSpacing: '2px' }}>EMAIL</div>
              <div style={{ fontSize: '14px', fontWeight: 500 }}>{data.email}</div>
            </div>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'JetBrains Mono', color: 'rgba(255,255,255,0.4)', marginBottom: '8px', letterSpacing: '2px' }}>STATUS</div>
              <div style={{ 
                fontSize: '14px', fontWeight: 500, color: data.availableForWork ? '#00ff9f' : 'rgba(255,255,255,0.5)',
                display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                <span style={{ width: '6px', height: '6px', background: data.availableForWork ? '#00ff9f' : 'transparent', borderRadius: '50%', boxShadow: data.availableForWork ? '0 0 10px #00ff9f' : 'none' }}></span>
                {data.availableForWork ? 'Available' : 'Unavailable'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <hr className="lusion-rule" />

      {/* ── Bottom Layout (Stats & Socials) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '40px', alignItems: 'center' }}>
        
        {/* Socials */}
        <motion.div variants={itemVariants}>
          <div style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            letterSpacing: '4px',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: '20px'
          }}>
            SOCIALS
          </div>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {Object.entries(data.socialLinks || {}).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '16px',
                  color: '#fff',
                  textDecoration: 'none',
                  textTransform: 'capitalize',
                  borderBottom: `1px solid ${accentColor}40`,
                  paddingBottom: '4px',
                  transition: 'border-color 0.3s, color 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = accentColor;
                  e.currentTarget.style.borderColor = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = `${accentColor}40`;
                }}
              >
                {platform}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          {[
            { value: '3+', label: 'YEARS EXP.' },
            { value: '20+', label: 'PROJECTS' },
            { value: '15+', label: 'TECH STACK' },
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                lineHeight: 1,
                color: '#fff'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                letterSpacing: '2px',
                color: 'rgba(255,255,255,0.4)'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </motion.div>
  );
};

export default AboutSection;
