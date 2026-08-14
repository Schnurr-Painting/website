import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';

const services: Record<string, any> = {
  'interior-painting': { title: 'Interior Painting', description: 'Interior commercial painting and coatings for large-scale projects.', image: '/images/hero/hero-02.jpg' },
  'exterior-painting': { title: 'Exterior Painting', description: 'Exterior commercial painting systems built for durability, exposure, and long-term appearance.' },
  'specialty-coatings': { title: 'Specialty Coatings', description: 'High-performance coating systems for demanding commercial surfaces and environments.' },
  'wallcovering-finishes': { title: 'Wallcovering & Finishes', description: 'Commercial wallcovering and specialty finish installation for detailed interior environments.' },
};

export async function generateStaticParams() {
  return Object.keys(services).map(id => ({ id }));
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = services[params.id] || { title: 'Service', description: '' };
  return (
    <SitePage>
      <InteriorHero eyebrow="Services" title={service.title} intro={service.description} image={service.image} backgroundColor="#3a1843" overlayColor="#3a1843" overlayOpacity={0.85} />
      <div style={{ padding: '80px 0', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ color: 'var(--body)', fontSize: '17px', lineHeight: '1.7' }}>{service.description}</p>
      </div>
    </SitePage>
  );
}
