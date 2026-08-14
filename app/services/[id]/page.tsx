import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import { getCollection, getEntry } from '@/lib/content';
import { notFound } from 'next/navigation';

interface ServiceData {
  title: string;
  shortDescription: string;
  heroImage?: string;
}

export async function generateStaticParams() {
  return getCollection('services').map((s) => ({ id: s.id }));
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const entry = getEntry<ServiceData>('services', params.id);
  if (!entry) notFound();

  return (
    <SitePage>
      <InteriorHero
        eyebrow="Services"
        title={entry.data.title}
        intro={entry.data.shortDescription}
        image={entry.data.heroImage}
        backgroundColor="#3a1843"
        overlayColor="#3a1843"
        overlayOpacity={0.85}
      />
      {entry.body && (
        <div style={{ padding: '80px 0', maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ color: 'var(--body)', fontSize: '17px', lineHeight: '1.7' }}>{entry.body}</p>
        </div>
      )}
    </SitePage>
  );
}
