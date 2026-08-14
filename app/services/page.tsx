import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import CollectionGrid from '@/components/interior/CollectionGrid';
import { getCollection } from '@/lib/content';
import page from '@/data/pages/services.json';

interface ServiceData {
  title: string;
  shortDescription: string;
  heroImage?: string;
  sortOrder: number;
}

export default function ServicesPage() {
  const h = page.hero;
  const services = getCollection<ServiceData>('services').sort((a, b) => a.data.sortOrder - b.data.sortOrder);

  const items = services.map((s) => ({
    id: s.id,
    title: s.data.title,
    description: s.data.shortDescription,
    image: s.data.heroImage,
    href: `/services/${s.id}`,
    accent: 'var(--orange)',
  }));

  return (
    <SitePage>
      <InteriorHero eyebrow={h.eyebrow} title={h.title} intro={h.intro} backgroundColor={h.backgroundColor} overlayColor={h.overlayColor} overlayOpacity={h.overlayOpacity} headingColor={h.headingColor} introColor={h.introColor} accentColor={h.accentColor} />
      <CollectionGrid items={items} />
    </SitePage>
  );
}
