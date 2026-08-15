import matter from 'gray-matter';

const GITHUB_OWNER = 'Schnurr-Painting';
const GITHUB_REPO = 'website';
const GITHUB_BRANCH = 'nextjs-migration';
// Optional: raises the GitHub API rate limit from 60/hr (unauthenticated)
// to 5000/hr. Public repo, so this works without it too, just with a much
// lower ceiling — worth setting as a Netlify env var for real usage.
const GITHUB_TOKEN = process.env.GITHUB_CONTENT_TOKEN;

// Safety-net revalidation — even if the webhook never fires for some
// reason, content won't be more than an hour stale. The webhook (see
// app/api/revalidate/route.ts) is what makes this near-instant in
// practice; this is just a fallback, not the primary mechanism.
const FALLBACK_REVALIDATE_SECONDS = 3600;

export interface ContentEntry<T = Record<string, any>> {
  id: string;
  data: T;
  body: string;
}

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = { Accept: 'application/vnd.github.v3+json' };
  if (GITHUB_TOKEN) headers.Authorization = `token ${GITHUB_TOKEN}`;
  return headers;
}

/**
 * Reads all markdown files in a content collection directory, fetched
 * live from GitHub at request/revalidation time — NOT read from the
 * local filesystem at build time. This is what makes on-demand
 * revalidation possible: a serverless function has no access to a
 * "live" local checkout of the repo the way a build container does, so
 * fetching from GitHub's API is what lets a single revalidation call
 * regenerate a page with genuinely current content instead of whatever
 * was on disk during the last full build.
 */
export async function getCollection<T = Record<string, any>>(
  collectionName: string
): Promise<ContentEntry<T>[]> {
  const t0 = Date.now();
  const dirUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/src/content/${collectionName}?ref=${GITHUB_BRANCH}`;

  const res = await fetch(dirUrl, {
    headers: githubHeaders(),
    next: { tags: [`content:${collectionName}`], revalidate: FALLBACK_REVALIDATE_SECONDS },
  });
  const t1 = Date.now();
  console.log(`[content] ${collectionName}: directory listing took ${t1 - t0}ms (status ${res.status})`);

  if (!res.ok) {
    if (res.status === 404) return [];
    throw new Error(`Failed to list collection "${collectionName}": ${res.status} ${res.statusText}`);
  }

  const files: { name: string; download_url: string }[] = await res.json();
  const mdFiles = files.filter((f) => f.name.endsWith('.md'));

  const entries = await Promise.all(
    mdFiles.map(async (file) => {
      const fileStart = Date.now();
      const contentRes = await fetch(file.download_url, {
        next: { tags: [`content:${collectionName}`], revalidate: FALLBACK_REVALIDATE_SECONDS },
      });
      const raw = await contentRes.text();
      console.log(`[content] ${collectionName}/${file.name}: fetch took ${Date.now() - fileStart}ms`);
      const { data, content } = matter(raw);
      return {
        id: file.name.replace(/\.md$/, ''),
        data: data as T,
        body: content.trim(),
      };
    })
  );

  console.log(`[content] ${collectionName}: TOTAL getCollection() took ${Date.now() - t0}ms`);
  return entries;
}

/** Reads a single entry by id/slug — one GitHub API call, not a full
 *  collection fetch, since the Contents API returns file content
 *  directly (base64-encoded) for a specific file path. */
export async function getEntry<T = Record<string, any>>(
  collectionName: string,
  id: string
): Promise<ContentEntry<T> | null> {
  const t0 = Date.now();
  const fileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/src/content/${collectionName}/${id}.md?ref=${GITHUB_BRANCH}`;

  const res = await fetch(fileUrl, {
    headers: githubHeaders(),
    next: {
      tags: [`content:${collectionName}`, `content:${collectionName}:${id}`],
      revalidate: FALLBACK_REVALIDATE_SECONDS,
    },
  });
  console.log(`[content] getEntry(${collectionName}, ${id}) took ${Date.now() - t0}ms (status ${res.status})`);

  if (!res.ok) return null;

  const json = await res.json();
  const raw = Buffer.from(json.content, 'base64').toString('utf-8');
  const { data, content } = matter(raw);

  return { id, data: data as T, body: content.trim() };
}
