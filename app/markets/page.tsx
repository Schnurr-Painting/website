import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import CollectionGrid from '@/components/interior/CollectionGrid';
import page from '@/data/pages/markets.json';

const items = [
  { id: 'office-corporate', title: 'Office & Corporate', description: 'Commercial coatings for offices, campuses, and occupied workplaces.', href: '/markets/office-corporate', accent: '#D84A16' },
  { id: 'healthcare', title: 'Healthcare', description: 'Commercial painting and coatings for healthcare facilities.', href: '/markets/healthcare', accent: '#547C4D' },
  { id: 'retail', title: 'Retail', description: 'Interior and exterior coatings for retail spaces and tenant improvements.', href: '/markets/retail', accent: '#DDA216' },
  { id: 'commercial-interiors', title: 'Commercial Interiors', description: 'Interior painting, wallcovering, and specialty finishes for commercial buildouts.', href: '/markets/commercial-interiors', accent: '#3268AC' },
];

export default function MarketsPage() {
  const h = page.hero;
  return (
    <SitePage>
      <InteriorHero eyebrow={h.eyebrow} title={h.title} intro={h.intro} image={h.image} backgroundColor={h.backgroundColor} overlayColor={h.overlayColor} overlayOpacity={h.overlayOpacity} headingColor={h.headingColor} introColor={h.introColor} accentColor={h.accentColor} />
      <CollectionGrid items={items} />
    </SitePage>
  );
}
