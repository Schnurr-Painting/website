import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import CollectionGrid from '@/components/interior/CollectionGrid';
import { getCollection } from '@/lib/content';
import page from '@/data/pages/markets.json';

interface MarketData {
  title: string;
  shortDescription: string;
  accentColor?: string;
  sortOrder: number;
}

export default async function MarketsPage() {
  const h = page.hero;
  const markets = (await getCollection<MarketData>('markets')).sort((a, b) => a.data.sortOrder - b.data.sortOrder);

  const items = markets.map((m) => ({
    id: m.id,
    title: m.data.title,
    description: m.data.shortDescription,
    href: `/markets/${m.id}`,
    accent: m.data.accentColor || 'var(--orange)',
  }));

  return (
    <SitePage>
      <InteriorHero eyebrow={h.eyebrow} title={h.title} intro={h.intro} backgroundColor={h.backgroundColor} overlayColor={h.overlayColor} overlayOpacity={h.overlayOpacity} headingColor={h.headingColor} introColor={h.introColor} accentColor={h.accentColor} />
      <CollectionGrid items={items} />
    </SitePage>
  );
}
