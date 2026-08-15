import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// All collection tags used across lib/content.ts. When the webhook
// fires (on every commit, regardless of which files changed — GitHub
// doesn't tell us which content collections were touched without much
// more complex payload parsing), this busts all of them. That's not
// perfectly surgical, but it's simple, safe, and still vastly faster
// than a full site rebuild — revalidateTag() calls are cheap.
const ALL_COLLECTION_TAGS = [
  'content:services',
  'content:markets',
  'content:projects',
  'content:team',
  'content:testimonials',
  'content:positions',
  'content:resources',
];

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret');

  if (!process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: 'REVALIDATE_SECRET is not configured on this deployment.' },
      { status: 500 }
    );
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid or missing secret.' }, { status: 401 });
  }

  ALL_COLLECTION_TAGS.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({ revalidated: true, tags: ALL_COLLECTION_TAGS, now: Date.now() });
}

// Convenience for manually testing this endpoint from a browser — real
// webhook calls use POST, this just makes it easy to sanity-check the
// route exists and responds without needing a POST tool handy.
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: 'POST here with header x-revalidate-secret to trigger revalidation.',
  });
}
