// Mock collection loader for Next.js
// In production, this would read from Decap CMS or a database
// For now, we'll read from the git repo's content collection

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface CollectionEntry {
  id: string;
  slug: string;
  data: Record<string, any>;
  body: string;
}

export async function getCollection(collectionName: string): Promise<CollectionEntry[]> {
  const contentDir = path.join(process.cwd(), '../website/src/content', collectionName);
  
  if (!fs.existsSync(contentDir)) {
    return [];
  }

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
  
  return files.map(file => {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const slug = file.replace('.md', '');

    return {
      id: slug,
      slug,
      data: {
        ...data,
        // Normalize fields that might be missing
        sortOrder: data.sortOrder ?? 0,
        featured: data.featured ?? false,
      },
      body: content,
    };
  });
}
