import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import ProjectDetails from '@/components/ProjectDetails';
import DetailCta from '@/components/DetailCta';
import { getCollection, getEntry } from '@/lib/content';
import { notFound } from 'next/navigation';

interface ProjectData {
  title: string;
  market?: string;
  location?: string;
  shortDescription: any;
  featuredImage?: string;
  gallery?: string[];
  gc?: string;
  owner?: string;
  projectSize?: string;
  completionDate?: string;
  services?: string[];
}

export async function generateStaticParams() {
  return (await getCollection('projects')).map((p) => ({ id: p.id }));
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const entry = await getEntry<ProjectData>('projects', params.id);
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
      <ProjectDetails
        body={entry.body}
        featuredImage={entry.data.featuredImage}
        location={entry.data.location}
        gc={entry.data.gc}
        owner={entry.data.owner}
        projectSize={entry.data.projectSize}
        completionDate={entry.data.completionDate}
        services={entry.data.services}
        gallery={entry.data.gallery}
      />
      <DetailCta page="projects" />
    </SitePage>
  );
}
