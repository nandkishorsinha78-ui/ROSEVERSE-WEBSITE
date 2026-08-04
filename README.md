# ROSEVERSE • 300-Frame Botanical Kinetic Atelier

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deploys_Instantly-black?style=flat-square&logo=vercel)](https://roseverse-website.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=flat-square)](LICENSE)
[![Performance: 60FPS](https://img.shields.io/badge/Performance-60FPS_Canvas-success.svg?style=flat-square)](https://roseverse-website.vercel.app/)

A luxury, production-ready 2026 web application built for **Roseverse**. It features a **300-frame HTML5 Canvas LERP motion engine**, 3D perspective depth cosmos, spatial Web Audio synthesizer, transparent glass navigation, AI sales & business assistant, and multi-scale vision accessibility.

---

## 🔗 Project Links

* **GitHub Repository:** [https://github.com/nandkishorsinha78-ui/ROSEVERSE-WEBSITE.git](https://github.com/nandkishorsinha78-ui/ROSEVERSE-WEBSITE.git)
* **Live Vercel Deployment:** [https://roseverse-website.vercel.app/](https://roseverse-website.vercel.app/)
* **Local Host Server:** `http://localhost:3000`

---

## 🏛️ Project Architecture Overview

```
ROSEVERSE-WEBSITE/
├── index.html            # Main production landing page & app layout
├── styles.css            # Master design system & glassmorphism CSS
├── app.js                # 60FPS LERP engine, 3D particle cosmos & AI assistant
├── vercel.json           # Vercel deployment config & security headers
├── package.json          # Package configuration & build scripts
├── robots.txt            # Search engine crawler directives
├── sitemap.xml           # Route & anchor indexing sitemap
├── privacy.html          # Privacy Policy & Ethical Compliance
├── terms.html            # Terms of Service & Commercial Licensing
├── 404.html              # Custom 404 error page fallback
├── server.py             # Local Python HTTP server (Port 3000)
├── frames/               # 300 HD pre-buffered botanical sequence frames
└── .gitignore            # Git ignore specification
```

---

## ✨ Features & Architecture Breakdown

### 1. 300-Frame 60FPS HTML5 Canvas Engine
* All 300 high-definition micro-photographs are pre-buffered directly into browser RAM.
* Uses linear step interpolation (`requestAnimationFrame`) to guarantee 60FPS sequential frame rendering without stuttering or black buffer screens during fast scrolling.

### 2. Heading Overlay & 30% Scroll Fade-Away
* Overlay heading **"ROSEVERSE • THE LOVE OF INDIANS"** formatted in `Libre Caslon Text` with a soft botanical green gradient (`#50652a`, `#b6d088`, `#d2eca2`).
* Smoothly floats upward and fades away to `opacity: 0` as the user scrolls through the first 30% of the kinetic animation viewport.

### 3. Transparent Fixed Glass Navigation & ScrollSpy
* Fixed glassmorphic navigation bar (`backdrop-filter: blur(18px)`) with active ScrollSpy section indicators (`#hero`, `#about`, `#kinetic-studio`, `#collection`, `#masterclass`, `#boutique`, `#process`, `#products`, `#faq`).
* Smooth offset scrolling for seamless navigation.

### 4. Ethical AI Sales & Business Assistant
* Floating glassmorphic AI chat widget trained on transparent business communication.
* Handles product inquiries, commercial licensing guidance, and instant 1-on-1 consultation scheduling.

### 5. Multi-Scale Vision Accessibility
* Native support for **90% default resolution scale**, 100% standard scale, and 125% **Eye Comfort High-Legibility Mode** boosting contrast and font size for all users.

---

## 🛡️ Security & Performance Standards

* **Secure Headers (`vercel.json`)**: Configured with `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, and `Referrer-Policy: strict-origin-when-cross-origin`.
* **CDN Frame Caching**: 1-year immutable caching (`public, max-age=31536000, immutable`) for `/frames/*` assets.
* **SEO & Social Metadata**: Includes Open Graph, Twitter Cards, SVG Favicon, and Schema.org JSON-LD structured data (`Organization`, `WebSite`, `Product`).

---

## 🚀 Vercel Deployment Instructions

1. Log into your [Vercel Dashboard](https://vercel.com/new).
2. Select **Import Git Repository** and choose `nandkishorsinha78-ui/ROSEVERSE-WEBSITE`.
3. Set Framework Preset to **Other** (Static Site).
4. Click **Deploy**. Vercel will automatically host the application over its global Edge CDN.

---

## 🔮 Future Scalability Recommendations

1. **WebGL Shader Acceleration**: Transition frame compositing to WebGL fragment shaders for real-time 3D refraction filters.
2. **E-Commerce Gateway Integration**: Connect the consultation modal directly to Stripe / PayPal for instant commercial license purchases.
3. **Multi-Language Internationalization (i18n)**: Add language toggles for English, Hindi, French, and Japanese.

---

© 2026 **ROSEVERSE Atelier**. Cultivating elegance through every petal.
