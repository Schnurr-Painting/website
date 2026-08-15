#!/usr/bin/env bash
# Netlify's "ignore build" hook. Runs before every triggered build and
# decides whether the build should actually happen.
#
# Exit 0 = SKIP this build.
# Exit 1 (or any non-zero) = PROCEED with the build.
#
# WHY THIS EXISTS: Decap edits to markdown COLLECTIONS (Services,
# Markets, Projects, Team, Testimonials, Positions, Resources — all
# under src/content/) are handled by an on-demand revalidation webhook
# (see app/api/revalidate/route.ts) that regenerates just the affected
# page in low single digits of seconds — no full rebuild needed.
#
# IMPORTANT — data/*.json (Home hero text, other page copy, Site
# Settings) is explicitly NOT covered by that webhook. Those pages still
# read via static import at build time, same as before tonight's work.
# Skipping the build for changes to those files would mean the edit
# published to GitHub correctly but NEVER actually appeared on the live
# site until some unrelated future full rebuild happened to fire — this
# happened for real during testing (a Home page text edit silently
# never went live) before this was caught and fixed. Only src/content/
# and public/images/uploads/ are safe to skip; data/ is deliberately
# NOT in this list until JSON page files get the same async treatment.

# No previous commit to diff against (e.g. very first deploy on a new
# site) — don't try to be clever, just build.
if [ -z "$CACHED_COMMIT_REF" ]; then
  echo "No previous commit to compare against — building."
  exit 1
fi

CHANGED_FILES=$(git diff --name-only "$CACHED_COMMIT_REF" "$COMMIT_REF")

if [ -z "$CHANGED_FILES" ]; then
  echo "No changed files detected — skipping build."
  exit 0
fi

# Anything that does NOT match a path actually covered by on-demand
# revalidation. data/ is deliberately excluded — see note above.
NON_CONTENT_CHANGES=$(echo "$CHANGED_FILES" | grep -vE '^(src/content/|public/images/uploads/)')

if [ -z "$NON_CONTENT_CHANGES" ]; then
  echo "Only content files changed:"
  echo "$CHANGED_FILES"
  echo "Skipping full build — handled by the on-demand revalidation webhook instead."
  exit 0
else
  echo "Non-content files changed, full build required:"
  echo "$NON_CONTENT_CHANGES"
  exit 1
fi
