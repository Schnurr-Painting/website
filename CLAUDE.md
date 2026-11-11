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
- **Every query goes through `sanityFetch()`** in `lib/sanity/client.ts`,
  which applies `{cache: 'no-store'}` (Next.js caches `fetch()` forever by
  default, so without it Sanity edits wouldn't appear) and handles preview
  mode. Never call `client.fetch` directly.

### Visual editing (preview mode)

The Studio's **Visual Editor** (Sanity Presentation tool, configured in the
Studio repo's `presentation.ts`) loads this site in an iframe and calls
`/api/draft-mode/enable`. In draft mode, `sanityFetch` reads drafts with the
`SANITY_API_READ_TOKEN` (Viewer token, Netlify env var, secret) and turns on
stega: invisible markers in strings that `<VisualEditing />` (mounted in
`app/layout.tsx` only in draft mode) turns into click-to-edit overlays.
Stega would corrupt values used as CSS or logic (colors, fonts, slugs,
emails, `showOn`, `visibility`…), so `client.ts` filters those by field name
(`NON_TEXT`). **If you add a field whose value drives styling or logic,
add its name there.** `lib/sanity/env.ts` holds the shared settings that
client components may import (client.ts uses `next/headers`, server-only).

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

## Photo click-to-edit (Visual Editor)

Text is click-to-edit automatically (stega). Photos are not: tag the
element with `data-sanity={editAttr(doc, 'fieldPath')}` from
`lib/sanity/edit.ts`. The doc needs `_id` and `_type`, so queries for
anything with a photo must project them (see `lib/content.ts`,
`getHomePage`, `getPage`). List items use `field[_key=="..."]` paths, so
project `_key` too (e.g. `galleryKeys`, hero `slides[]._key`).
