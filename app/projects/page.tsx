import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import CollectionGrid from '@/components/interior/CollectionGrid';
import { getCollection } from '@/lib/content';
import page from '@/data/pages/projects.json';

interface ProjectData {
  title: string;
  market?: string;
  shortDescription: string;
  featuredImage?: string;
  sortOrder: number;
}

export default async function ProjectsPage() {
  const h = page.hero;
  const projects = (await getCollection<ProjectData>('projects')).sort((a, b) => a.data.sortOrder - b.data.sortOrder);

  const items = projects.map((p) => ({
    id: p.id,
    title: p.data.title,
    description: p.data.shortDescription,
    image: p.data.featuredImage,
    href: `/projects/${p.id}`,
    accent: 'var(--orange)',
    meta: p.data.market,
  }));

  return (
    <SitePage>
      <InteriorHero eyebrow={h.eyebrow} title={h.title} intro={h.intro} backgroundColor={h.backgroundColor} overlayColor={h.overlayColor} overlayOpacity={h.overlayOpacity} headingColor={h.headingColor} introColor={h.introColor} accentColor={h.accentColor} />
      <CollectionGrid items={items} />
    </SitePage>
  );
}
