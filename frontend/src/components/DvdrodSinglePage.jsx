import { useEffect, useState } from 'react';
import { usePortfolioStore } from '../store/portfolioStore';
import { motion } from 'framer-motion';

const DvdrodSinglePage = () => {
  const { profile } = usePortfolioStore();
  const projectsData = [
    {
      id: 'proj-1',
      name: 'E-Portfolio',
      description: 'A modern, immersive portfolio built with the MERN stack and Framer Motion.',
      html_url: 'https://github.com/HarsHMasurkar/E-Portfolio',
      language: 'JavaScript',
      updated_at: new Date().toISOString()
    },
    {
      id: 'proj-2',
      name: 'Underwater-Debris',
      description: 'YOLOv8-based detection system for identifying underwater plastic and waste debris.',
      html_url: 'https://github.com/HarsHMasurkar/Underwater-Debris',
      language: 'Python',
      updated_at: new Date().toISOString()
    },
    {
      id: 'proj-3',
      name: 'Ev_downtime',
      description: 'EV charging station downtime analytics and prediction model based on historical data.',
      html_url: 'https://github.com/HarsHMasurkar/Ev_downtime',
      language: 'Jupyter Notebook',
      updated_at: new Date().toISOString()
    }
  ];

  const githubProjects = projectsData;
  const loadingRepos = false;
  const [theme, setTheme] = useState('dark');
  const [isScrolled, setIsScrolled] = useState(false);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Track window scrolling for dynamic navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GitHub API fetch removed for absolute stability

  const data = profile || {
    name: 'Harsh Masurkar',
    title: 'Full Stack Developer',
    subtitle: 'Building the future, one line of code at a time',
    bio: 'I am a passionate software engineer focused on crafting immersive digital experiences. With a deep foundation in full-stack architecture and a keen eye for minimalist, high-impact design, I build scalable solutions that bridge the gap between complex engineering and elegant aesthetics.',
    location: 'Goa, India',
    email: 'masurkarharsh22@gmail.com',
    availableForWork: true,
    socialLinks: {
      email: 'mailto:masurkarharsh22@gmail.com',
      twitter: 'https://twitter.com/harshmasurkar',
      github: 'https://github.com/HarsHMasurkar',
      instagram: 'https://www.instagram.com/_.harshhh.22__/',
      linkedin: 'https://www.linkedin.com/in/harsh-masurkar-86712728b/',
    },
    experience: [
      {
        company: 'Tech Startup XYZ',
        role: 'Full Stack Developer',
        duration: '2023 - Present',
        description: 'Building scalable web applications using MERN stack.',
      }
    ]
  };

  return (
    <div id="hero" style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', width: '100%', padding: '40px 0', overflowX: 'hidden', position: 'relative' }}>

      {/* Top Sticky Header */}
      <nav id="nav" className={isScrolled ? "scrolled" : ""}>
        <a href="#hero" className="nav-logo" style={{ opacity: 1 }}>hm.dev</a>
        <div className="nav-right" style={{ opacity: 1 }}>
          <ul className="nav-links">
            <li><a href="#work">Work</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button
            className="theme-btn"
            id="themeBtn"
            aria-label="Toggle colour scheme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <span className="t-icon" id="tIcon">◑</span>
            <span id="tLabel">{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ padding: '0 40px', paddingTop: '15vh', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        <div style={{ marginBottom: '20px', fontSize: '12px', letterSpacing: '1px', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
          {data.title}
        </div>

        {/* Adjusted scale and vw to prevent overflowing screen edges */}
        <h1 className="dvdrod-hero-title" style={{ fontSize: 'clamp(3rem, 11vw, 12rem)', transform: 'none', whiteSpace: 'normal', wordBreak: 'break-word', marginBottom: '60px' }}>
          <div>Harsh</div>
          <div style={{ marginLeft: '5vw' }}>Masurkar</div>
        </h1>


        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '10vh', flexWrap: 'wrap', gap: '40px' }}>
          <div style={{ maxWidth: '400px', fontSize: '18px', lineHeight: 1.6, color: 'var(--color-text-muted)', fontFamily: 'Inter', fontWeight: 400 }}>
            I am a {data.title.toLowerCase()} based in {data.location}. {data.subtitle}.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
            <div className="dvdrod-pill" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-accent)' }}></span>
              {data.availableForWork ? 'AVAILABLE FOR WORK' : 'UNAVAILABLE'}
            </div>
            <div className="dvdrod-pill" style={{ borderColor: 'var(--color-border)' }}>
              {data.location.toUpperCase()}
            </div>
            <div className="dvdrod-pill" style={{ borderColor: 'var(--color-border)' }}>
              FULL STACK DEVELOPER
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Strip — above Work */}
      <div className="marquee-wrap" aria-hidden="true" style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', padding: '0' }}>
        <div className="marquee-track">
          <span className="mq-item">Systems Thinking</span>
          <span className="mq-item">Design Systems</span>
          <span className="mq-item">0→1 Product Work</span>
          <span className="mq-item">Cross-functional</span>
          <span className="mq-item">Data-informed Design</span>
          <span className="mq-item">Prototyping</span>
          <span className="mq-item">A/B Testing</span>
          <span className="mq-item">Research &amp; Synthesis</span>
          <span className="mq-item">Best Slack Memes</span>
          <span className="mq-item">Stakeholder Alignment</span>
          <span className="mq-item">Design × Engineering</span>
          <span className="mq-item">AI-assisted Workflows</span>
          <span className="mq-item">Product Strategy</span>
          <span className="mq-item">Good Vibes</span>
          {/* Duplicated for smooth infinite loop */}
          <span className="mq-item">Systems Thinking</span>
          <span className="mq-item">Design Systems</span>
          <span className="mq-item">0→1 Product Work</span>
          <span className="mq-item">Cross-functional</span>
          <span className="mq-item">Data-informed Design</span>
          <span className="mq-item">Prototyping</span>
          <span className="mq-item">A/B Testing</span>
          <span className="mq-item">Research &amp; Synthesis</span>
          <span className="mq-item">Best Slack Memes</span>
          <span className="mq-item">Stakeholder Alignment</span>
          <span className="mq-item">Design × Engineering</span>
          <span className="mq-item">AI-assisted Workflows</span>
          <span className="mq-item">Product Strategy</span>
          <span className="mq-item">Good Vibes</span>
        </div>
      </div>

      {/* Projects Section */}
      <div id="work" style={{ padding: '15vh 40px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--color-text-muted)', marginBottom: '40px', textTransform: 'uppercase' }}>
          Selected Projects
        </div>
        <h2 className="dvdrod-section-title" style={{ marginBottom: '80px', transform: 'none' }}>Work</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {loadingRepos ? (
            <div style={{ color: 'var(--color-text-muted)' }}>Loading GitHub projects...</div>
          ) : githubProjects.map((repo, i) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '40px', background: '#141414', borderRadius: '24px', overflow: 'hidden' }}
            >
              <div style={{ padding: '60px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '20px' }}>0{i + 1}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase' }}>
                    {repo.language || 'Unknown'} / {new Date(repo.updated_at).getFullYear()}
                  </div>
                  <h3 style={{ fontFamily: 'Inter', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 600, lineHeight: 1.2, letterSpacing: '-1px', marginBottom: '24px' }}>
                    {repo.name.replace(/-/g, ' ')}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="dvdrod-pill" style={{ textDecoration: 'none' }}>
                      GitHub ↗
                    </a>
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="dvdrod-pill" style={{ textDecoration: 'none' }}>
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>
                <p style={{ marginTop: '40px', fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  {repo.description || 'A project developed to solve specific problems using modern frameworks and standard engineering practices.'}
                </p>
              </div>
              <div style={{
                backgroundColor: '#1e1e1e',
                height: '100%',
                minHeight: '400px',
                width: '100%',
                backgroundImage: repo.name === 'Underwater-Debris'
                  ? `url(/debris.png)`
                  : repo.name === 'Ev_downtime'
                  ? 'none'
                  : 'linear-gradient(135deg, #111 0%, #1e1e1e 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderLeft: '1px solid #222'
              }}>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div id="about" style={{ padding: '15vh 40px', borderTop: '1px solid var(--color-border)' }}>
        <h2 className="dvdrod-section-title" style={{ marginBottom: '80px' }}>About</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
          <div>
            <p style={{ fontFamily: 'Inter', fontSize: 'clamp(20px, 2.5vw, 36px)', fontWeight: 500, lineHeight: 1.3, letterSpacing: '-1px', color: '#fff', marginBottom: '24px' }}>
              {data.bio}
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              I specialize in bridging the gap between design and engineering—transforming core concepts into highly performant, visually striking digital products. I constantly push boundaries, learning new frameworks and pushing UI/UX limits to deliver world-class applications.
            </p>
          </div>
          <div>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '2px', marginBottom: '16px' }}>EXPERIENCE</div>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>{exp.company}</div>
                  <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{exp.role} ({exp.duration})</div>
                </div>
              ))}
            </div>
            
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '2px', marginBottom: '16px' }}>SKILLS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {[
                  'Systems Thinking', 'Design Systems', '0→1 Product Work', 
                  'Cross-functional', 'Data-informed Design', 'Prototyping', 
                  'A/B Testing', 'Research & Synthesis', 'Best Slack Memes', 
                  'Stakeholder Alignment', 'Design × Engineering', 
                  'AI-assisted Workflows', 'Product Strategy', 'Good Vibes'
                ].map((skill, index) => (
                  <div key={index} className="dvdrod-pill" style={{ borderColor: 'var(--color-border)', cursor: 'default' }}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Contact */}
      <div id="contact" style={{ padding: '15vh 40px 40px', display: 'flex', flexDirection: 'column' }}>

        <div style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--color-text-muted)', marginBottom: '20px', textTransform: 'uppercase' }}>
          GET IN TOUCH
        </div>

        <div style={{ marginBottom: '20vh' }}>
          <a href={`mailto:${data.email}`} style={{ textDecoration: 'none', display: 'block', transition: 'transform 0.3s ease' }} className="footer-hero-link">
            <div style={{ fontFamily: 'Syne', fontSize: 'clamp(4rem, 13vw, 15rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.02em', color: '#ffffff' }}>
              Say hi!
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                fontFamily: 'Syne', fontSize: 'clamp(4rem, 13vw, 15rem)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.02em', color: '#ff8b68'
              }}>
                <span style={{ borderBottom: 'clamp(4px, 0.8vw, 8px) solid #ff8b68', paddingBottom: '0.05em' }}>Let's </span>
                talk <span style={{ fontFamily: 'Inter', fontWeight: 300 }}>↗</span>
              </div>
            </div>
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '40px' }}>
          {/* Bottom Left: Location / Email */}
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.6, fontFamily: 'Inter', fontWeight: 500 }}>
            <div style={{ marginBottom: '4px' }}>{data.email}</div>
            <div>{data.location}</div>
          </div>

          {/* Bottom Right Line Socials */}
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {['email', 'linkedin', 'github', 'instagram'].map((platform) => {
              const url = data.socialLinks[platform];
              return url ? (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="dvdrod-link" style={{ fontSize: '10px' }}>
                  {platform}
                </a>
              ) : null;
            })}
          </div>
        </div>

        {/* Bottom Center text */}
        <div style={{ textAlign: 'center', fontSize: '10px', color: 'var(--color-text-muted)', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          © {new Date().getFullYear()} {data.name} · {data.title}
        </div>
      </div>
    </div>
  );
};

export default DvdrodSinglePage;
