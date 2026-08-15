import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Confirmed via real testing: an empty function log after a hard
// refresh means the request never reached the server at all — it was
// served entirely from Netlify's CDN edge cache. That rules out
// browser caching (already separately confirmed fixed) as the current
// problem. The remaining gap: the webhook calls purgeCache({ tags })
// against Netlify's CDN, but nothing was ever tagging the actual page
// RESPONSES with matching Netlify-Cache-Tag headers in the first
// place — Next.js's own `next: { tags }` fetch option only affects
// Next.js's internal data cache, not Netlify's separate CDN tag
// system. A purge call against tags nothing was ever tagged with has
// nothing real to match, so the old cached page just stays put
// indefinitely.
//
// This maps each route to the content tags relevant to it and sets
// Netlify-Cache-Tag accordingly, so purgeCache() in the webhook route
// actually has something real to evict.
function getContentTagsForPath(pathname: string): string[] {
  if (pathname === '/') {
    return ['content:services', 'content:markets', 'content:projects', 'content:testimonials'];
  }
  if (pathname === '/services' || pathname.startsWith('/services/')) {
    const id = pathname.split('/')[2];
    return id ? [`content:services`, `content:services:${id}`] : ['content:services'];
  }
  if (pathname === '/markets' || pathname.startsWith('/markets/')) {
    const id = pathname.split('/')[2];
    return id ? [`content:markets`, `content:markets:${id}`] : ['content:markets'];
  }
  if (pathname === '/projects' || pathname.startsWith('/projects/')) {
    const id = pathname.split('/')[2];
    return id ? [`content:projects`, `content:projects:${id}`] : ['content:projects'];
  }
  if (pathname === '/about') {
    return ['content:team'];
  }
  if (pathname === '/careers') {
    return ['content:positions'];
  }
  if (pathname === '/resources') {
    return ['content:resources'];
  }
  return [];
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Browsers: always check freshness with the server on a normal
  // refresh instead of silently reusing a stale local copy.
  response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');

  // Netlify's own CDN: can cache long-lived, since it's explicitly
  // purged by tag whenever the revalidation webhook fires.
  response.headers.set('Netlify-CDN-Cache-Control', 'public, max-age=31536000, must-revalidate');

  // Tag the actual cached response so purgeCache({ tags }) in the
  // webhook route has something real to evict.
  const tags = getContentTagsForPath(request.nextUrl.pathname);
  if (tags.length > 0) {
    response.headers.set('Netlify-Cache-Tag', tags.join(','));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images/|admin/).*)'],
};
