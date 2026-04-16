# 🚀 3D E-Portfolio — Full Stack MERN Application

An immersive, interactive **3D portfolio** built with React Three Fiber, Three.js, and MERN Stack. Features clickable 3D objects, animated overlays, particle effects, and a dynamic backend.

---

## 📁 Project Structure

```
E-Portfolio/
├── backend/                     # Express + MongoDB API
│   ├── config/
│   │   ├── db.js                # MongoDB connection
│   │   └── email.js             # Nodemailer transporter
│   ├── controllers/
│   │   ├── projectController.js # Project CRUD
│   │   ├── skillController.js   # Skill CRUD
│   │   ├── contactController.js # Contact + email
│   │   └── profileController.js # Profile management
│   ├── models/
│   │   ├── Project.js           # Project schema
│   │   ├── Skill.js             # Skill schema
│   │   ├── Contact.js           # Contact schema
│   │   └── Profile.js           # Profile + Experience schema
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   ├── skillRoutes.js
│   │   ├── contactRoutes.js
│   │   └── profileRoutes.js
│   ├── scripts/
│   │   └── seed.js              # DB seeder (demo data)
│   ├── .env                     # Environment secrets
│   ├── server.js                # Express entry point
│   └── package.json
│
└── frontend/                    # React + Vite + Three.js
    ├── src/
    │   ├── components/
    │   │   ├── 3d/
    │   │   │   ├── Scene3D.jsx      # Main Three.js scene
    │   │   │   └── FloatingObject.jsx # Clickable 3D objects
    │   │   ├── sections/
    │   │   │   ├── SectionOverlay.jsx  # Animated overlay wrapper
    │   │   │   ├── AboutSection.jsx
    │   │   │   ├── SkillsSection.jsx
    │   │   │   ├── ProjectsSection.jsx
    │   │   │   ├── ExperienceSection.jsx
    │   │   │   └── ContactSection.jsx
    │   │   ├── LoadingScreen.jsx
    │   │   ├── Navigation.jsx
    │   │   └── ParticleBackground.jsx
    │   ├── hooks/
    │   │   └── usePortfolioData.js  # Data fetching hook
    │   ├── services/
    │   │   └── api.js               # Axios API layer
    │   ├── store/
    │   │   └── portfolioStore.js    # Zustand state management
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css               # Design system
    ├── index.html                  # SEO meta tags
    └── vite.config.js
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))
- npm or yarn

### Step 1 — Backend Setup

```bash
cd backend
npm install

# Configure your environment
copy .env.example .env
# Edit .env with your MongoDB URI and email credentials
```

### Step 2 — Seed the Database

```bash
npm run seed
```

### Step 3 — Start Backend

```bash
npm run dev
# Backend runs on http://localhost:5000
```

### Step 4 — Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🌐 REST API Endpoints

| Method | Endpoint         | Description                    |
|--------|-----------------|--------------------------------|
| GET    | /api/projects   | Get all projects               |
| GET    | /api/projects/:id | Get single project           |
| POST   | /api/projects   | Create project (admin)         |
| GET    | /api/skills     | Get all skills (grouped)       |
| POST   | /api/contact    | Submit contact form            |
| GET    | /api/profile    | Get personal profile info      |
| GET    | /api/health     | Health check                   |

---

## 🎮 Features

| Feature | Description |
|---------|-------------|
| 🌌 3D Scene | React Three Fiber + Three.js interactive environment |
| 🎯 Clickable Objects | Each 3D object opens a section overlay |
| ✨ Bloom FX | Post-processing bloom + chromatic aberration |
| 🌊 Particles | Canvas-based connected particle background |
| 📱 Responsive | Works on desktop and tablet |
| 🔊 Sound FX | Web Audio API click/hover sounds |
| 📧 Email | Nodemailer with auto-reply |
| 🗃️ MongoDB | Full MERN backend with MVC structure |
| 🔒 Security | Helmet, rate limiting, CORS, validation |
| 🎨 Dark Theme | Neon cyan/purple futuristic design |

---

## 📧 Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Google account
2. Go to **Google Account → Security → App Passwords**
3. Create an App Password for "Mail"
4. Add to `backend/.env`:
   ```
   EMAIL_USER=youremail@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx  # App password (no spaces)
   EMAIL_TO=youremail@gmail.com
   ```

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy dist/ to Vercel
```

### Backend (Railway / Render)
```bash
# Set environment variables in dashboard
# Deploy backend/ folder
```

### MongoDB (Atlas)
Replace `MONGODB_URI` with your Atlas connection string.

---

## 🛠️ Updating Content

All content is driven from MongoDB. To update:
1. Edit `backend/scripts/seed.js` with your info
2. Run `npm run seed` to re-seed the database
3. Or use the REST API directly with a tool like Postman

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary BG | `#030712` |
| Neon Cyan | `#00ffff` |
| Neon Purple | `#7b00ff` |
| Neon Pink | `#ff007a` |
| Display Font | Outfit |
| Body Font | Space Grotesk |
| Mono Font | JetBrains Mono |

---

Built with ❤️ by **Harsh Masurkar**
