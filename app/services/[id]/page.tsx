import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import DetailCta from '@/components/DetailCta';
import RichBody from '@/components/RichBody';
import { getCollection, getEntry } from '@/lib/content';
import { notFound } from 'next/navigation';
import { editAttr } from '@/lib/sanity/edit';
import PhotoGallery from '@/components/PhotoGallery';

interface ServiceData {
  title: string;
  shortDescription: any;
  heroImage?: string;
  gallery?: string[];
  galleryKeys?: string[];
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
        imageEdit={editAttr(entry.data as any, 'heroImage')}
        backgroundColor="#3a1843"
        overlayColor="#3a1843"
        overlayOpacity={0.85}
      />
      {(entry.body?.length ?? 0) > 0 && (
        <div style={{ padding: '80px 24px', maxWidth: '848px', margin: '0 auto' }}>
          <RichBody value={entry.body} />
        </div>
      )}
      <PhotoGallery doc={entry.data as any} photos={entry.data.gallery} photoKeys={entry.data.galleryKeys} />
      <DetailCta page="services" />
    </SitePage>
  );
}
