import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import { getCollection, getEntry } from '@/lib/content';
import { notFound } from 'next/navigation';

interface ProjectData {
  title: string;
  market?: string;
  shortDescription: string;
  featuredImage?: string;
}

export async function generateStaticParams() {
  return getCollection('projects').map((p) => ({ id: p.id }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const entry = getEntry<ProjectData>('projects', params.id);
  if (!entry) notFound();

  return (
    <SitePage>
      <InteriorHero
        eyebrow={entry.data.market || 'Projects'}
        title={entry.data.title}
        intro={entry.data.shortDescription}
        image={entry.data.featuredImage}
        backgroundColor="#3a1843"
        overlayColor="#3a1843"
        overlayOpacity={0.8}
      />
      {entry.body && (
        <div style={{ padding: '80px 0', maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ color: 'var(--body)', fontSize: '17px', lineHeight: '1.7' }}>{entry.body}</p>
        </div>
      )}
    </SitePage>
  );
}
