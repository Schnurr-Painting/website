import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
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

  ALL_COLLECTION_TAGS.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({ revalidated: true, tags: ALL_COLLECTION_TAGS, now: Date.now() });
}

// Convenience for sanity-checking the route exists and responds, without
// needing a real signed GitHub payload handy.
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'GitHub webhook target. Configure the webhook secret in GitHub to match REVALIDATE_SECRET here.',
  });
}
