# Pre-Launch Checklist

A running log of things to come back to and finalize before this site is
genuinely ready to go live and be handed off. Add to this as things come up —
don't fix in the moment unless it's quick; note it here and keep moving.

Nothing in this list is blocking day-to-day work. It's a landing pad so real
loose ends don't get lost or forgotten under the pace of everything else.

---

## Ownership & Access

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

## Content Gaps (verified, not guessed — checked directly against the repo)

- [ ] **Favicon is still Astro's default rocket-ship icon**, not Schnurr
      branding. `public/favicon.ico` / `favicon.svg` need to be replaced with
      the real logo mark.
- [ ] **No `robots.txt` or sitemap exist.** Worth adding before launch for
      basic SEO/crawler behavior — trivial to add via Astro's sitemap
      integration.
- [ ] **`/privacy` and `/terms` are dead links.** Footer links to both;
      neither page exists. Need real legal pages (or at minimum placeholder
      ones) before this is genuinely launch-ready — a live site with a
      Privacy Policy link that 404s is a bad look and possibly a compliance
      issue depending on what data the forms collect.
- [ ] **Resources collection has exactly one entry** (Capability Statement),
      and it's still placeholder text with no actual file attached — the
      resource card exists but doesn't do anything real yet.
- [ ] **Team collection has only one member** (the owner). If Field
      Operations Manager / Project Manager / Estimator roles are still part
      of the plan, those need real entries.
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
- [ ] **Careers page** — you've said this will definitely be restructured;
      current version is a generic placeholder-style page using the same
      template as About/Safety.

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

## Billable Items to Schnurr

Running total of real costs incurred during the build, to invoice at handoff.

- Anthropic: $12
- Netlify: $9

---

*Last updated: this file was created during the site build process. Add a
line here with the date whenever a section gets a real pass, so it's obvious
what's stale.*
