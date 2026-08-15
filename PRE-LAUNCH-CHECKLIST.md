# Pre-Launch Checklist

A running log of things to come back to and finalize before this site is
genuinely ready to go live and be handed off. Add to this as things come up —
don't fix in the moment unless it's quick; note it here and keep moving.

Nothing in this list is blocking day-to-day work. It's a landing pad so real
loose ends don't get lost or forgotten under the pace of everything else.

---

## Ownership & Access

- [ ] **Two GitHub personal access tokens exist — only one is actually
      used.** A fine-grained token was created first, turned out to be
      incompatible with Netlify's Git Gateway (documented GitHub
      limitation — fine-grained tokens don't reliably work for
      organization-owned repos in every scenario), and was abandoned.
      A **classic** token replaced it and is what's actually wired into
      both Git Gateway and `GITHUB_CONTENT_TOKEN`. The fine-grained one
      is still sitting unused in the password manager — not harmful, but
      renamed the classic one's GitHub label to make this unambiguous
      going forward (`CLASSIC — Netlify (Git Gateway + Content Token)`).
      Worth deleting the unused fine-grained one eventually, low
      priority.

- [ ] **Transfer Netlify project ownership to Schnurr.** Currently under Rick's
      personal account (deliberately, to stay on the free/personal tier —
      see the earlier conversation about GitHub org vs. personal account
      billing implications). Confirm what tier Schnurr's own account needs to
      be on before transfer, since the personal-account cost workaround won't
      carry over automatically.
- [ ] **Document all logins and credentials** in one place Schnurr can
      actually access after handoff: Netlify account, GitHub repo access,
      Decap/Identity accounts and who has them, domain registrar (wherever
      the actual domain is/will be registered — not yet confirmed).
- [ ] **Provision Schnurr users in Decap/Netlify Identity before the onboard
      meeting.** Whoever at Schnurr needs CMS access should have working
      logins walking in, not be set up live during the meeting.
- [ ] **Update DNS** — point the real domain at Netlify once it's decided
      which site (Astro or Next.js) is going live and ownership/registrar
      questions above are settled.
- [ ] **Confirm Netlify Identity Registration is set to "Invite only."** It
      was deliberately switched to "Open" temporarily so the first account
      could be self-registered, then supposed to be switched back. Verify
      this actually happened before launch — Open registration means anyone
      who finds `/admin` can create their own CMS account.
- [ ] **Decide on Decap role restrictions.** Right now the `git-gateway`
      backend has no `roles:` field set, meaning *any* successfully logged-in
      Identity user gets full CMS write access — no tiers between "can edit
      team bios" and "can edit pricing/services." Fine for one person; worth
      a real decision before inviting multiple Schnurr staff.

## Forms & Notifications

- [ ] **Notifications set up but not arriving — likely Netlify hard-bounce/
      suppression list.** Submissions land correctly in the dashboard;
      recipient email confirmed configured but nothing arrives, no error
      shown anywhere. This matches a well-documented, currently-active
      Netlify issue (multiple recent forum reports, same symptom): once an
      address is on Netlify's internal suppression list, it silently drops
      all future notifications with no visible error. **Diagnostic:**
      temporarily point the notification at a personal Gmail (or any
      known-good address) and test — if that one arrives, it confirms the
      theory, and the real fix requires contacting Netlify Support directly
      to clear the actual address (not fixable from dashboard settings
      alone).
- [ ] **Contact Us success notification looks unusual — needs investigation.**
      Flagged as "off" but the specifics weren't captured in the moment.
      Revisit and document exactly what's wrong (wording? styling? wrong
      trigger?) before deciding on a fix.
- [ ] **Build a confirmation email to the form submitter** (Request a Bid and
      Contact forms both). Confirmed wanted, not yet built. Currently the
      submitter only sees an on-page "Request Sent" confirmation — no email
      goes to them. Netlify supports form autoresponses; needs deliberate
      setup (a response template per form, likely configured in the Netlify
      dashboard rather than pure code) plus the same real-Schnurr-email
      question as the recipient notifications above — confirm what address
      it should send *from* before building.
- [ ] **Test both forms end-to-end** once notifications are confirmed
      working: submit a real entry, confirm it lands in the Netlify
      dashboard *and* triggers an actual email, not just one or the other.
- [ ] **Verify where the resume file upload actually lands.** The Job
      Application form (Careers page) includes a real file input for
      resumes, submitted via Netlify Forms. Need to confirm: does the
      uploaded file show up as a downloadable attachment on the
      submission in the Netlify dashboard, and is that location obvious
      enough for whoever's reviewing applications to actually find it —
      not yet verified with a real test submission.

## Content Gaps (verified, not guessed — checked directly against the repo)

- [ ] **Favicon is still Astro's default rocket-ship icon**, not Schnurr
      branding. `public/favicon.ico` / `favicon.svg` need to be replaced with
      the real logo mark.
- [ ] **Build sitemap and add `robots.txt`.** Neither exists yet. Worth
      adding before launch for basic SEO/crawler behavior — trivial to add
      via Astro's sitemap integration.
- [ ] **Review SEO overall** — titles, meta descriptions, alt text, heading
      structure across all pages. Not yet audited page by page.
- [ ] **Build schema (structured data)** — Organization/LocalBusiness JSON-LD
      at minimum, so search engines and AI answer engines can actually parse
      who Schnurr is, what they do, and where. Not started.
- [ ] **`/privacy` and `/terms` are dead links.** Footer links to both;
      neither page exists. Need real legal pages (or at minimum placeholder
      ones) before this is genuinely launch-ready — a live site with a
      Privacy Policy link that 404s is a bad look and possibly a compliance
      issue depending on what data the forms collect.
- [ ] **Review Services pages — content direction still unclear.** Not sure
      yet what should actually go on these pages beyond the short
      descriptions already in place. Needs a real content pass, not a
      structural fix.
- [ ] **Build out the Capability Statement / capabilities section for real.**
      Currently one placeholder Resources entry with no attached file.
      Schnurr needs to drive what actually goes in it (project history,
      bonding capacity, safety record, etc.) — not something to guess at
      from this end.
- [ ] **Team collection now has 2 members** (Jason Schnurr, Christine Vasta —
      the latter added since this checklist was first written). Still worth
      confirming whether other planned roles (Field Operations Manager,
      Project Manager, Estimator) are part of the launch plan or come later.
- [ ] **Testimonials collection has zero approved entries** — the homepage
      Testimonials section and every page's TestimonialsBand correctly show
      nothing right now, which is expected behavior, but means the site has
      no social proof live anywhere yet.
- [ ] **Team headshot is a hotlinked LinkedIn CDN URL**, not an uploaded
      asset — the URL has what looks like a built-in expiration (~December
      2026 based on the timestamp in it). Should be downloaded and
      re-uploaded through Decap's actual media library so it doesn't quietly
      break later.
- [ ] **Footer's "LinkedIn" social field currently contains a Facebook URL.**
      Might be intentional (no LinkedIn presence yet, Facebook substituted),
      but worth confirming rather than assuming — the field label and the
      actual link don't match.
- [ ] **Market and service detail pages still have placeholder content** in
      places — flagged earlier in the original site audit, not yet resolved.
- [ ] **Careers page — status unclear, needs a fresh look.** Originally
      flagged as "generic placeholder-style page using the same template as
      About/Safety," but a direct check now shows it actually renders a real
      `PositionsList` component with the live Interior Painter posting —
      either this was built after the original flag, or the hero wrapper
      (`CompanyPage.astro`) differs enough from About/Safety that the
      original claim doesn't fully hold. Worth deciding if this item is
      actually resolved or if there's still a real gap being missed.

## Structural / Deferred Decisions

- [ ] **Header/footer navigation is hardcoded**, not Decap-editable. Fine for
      now; revisit if the nav needs to change without a code deploy.
- [ ] **"Add a page" CMS feature** — discussed, feasible, deliberately not
      built yet. Revisit once existing pages are actually filled in.
- [ ] **Shared Section Labels** (testimonials eyebrow, team section heading,
      detail-page CTA) — you've flagged wanting to split these into
      per-page/per-template unique fields instead of one shared global file.
      Revisit before launch since it affects content structure, not just
      copy.
- [ ] **Client portal — build with Adrian.** Separate subdomain, separate
      server, per earlier discussion. Not started; scope/timeline depends on
      Adrian's availability.

## Billable Items to Schnurr

Running total of real costs incurred during the build, to invoice at handoff.

- Anthropic: $12
- Netlify: $9

## CMS Editor Experience

- [ ] **Decap's right-hand preview pane — Phase 1 built, needs live
      verification.** Root cause confirmed: no custom preview template was
      registered for any collection, so Decap fell back to a raw
      unstyled field dump. Built real preview templates for the three
      collections seeing active use — **Positions, Team, Testimonials**
      (`public/admin/preview-templates.js`) — using plain React via CDN
      (no build step added) and reusing the site's actual CSS variables
      via `CMS.registerPreviewStyle`, so colors/fonts stay in sync with
      the real site automatically. Also surfaces hidden-state warnings
      directly in the preview (inactive position, unapproved
      testimonial, team member hidden from About) — answers "will this
      actually show up" without needing to publish first. Login now
      confirmed working (Netlify Identity widget issue resolved); preview
      pane itself still needs a real check now that login works.
      Phase 2 (a shared hero preview for Pages + Services/Markets/Projects)
      and Phase 3 (Resources, Site Settings) still remain, lower priority.
- [ ] **"Check for Preview" button does nothing — root cause confirmed,
      decision made.** It's an editorial-workflow-only feature (checks
      whether a separate Netlify branch-deploy finished building); this
      site uses simple/direct-publish mode, so there's no separate
      preview deploy for it to check. Decided to stay in simple mode
      rather than switch to editorial workflow (would add a draft/review
      step to every future edit, not something needed right now). **Hide
      it via CSS** — genuinely inert and confusing, directly requested.
- [ ] **Hide the Decap icon with up/down arrows** (next to "Check for
      Preview" in the entry editor toolbar). Not yet identified exactly
      what it does — needs a quick look before deciding whether to hide
      it outright or just relabel/explain it.

## Next.js Migration (parallel site — `schnurr-painting-nextjs`)

A second full build of the site now exists in parallel, on a separate branch
(`nextjs-migration`) and separate Netlify project, exploring a move off Astro
for faster iteration. Not yet decided whether/when this actually goes live.
Its own set of gaps, distinct from the Astro items above:

- [ ] **Netlify Identity was just enabled on this site** — registration mode
      (open vs. invite-only) not yet locked down, same risk flagged above
      for the Astro site. Login flow itself is now confirmed working.
- [ ] **Decap admin (`config.yml`, preview templates) copied verbatim from
      Astro.** Login now works, but the preview pane has never been tested
      live on this branch, and the preview templates were built assuming
      Astro's global CSS setup — real risk they render broken or unstyled
      against this site's CSS Modules approach. Needs a real check, not an
      assumption it carries over cleanly.
- [ ] **Forms/notifications never tested end-to-end on this site at all** —
      separate Netlify Forms setup from the Astro site, zero real
      verification yet.
- [ ] **"Send Us Your Resume" button on Careers opens the Request-a-Bid
      form, not an actual resume upload.** ~~It reuses the bid modal as a
      placeholder rather than a dedicated application flow with file
      upload.~~ **Resolved** — built a real `ApplicationModal` matching
      the field set Astro already had (name, email, phone, role,
      experience, file upload, message).
- [ ] **Application form's "Experience" field placeholder text is too
      long for the field width** — reads as cut-off/cramped rather than
      helpful. Needs a shorter placeholder or a smaller font, not a
      structural fix.
- [ ] **This branch has its own separate copy of `src/content/`.** Content
      edited via Decap on one branch does not appear on the other — the two
      sites will silently drift apart until a real cutover decision is made
      and one becomes the source of truth.
- [ ] All Astro-side Content Gaps above (favicon, robots.txt/sitemap, SEO,
      schema, /privacy /terms, Services page content, Capability Statement,
      etc.) apply equally here and haven't been separately re-verified on
      this branch.

---

*Last updated: this file was created during the site build process. Add a
line here with the date whenever a section gets a real pass, so it's obvious
what's stale.*
