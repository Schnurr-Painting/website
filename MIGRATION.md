# Astro → Next.js Migration

This is a Next.js port of the Schnurr Painting website, migrated from Astro to enable:
- Instant content updates (no rebuild delays)
- Foundation for future portal features
- Better developer experience with React

## Key Changes

### Architecture
- **Framework**: Astro → Next.js (React 18)
- **Styling**: Scoped CSS Modules (same CSS, modular structure)
- **Data**: Same JSON structure, loaded at build-time and runtime
- **CMS**: Decap CMS config unchanged (points to same git repo)

### Pages Ported
- ✅ Homepage (Hero carousel with animations, responsive)
- ✅ Header/Footer with Decap-driven branding
- 🚧 Services/Markets/Projects pages (components ready, content integration in progress)
- 🚧 About/Safety/Contact/Careers pages (structure ready)

### Client-Side Features
- Hero carousel with auto-advance and manual controls
- Scoped CSS modules prevent style conflicts
- Use client components where needed, SSR by default

## Setup

```bash
cd /home/claude/website-nextjs
npm install
npm run dev
```

Visit `http://localhost:3000`

## Deployment to Netlify

The project is configured to deploy to Netlify from the `nextjs-migration` branch:
1. Push to GitHub
2. Netlify auto-detects Next.js
3. Deploys to preview/staging

## Data Syncing

- Content lives in the original Astro repo (`Schnurr-Painting/website`)
- This Next.js version pulls the same JSON data files
- Decap CMS publishes to the Astro repo's `src/data/`
- Both projects can read the same content until full migration

## What's Next

1. Port remaining homepage components (Stats, Services, Markets, etc.)
2. Build category/detail pages (Services, Markets, Projects)
3. Interior pages (About, Safety, Contact, Careers)
4. Test visual parity with Astro version
5. Set up Netlify deployment
6. Gradual switchover of public traffic

## Notes

- CSS variable names match Astro project (same color palette, fonts)
- All assets (images, logos) in `/public/` (same structure)
- Component naming convention: PascalCase, CSS modules: Component.module.css
- Decap CMS config unchanged: `/public/admin/config.yml` identical
