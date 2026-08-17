import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import DetailCta from '@/components/DetailCta';
import RichBody from '@/components/RichBody';
import { getCollection, getEntry } from '@/lib/content';
import { notFound } from 'next/navigation';

interface ServiceData {
  title: string;
  shortDescription: string;
  heroImage?: string;
}

export async function generateStaticParams() {
  return (await getCollection('services')).map((s) => ({ id: s.id }));
}

export default async function ServiceDetailPage({ params }: { params: { id: string } }) {
  const entry = await getEntry<ServiceData>('services', params.id);
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
      {entry.body?.length > 0 && (
        <div style={{ padding: '80px 0', maxWidth: '800px', margin: '0 auto' }}>
          <RichBody value={entry.body} />
        </div>
      )}
      <DetailCta page="services" />
    </SitePage>
  );
}
