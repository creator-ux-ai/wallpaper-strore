# 🕉️ Sanatan Strokes — Divine 4K Wallpaper Platform

A premium, frontend-only Hindu Sanatan wallpaper website built with **React + Vite + Tailwind CSS**, featuring a cinematic dark-gold aesthetic, animated cosmic background, category filtering, search, a fullscreen preview modal and real download functionality.

---

## 1. Installation

```bash
npm install
```

## 2. Development

```bash
npm run dev
```

Opens the site at `http://localhost:5173`.

## 3. Production Build

```bash
npm run build
```

Outputs static files to `dist/`.

## 4. Preview the Production Build

```bash
npm run preview
```

> **Note on this sandbox:** this project was authored and reviewed in an offline environment without registry access, so `npm install` / `npm run build` could not be executed here to produce a verified log. The code follows standard Vite + React + Tailwind conventions throughout — after you run `npm install` locally, `npm run build` should complete cleanly. If you hit any error, open an issue in your own repo or share the terminal output and it can be fixed quickly.

---

## Placeholder Artwork

The wallpapers bundled in `/public/images` are **lightweight placeholder SVGs** (dark gradient + Om symbol + label) — not photographic artwork — so the project stays copyright-clean and lightweight while remaining fully wired up (grid, modal, download all work with them today).

**To go live with real wallpapers:**

1. Add your JPG/PNG files to `public/images/`.
2. Open `src/data/wallpapers.js` and update each entry's `image`, `download`, `format` and `fileName` to point at your new files.

---

## Where Everything Lives

| What | File |
|---|---|
| Wallpaper catalog (titles, categories, resolutions, images) | `src/data/wallpapers.js` |
| Category list | `src/data/wallpapers.js` (`categories` export) |
| Social links (Instagram / Telegram / YouTube) | `src/data/socialLinks.js` |
| Site name / tagline | `src/data/socialLinks.js` (`siteConfig`) |
| Logo | `public/logo/logo.svg` |
| Favicon | `public/icons/favicon.svg` |
| Color palette & fonts | `tailwind.config.js` |
| Global styles / background effects CSS | `src/index.css` |

### Adding a new wallpaper

Open `src/data/wallpapers.js` and add an object to the `wallpapers` array:

```js
{
  id: 13,
  title: "Your Wallpaper Title",
  category: "Shiva",          // must match an entry in `categories`
  quality: "4K",               // "4K" or "HD"
  resolution: "2160 × 3840",
  format: "JPG",
  keywords: ["shiva", "mahadev"],
  image: "/images/your-file.jpg",
  download: "/images/your-file.jpg",
  fileName: "sanatan-strokes-your-file.jpg",
  featured: false,
  latest: true
}
```

### Changing social links

Edit `src/data/socialLinks.js`:

```js
export const socialLinks = {
  instagram: "https://instagram.com/your-handle",
  telegram: "https://t.me/your-channel",
  youtube: "https://youtube.com/@your-channel"
}
```

### Customizing colors

All brand colors live in `tailwind.config.js` under `theme.extend.colors` (`navy`, `gold`, `bronze`, `ember`, `ivory`). Change the hex values there and the whole site updates.

### Customizing animations

- Background particle/ray keyframes: `tailwind.config.js` (`keyframes` / `animation`) and `src/components/BackgroundEffects.jsx`.
- Scroll-reveal / hover motion: Framer Motion props inside each component (search for `motion.` / `whileInView`).
- All motion respects `prefers-reduced-motion` via the rule in `src/index.css`.

---

## Project Structure

```
sanatan-strokes/
├── public/
│   ├── images/       # wallpaper artwork (placeholder SVGs, swap with your own)
│   ├── logo/          # site logo
│   └── icons/         # favicon
├── src/
│   ├── components/    # Header, Hero, WallpaperGrid, Modal, Footer, etc.
│   ├── data/           # wallpapers.js, socialLinks.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── index.html
```

---

## Deployment

**Vercel**
```bash
npm i -g vercel
vercel
```
Framework preset: Vite. Build command `npm run build`, output directory `dist`.

**Netlify**
- Build command: `npm run build`
- Publish directory: `dist`

**GitHub Pages**
1. `npm run build`
2. Push the contents of `dist/` to a `gh-pages` branch (or use the `gh-pages` npm package).
3. If deploying to a subpath (`username.github.io/repo`), set `base: '/repo/'` in `vite.config.js`.

---

## Tech Stack

React 18 · JavaScript (no TypeScript) · Vite 5 · Tailwind CSS 3 · Framer Motion · lucide-react

100% frontend — no backend, database, authentication, admin panel, API or payments.

---

© Sanatan Strokes. Made with ❤️ for Sanatan Dharma.
