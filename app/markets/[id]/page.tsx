import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';

const markets: Record<string, any> = {
  'office-corporate': { title: 'Office & Corporate', description: 'Commercial coatings for offices, campuses, and occupied workplaces.', accent: '#D84A16' },
  'healthcare': { title: 'Healthcare', description: 'Commercial painting and coatings for healthcare facilities, clinics, and occupied care environments.', accent: '#547C4D' },
  'retail': { title: 'Retail', description: 'Interior and exterior coatings for retail spaces, tenant improvements, and customer-facing environments.', accent: '#DDA216' },
  'commercial-interiors': { title: 'Commercial Interiors', description: 'Interior painting, wallcovering, and specialty finishes for complex commercial buildouts.', accent: '#3268AC' },
};

export async function generateStaticParams() {
  return Object.keys(markets).map(id => ({ id }));
}

export default function MarketDetailPage({ params }: { params: { id: string } }) {
  const market = markets[params.id] || { title: 'Market', description: '' };
  return (
    <SitePage>
      <InteriorHero eyebrow="Markets" title={market.title} intro={market.description} backgroundColor="#3a1843" overlayColor="#3a1843" overlayOpacity={0.9} accentColor={market.accent} />
      <div style={{ padding: '80px 0', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ color: 'var(--body)', fontSize: '17px', lineHeight: '1.7' }}>{market.description}</p>
      </div>
    </SitePage>
  );
}
