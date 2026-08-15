import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Confirmed via real testing: a hard refresh (bypasses the browser's
// own cache) shows content edits immediately, while a normal refresh
// keeps showing stale content. That means the actual revalidation
// pipeline — webhook, revalidateTag, Netlify CDN purge, live GitHub
// fetch — is working correctly and fast (proven separately via server
// logs: every page render completes in well under a second). The
// remaining problem is purely that browsers are trusting their own
// local cached copy without ever checking back with the server on a
// normal refresh.
//
// This sets two separate cache directives:
// - Cache-Control (what browsers obey): max-age=0 + must-revalidate,
//   so a normal refresh always asks the server "is this still fresh?"
//   instead of silently reusing a stale local copy.
// - Netlify-CDN-Cache-Control (what Netlify's own edge network obeys,
//   separately from the browser-facing header): can stay long-lived,
//   since that layer is what actually gets explicitly purged by tag
//   whenever the revalidation webhook fires — no reason to also force
//   it to revalidate on every single request.
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  response.headers.set('Netlify-CDN-Cache-Control', 'public, max-age=31536000, must-revalidate');

  return response;
}

export const config = {
  // Applies to page routes only — static assets (JS/CSS bundles, images,
  // favicon) are content-hashed and genuinely safe to cache long-term in
  // the browser, unlike page HTML which changes based on CMS content.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/|admin/).*)'],
};
