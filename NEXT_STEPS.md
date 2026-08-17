# Project Status — 2026-08-17

This file replaces the old Decap/Astro-era version of NEXT_STEPS.md, which
was written before the Sanity migration and no longer reflects reality.
Read this first when picking the project back up — it should get you (or a
fresh Claude Code session) oriented without re-deriving everything.

## Architecture, as it actually stands

- **Frontend**: Next.js 14 App Router, deployed from this repo
  (`nextjs-migration` branch). Netlify/Decap CMS are fully gone —
  `middleware.ts`, `netlify.toml`, `public/admin/*`, and the Netlify Forms
  integration were removed.
- **CMS**: Sanity, in a **separate sibling repo**:
  `C:\Users\Lukel\Documents\studio-schnurr-painting-website`
  (GitHub: `Schnurr-Painting/sanity-studio`). Studio dev server runs on
  `localhost:3333`. It has its own PROJECT-STATUS.md — read that too if
  you're touching schema/content structure.
- Content fetching lives in `lib/content.ts` (project/service/market/
  teamMember/testimonial/resource/position collections) and
  `lib/sanity/queries.ts` (singleton pages + site settings).

## What's built and working

- **Rich text is real now.** Every body-style field (About's story, team
  bios, testimonial quotes, differentiator copy, Service/Market/Project/
  Position bodies, Safety's certifications/practices) renders through
  `@portabletext/react` via the shared `components/RichBody.tsx`, not
  flattened plain strings. `seoDescription` and short card/hero blurbs were
  deliberately left as plain text (meta tags can't hold markup; tight
  layouts don't want headings/lists).
- **Bottom CTA band** (`components/DetailCta.tsx`) on Home, Services,
  Markets, and Projects — per-page-type copy and six Studio-editable
  colors (background/eyebrow/heading/button bg/button text/phone).
  Careers and the listing pages (`/services`, `/markets`, `/projects`)
  don't have one yet.
- **Project detail pages** (`components/ProjectDetails.tsx`): a bordered
  card with body text + lead image on the left, a specs sidebar (location/
  GC/owner/size/completion date/services) on the right, and a gallery grid
  below — all sections gracefully collapse when data is sparse or missing
  instead of leaving broken grids/empty boxes.
- **Careers** job cards use the same spec-sidebar pattern (role type/
  employment type/location) instead of tiny inline tags.
- **Testimonials** support an optional company logo (fixed-height row so
  cards stay aligned whether or not a logo is set).
- **Safety page** (`app/safety/page.tsx`) was a hardcoded "Content coming
  soon." placeholder — now a real page: credentials strip (reuses Home's
  stats), approach pillars, certifications badges, site practices, and a
  safety-contact line. Coordination text and a downloadable safety
  document field exist in Studio but are empty — the client hasn't
  provided that content yet.
- **Sanity Studio branding**: custom icon (`components/StudioLogo.tsx`,
  cropped from the real brand mark) via the `icon` config field — note
  `studio.components.logo` is deprecated in this Sanity version and does
  nothing.
- **Sanity Studio navigation** was restructured (`structure.ts`) — each
  page's settings are now grouped with its related content collection
  (e.g. one "Services" item containing both "Page Settings" and "All
  Services"), instead of "Services" appearing twice at the top level with
  no way to tell them apart.

## Known open items

- **Sanity Studio nav restructure needs a final look.** A "Pane returned
  no child" console warning appeared once during a live HMR reload right
  after the restructure — most likely a stale deep-link from the old nav
  shape resolving against the new tree, not a bug in the new structure.ts,
  but this was never confirmed against a real authenticated screenshot
  (Puppeteer can't get past Sanity's login without a saved session). If
  anything in the sidebar looks broken, that's the first place to check.
- **Safety page content is incomplete by design, not by accident.**
  `coordination` and `safetyDocument` are empty; `certifications` and
  `sitePractices` do have real client-provided content, but one
  `sitePractices` bullet links out to `smithpropainting.com` (a
  competitor's blog) as a citation — worth a second look before this is
  considered final.
- **Dev server stale-chunk issue**: both the Next.js and Sanity Studio dev
  servers occasionally serve stale/broken chunks (`ChunkLoadError`, or
  config changes not hot-reloading) after a long stretch of file edits.
  Fix is always the same: kill the process, `rm -rf .next` (Next.js) or
  clear `node_modules/.sanity` + `node_modules/.vite` + `.sanity`
  (Studio), restart. Config-level changes (`sanity.config.ts`,
  `structure.ts`) especially seem to need a full restart, not just a
  browser refresh.
- **Listing pages have no closing CTA**: `/services`, `/markets`,
  `/projects` (the grid pages, not individual detail pages) only have a
  hero, same gap Home used to have.
- Everything already flagged in `PRE-LAUNCH-CHECKLIST.md` is unverified
  against current state — that file predates this session's work and
  needs a fresh pass, not blind trust.

## If you're a fresh Claude Code session reading this

Don't re-derive the CMS architecture from scratch — read this file and the
Studio repo's PROJECT-STATUS.md first. The Studio repo is a **separate git
repo** at `studio-schnurr-painting-website`, not a subfolder of this one.
