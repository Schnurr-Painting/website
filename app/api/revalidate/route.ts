import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { purgeCache } from '@netlify/functions';
import crypto from 'crypto';

// All collection tags used across lib/content.ts. A GitHub push webhook
// fires on every commit regardless of which files changed — parsing the
// payload to figure out exactly which content collections were touched
// would add real complexity for limited benefit, so this just busts all
// of them on every push. Not perfectly surgical, but simple, safe, and
// still vastly faster than a full site rebuild.
const ALL_COLLECTION_TAGS = [
  'content:services',
  'content:markets',
  'content:projects',
  'content:team',
  'content:testimonials',
  'content:positions',
  'content:resources',
];

/**
 * Verifies a GitHub webhook's HMAC-SHA256 signature. GitHub computes
 * this using whatever secret is entered in the webhook's own "Secret"
 * field on github.com — NOT a custom header, since GitHub's webhook UI
 * doesn't support adding arbitrary headers. Both sides (GitHub's secret
 * field, and REVALIDATE_SECRET here) must be set to the same value.
 */
function isValidGithubSignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader) return false;
  const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex');

  // Constant-time comparison — timing-safe, avoids leaking info about
  // how much of the signature matched via response-time differences.
  const expectedBuf = Buffer.from(expected);
  const actualBuf = Buffer.from(signatureHeader);
  if (expectedBuf.length !== actualBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}

export async function POST(request: NextRequest) {
  const t0 = Date.now();

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: 'REVALIDATE_SECRET is not configured on this deployment.' },
      { status: 500 }
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get('x-hub-signature-256');

  if (!isValidGithubSignature(rawBody, signature, process.env.REVALIDATE_SECRET)) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 401 });
  }

  const tRevalidateStart = Date.now();
  ALL_COLLECTION_TAGS.forEach((tag) => revalidateTag(tag));
  const tRevalidateEnd = Date.now();
  console.log(`[revalidate] revalidateTag() for ${ALL_COLLECTION_TAGS.length} tags took ${tRevalidateEnd - tRevalidateStart}ms`);

  // revalidateTag() alone only invalidates Next.js's own internal data
  // cache — it does NOT clear Netlify's separate CDN edge cache sitting
  // in front of it. Netlify's Next.js Runtime documents "automatic
  // fine-grained caching" that's supposed to bridge the two using the
  // same tag names, but there's real-world evidence this doesn't always
  // work reliably (netlify/next-runtime#1085). This explicit purge call
  // is belt-and-suspenders: it uses the exact same tag strings already
  // used in lib/content.ts's fetch() calls, trusting Netlify's
  // documented automatic tag-mapping — but doesn't rely on that mapping
  // being the only mechanism in play.
  const tPurgeStart = Date.now();
  try {
    await purgeCache({ tags: ALL_COLLECTION_TAGS });
    console.log(`[revalidate] purgeCache() took ${Date.now() - tPurgeStart}ms`);
  } catch (err) {
    // Don't fail the whole request if the CDN purge call itself has a
    // problem — revalidateTag() above still ran, so Next.js's own cache
    // is correct even if this extra step didn't succeed.
    console.error(`[revalidate] purgeCache() FAILED after ${Date.now() - tPurgeStart}ms:`, err);
  }

  const totalMs = Date.now() - t0;
  console.log(`[revalidate] TOTAL webhook handler time: ${totalMs}ms`);

  return NextResponse.json({ revalidated: true, tags: ALL_COLLECTION_TAGS, totalMs, now: Date.now() });
}

// Convenience for sanity-checking the route exists and responds, without
// needing a real signed GitHub payload handy.
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'GitHub webhook target. Configure the webhook secret in GitHub to match REVALIDATE_SECRET here.',
  });
}
