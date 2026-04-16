/**
 * Database Seeder Script
 * Populates MongoDB with initial portfolio data
 * Run with: npm run seed
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Profile = require('../models/Profile');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eportfolio');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Profile.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // ─── Seed Profile ─────────────────────────────────────────────────────────
    await Profile.create({
      name: 'Harsh Masurkar',
      title: 'Full Stack Developer',
      subtitle: 'Building the future, one line of code at a time',
      bio: 'Passionate full-stack developer with expertise in modern web technologies. I love creating immersive digital experiences that blend creativity with technical excellence. Currently exploring the intersection of AI, 3D graphics, and web development.',
      location: 'Mumbai, India',
      email: 'harsh@example.com',
      availableForWork: true,
      socialLinks: {
        github: 'https://github.com/harshmasurkar',
        linkedin: 'https://linkedin.com/in/harshmasurkar',
        twitter: 'https://twitter.com/harshmasurkar',
      },
      experience: [
        {
          company: 'Tech Startup XYZ',
          role: 'Full Stack Developer',
          duration: '2023 - Present',
          description: 'Building scalable web applications using MERN stack. Led development of 3 major features that increased user engagement by 40%.',
          technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
          current: true,
        },
        {
          company: 'Digital Agency ABC',
          role: 'Frontend Developer',
          duration: '2022 - 2023',
          description: 'Developed responsive web interfaces for 15+ client projects. Implemented modern UI/UX designs with React and Tailwind CSS.',
          technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
          current: false,
        },
        {
          company: 'Freelance',
          role: 'Web Developer',
          duration: '2021 - 2022',
          description: 'Built custom websites and web apps for small businesses. Gained experience across multiple domains and tech stacks.',
          technologies: ['JavaScript', 'HTML/CSS', 'WordPress', 'PHP'],
          current: false,
        },
      ],
    });
    console.log('✅ Profile seeded');

    // ─── Seed Projects ─────────────────────────────────────────────────────────
    await Project.insertMany([
      {
        title: '3D E-Portfolio',
        shortDescription: 'Interactive 3D portfolio using Three.js & MERN stack',
        description: 'A fully immersive 3D portfolio website built with React Three Fiber, featuring interactive environments, smooth animations, and a complete MERN stack backend for dynamic content management.',
        technologies: ['React', 'Three.js', 'Node.js', 'MongoDB', 'Framer Motion', 'Tailwind CSS'],
        liveUrl: 'https://portfolio.example.com',
        githubUrl: 'https://github.com/harshmasurkar/3d-portfolio',
        featured: true,
        category: 'Web',
        order: 1,
        status: 'completed',
      },
      {
        title: 'AI Presentation Builder',
        shortDescription: 'SaaS app to generate PowerPoint slides using AI',
        description: 'A production-ready SaaS application that uses AI to generate professional presentations from simple text prompts. Features user authentication, payment integration, and real-time slide editing.',
        technologies: ['React', 'OpenAI API', 'Node.js', 'MongoDB', 'Stripe'],
        featured: true,
        category: 'AI/ML',
        order: 2,
        status: 'completed',
      },
      {
        title: 'Underwater Waste Detection',
        shortDescription: 'ML-powered application for detecting underwater plastic waste',
        description: 'An underwater waste detection system using YOLOv8 object detection model trained on custom datasets. Features real-time video analysis and a Streamlit dashboard for visualization.',
        technologies: ['Python', 'YOLOv8', 'Streamlit', 'OpenCV', 'PyTorch'],
        featured: true,
        category: 'AI/ML',
        order: 3,
        status: 'completed',
      },
      {
        title: 'Real-Time Chat App',
        shortDescription: 'Socket.io powered real-time messaging application',
        description: 'A feature-rich real-time chat application with room support, file sharing, and end-to-end encryption. Built with React and Socket.io for live bidirectional communication.',
        technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'JWT'],
        category: 'Web',
        order: 4,
        status: 'completed',
      },
      {
        title: 'E-Commerce Platform',
        shortDescription: 'Full-featured online store with payment integration',
        description: 'A complete e-commerce solution with product management, shopping cart, Stripe payment processing, order tracking, and an admin dashboard.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
        category: 'Web',
        order: 5,
        status: 'completed',
      },
      {
        title: 'Expense Tracker',
        shortDescription: 'Personal finance management with analytics dashboard',
        description: 'A smart expense tracking app with automated categorization, budget alerts, visual analytics with charts, and CSV export functionality.',
        technologies: ['React', 'Chart.js', 'Node.js', 'MongoDB'],
        category: 'Web',
        order: 6,
        status: 'completed',
      },
    ]);
    console.log('✅ Projects seeded');

    // ─── Seed Skills ─────────────────────────────────────────────────────────
    await Skill.insertMany([
      // Frontend
      { name: 'React.js', level: 92, category: 'Frontend', color: '#61dafb', order: 1 },
      { name: 'TypeScript', level: 85, category: 'Frontend', color: '#3178c6', order: 2 },
      { name: 'Three.js / R3F', level: 78, category: 'Frontend', color: '#049ef4', order: 3 },
      { name: 'Tailwind CSS', level: 90, category: 'Frontend', color: '#38bdf8', order: 4 },
      { name: 'Framer Motion', level: 80, category: 'Frontend', color: '#dd00ff', order: 5 },
      { name: 'Next.js', level: 82, category: 'Frontend', color: '#ffffff', order: 6 },
      // Backend
      { name: 'Node.js', level: 88, category: 'Backend', color: '#68a063', order: 1 },
      { name: 'Express.js', level: 87, category: 'Backend', color: '#68a063', order: 2 },
      { name: 'REST APIs', level: 90, category: 'Backend', color: '#ff6b35', order: 3 },
      { name: 'GraphQL', level: 70, category: 'Backend', color: '#e535ab', order: 4 },
      { name: 'Socket.io', level: 75, category: 'Backend', color: '#00ff9f', order: 5 },
      // Database
      { name: 'MongoDB', level: 88, category: 'Database', color: '#47a248', order: 1 },
      { name: 'PostgreSQL', level: 75, category: 'Database', color: '#336791', order: 2 },
      { name: 'Redis', level: 65, category: 'Database', color: '#dc382d', order: 3 },
      // Languages
      { name: 'JavaScript', level: 93, category: 'Languages', color: '#f7df1e', order: 1 },
      { name: 'Python', level: 82, category: 'Languages', color: '#3776ab', order: 2 },
      { name: 'C++', level: 70, category: 'Languages', color: '#00599c', order: 3 },
      // DevOps
      { name: 'Docker', level: 72, category: 'DevOps', color: '#2496ed', order: 1 },
      { name: 'AWS', level: 68, category: 'DevOps', color: '#ff9900', order: 2 },
      { name: 'Git/GitHub', level: 90, category: 'DevOps', color: '#f05032', order: 3 },
      // Tools
      { name: 'Figma', level: 78, category: 'Tools', color: '#f24e1e', order: 1 },
      { name: 'VS Code', level: 95, category: 'Tools', color: '#007acc', order: 2 },
      { name: 'Postman', level: 88, category: 'Tools', color: '#ef5b25', order: 3 },
    ]);
    console.log('✅ Skills seeded');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
