# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## This is one of two repos

This is the **Next.js frontend only**. The Sanity CMS (schema, Studio admin
UI, content structure) lives in a **separate sibling repo**:
`../studio-schnurr-painting-website` (GitHub: `Schnurr-Painting/sanity-studio`).
Changes to what content editors can enter require editing that repo's
schema; changes to how content renders happen here. Read `NEXT_STEPS.md` in
this repo and `PROJECT-STATUS.md` in the Studio repo for current project
state before making assumptions.

## Commands

```
npm run dev     # start dev server (localhost:3000)
npm run build   # production build
npm run start   # start production server (after build)
npm run lint    # next lint (ESLint)
```

There is no test suite. To lint a single file without going through
`next lint`: `npx eslint <file> --no-eslintrc -c .eslintrc.json`.

`npx tsc --noEmit` currently fails repo-wide on a pre-existing
`tsconfig.json` issue (`ignoreDeprecations: "6.0"` incompatible with the
installed TypeScript version) — this is unrelated to code correctness and
predates recent work; don't treat it as a real type error signal.

Requires `.env.local` with `NEXT_PUBLIC_SANITY_PROJECT_ID` and
`NEXT_PUBLIC_SANITY_DATASET`.

### Dev server stale-chunk issue

After a long stretch of file edits, both this repo's and the Studio repo's
dev servers can start serving stale/broken chunks (`ChunkLoadError`, or
config changes silently not taking effect). A browser refresh isn't always
enough. Fix: kill the process, `rm -rf .next`, restart `npm run dev`.

## Architecture

Next.js 14 App Router, no `src/` directory. Styling is CSS Modules
throughout (`*.module.css` next to each component/page) — not Tailwind.
Shared design tokens (colors, fonts) live in `app/globals.css` as CSS
custom properties: `--ink`, `--gold`/`--orange` (same value), `--paper`,
`--cream`, `--line`, `--body`, `--navy`, `--display` (Lora), `--utility`
(Barlow Condensed), `--body-font` (Inter).

### Content fetching — two distinct patterns

- **`lib/content.ts`** — repeatable collections (projects, services,
  markets, team members, testimonials, resources, positions) via
  `getCollection(name)` / `getEntry(name, id)`. Maps old Decap-CMS-era
  folder names to Sanity document types via `TYPE_MAP`. Project/Service/
  Market use a real `slug` field for routing; everything else uses the
  Sanity document `_id`.
- **`lib/sanity/queries.ts`** — singleton documents: site-wide settings
  (`getSiteSettings`, `getSiteFooter`, `getSharedLabels`), the Home page
  (`getHomePage`), and the shared "standard page" shape used by Services/
  Markets/Projects/Resources/About/Safety/Careers/Contact (`getPage(name)`
  — hero, story, storyImage, sections, plus Safety-specific fields fetched
  generically for all page types since GROQ just returns null where a
  field doesn't exist). Also `getDetailCta(name)` for the bottom CTA band.
- **Every fetch passes `{cache: 'no-store'}`.** This is required — Next.js
  caches `fetch()` indefinitely by default, and without this flag, Sanity
  content edits wouldn't appear without a full server restart. Always
  include it on new queries.

### Rich text

Sanity's Portable Text is rendered via `@portabletext/react`, through the
shared `components/RichBody.tsx` (exports both a `<RichBody value={...}>`
wrapper component with its own typographic styles, and the bare
`richBodyComponents` config for call sites that need custom wrapping, e.g.
Careers page reusing its own `.positionDescription` typography). Don't
render Portable Text fields as raw strings — `lib/content.ts`'s
`ContentEntry.body` is typed `any[]` (raw blocks), not `string`.

### Recurring page pattern

Interior pages (`app/{about,services,markets,...}/page.tsx`) generally
follow: `<InteriorHero>` (color/style props sourced from Sanity's
`heroBanner` object type) → page-specific content sections → optionally
`<DetailCta>` (the bottom CTA band, Studio-editable per page type on Home/
Services/Markets/Projects only — Careers and the listing pages don't have
one). Detail pages (`app/{services,markets,projects}/[id]/page.tsx`) use
`getEntry()` and generally end with a body/spec-sidebar layout (see
`components/ProjectDetails.tsx` for the fullest example — sidebar and
gallery grids gracefully collapse when data is sparse rather than leaving
broken layouts).

### "Request a Bid" modal

`components/RequestBidModal.tsx` is mounted once, globally, inside
`SitePage.tsx` (the layout wrapper every page uses). It's triggered from
anywhere — including plain server components — via a `window` bridge:
client components check `typeof window !== 'undefined' && window.openBidModal`
and call it, rather than each button owning its own modal state.
