import { NextRequest, NextResponse } from 'next/server';
import { getStore } from '@netlify/blobs';

export async function GET(request: NextRequest, { params }: { params: { key: string } }) {
  const store = getStore('job-application-resumes');
  const key = decodeURIComponent(params.key);

  const result = await store.getWithMetadata(key, { type: 'arrayBuffer' });
  if (!result) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const { data, metadata } = result;
  const contentType = (metadata?.contentType as string) || 'application/octet-stream';
  const originalName = (metadata?.originalName as string) || 'resume';

  return new NextResponse(data, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${originalName.replace(/"/g, '')}"`,
    },
  });
}
