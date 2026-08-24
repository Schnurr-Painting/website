import { NextRequest, NextResponse } from 'next/server';
import { getStore } from '@netlify/blobs';

// Multipart/form-data submissions to Netlify Forms fail on this site (a
// confirmed Netlify + Next.js Runtime bug — plain url-encoded submissions
// work fine, only the file-upload encoding triggers a 500). This route
// sidesteps it entirely: Next.js's own request.formData() parses the
// upload directly (no dependency on Netlify's form-multipart proxy), the
// resume goes to Netlify Blobs, and the rest of the fields still go to
// Netlify Forms as plain url-encoded data — so the existing notification
// email keeps working unchanged, just with a download link added.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://schnurr-painting-nextjs.netlify.app';
const TEXT_FIELDS = ['name', 'email', 'phone', 'roleInterest', 'experience', 'message', 'appliedForPosition'];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    let resumeUrl = '';
    const resume = formData.get('resume');
    if (resume instanceof File && resume.size > 0) {
      const store = getStore('job-application-resumes');
      const key = `${crypto.randomUUID()}-${resume.name}`;
      await store.set(key, await resume.arrayBuffer(), {
        metadata: { contentType: resume.type, originalName: resume.name },
      });
      resumeUrl = `${SITE_URL}/api/resume/${encodeURIComponent(key)}`;
    }

    const body = new URLSearchParams();
    body.append('form-name', 'job-application');
    for (const field of TEXT_FIELDS) {
      const value = formData.get(field);
      if (value) body.append(field, String(value));
    }
    body.append('resumeUrl', resumeUrl || '(no resume attached)');

    const response = await fetch(`${SITE_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`Netlify Forms submission failed: ${response.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Job application submission failed:', error);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
