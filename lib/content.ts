import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ContentEntry<T = Record<string, any>> {
  id: string;
  data: T;
  body: string;
}

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content');

/**
 * Reads all markdown files in a content collection directory (mirrors
 * Astro's getCollection()). Runs at build time on the server/filesystem,
 * so this only works in Server Components / generateStaticParams, not
 * in 'use client' components.
 */
export function getCollection<T = Record<string, any>>(collectionName: string): ContentEntry<T>[] {
  const dir = path.join(CONTENT_ROOT, collectionName);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));

  return files.map((file) => {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    const id = file.replace(/\.md$/, '');

    return {
      id,
      data: data as T,
      body: content.trim(),
    };
  });
}

/** Reads a single entry from a collection by id/slug. */
export function getEntry<T = Record<string, any>>(collectionName: string, id: string): ContentEntry<T> | null {
  const filePath = path.join(CONTENT_ROOT, collectionName, `${id}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    id,
    data: data as T,
    body: content.trim(),
  };
}
