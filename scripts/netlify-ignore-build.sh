#!/usr/bin/env bash
# Netlify's "ignore build" hook. Runs before every triggered build and
# decides whether the build should actually happen.
#
# Exit 0 = SKIP this build.
# Exit 1 (or any non-zero) = PROCEED with the build.
#
# WHY THIS EXISTS: Decap edits (via /admin) only ever touch files under
# src/content/, data/, or public/images/uploads/. Those are handled by
# an on-demand revalidation webhook (see app/api/revalidate/route.ts)
# that regenerates just the affected page in low single digits of
# seconds — no full rebuild needed. Without this script, Netlify was
# running a full 40-50 second build on every single content edit
# anyway, completely masking whether the fast webhook path was even
# working, since both mechanisms were racing and the slow one always
# "won" by virtue of being the only one anyone could see finish.
#
# Any change OUTSIDE those content paths (app/, components/, lib/,
# package.json, etc.) is real code and still needs a normal full build.

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

# Anything that does NOT match a Decap-editable content path.
NON_CONTENT_CHANGES=$(echo "$CHANGED_FILES" | grep -vE '^(src/content/|data/|public/images/uploads/)')

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
