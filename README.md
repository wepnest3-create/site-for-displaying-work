<div align="center">
<img width="1200" alt="Wepnest Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<p align="center">
  <strong>Premium Web Development &amp; Digital Solutions Agency</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a>
</p>

---

## Overview

**Wepnest** is a full-featured agency portfolio and ordering platform built with React, TypeScript, and Vite. It showcases professional web development services, past projects, and provides a seamless client ordering experience with interactive 3D visuals and smooth animations.

## Features

- **3D Interactive UI** — Immersive 3D scenes powered by Three.js and React Three Fiber
- **Project Portfolio** — Dynamic project gallery fetched from Supabase with detailed case studies
- **Service Plans** — Three-tier pricing (Starter, Professional, Custom) with a multi-step order modal
- **Smooth Animations** — Scroll-triggered animations via GSAP ScrollTrigger and Framer Motion transitions
- **Responsive Design** — Fully responsive layout built with Tailwind CSS v4
- **Order Management** — Client order submission with customization options (color pickers, feature toggles)
- **Bilingual Support** — English/Arabic interface in the order form

## Tech Stack

| Category      | Technology                                      |
| ------------- | ----------------------------------------------- |
| **Framework** | React 19, TypeScript                            |
| **Build Tool**| Vite 6                                          |
| **Styling**   | Tailwind CSS v4                                 |
| **3D**        | Three.js, React Three Fiber, Drei               |
| **Animation** | GSAP + ScrollTrigger, Framer Motion             |
| **Backend**   | Supabase (PostgreSQL, REST API)                 |
| **Routing**   | React Router v7                                 |
| **Icons**     | Lucide React                                    |

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/wepnest.git
cd wepnest

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/     # Reusable UI components (Hero, Navigation, Projects, etc.)
  pages/          # Route pages (Home, Works, Portfolio, Plans)
  services/       # API clients (Supabase)
  App.tsx         # Root component with routing
  main.tsx        # Application entry point
```

## License

MIT
