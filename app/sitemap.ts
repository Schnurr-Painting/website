import type { MetadataRoute } from 'next';
import { getCollection } from '@/lib/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://schnurr-painting-nextjs.netlify.app';

const STATIC_ROUTES = [
  '',
  '/about',
  '/services',
  '/markets',
  '/projects',
  '/safety',
  '/careers',
  '/resources',
  '/contact',
  '/privacy',
  '/terms',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, markets, projects] = await Promise.all([
    getCollection('services'),
    getCollection('markets'),
    getCollection('projects'),
  ]);

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const dynamicEntries = [
    ...services.map((s) => ({ url: `${SITE_URL}/services/${s.id}`, lastModified: new Date() })),
    ...markets.map((m) => ({ url: `${SITE_URL}/markets/${m.id}`, lastModified: new Date() })),
    ...projects.map((p) => ({ url: `${SITE_URL}/projects/${p.id}`, lastModified: new Date() })),
  ];

  return [...staticEntries, ...dynamicEntries];
}
