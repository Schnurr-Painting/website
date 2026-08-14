import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';

const projects: Record<string, any> = {
  'performing-arts-center': { title: 'Performing Arts Center', description: 'Full interior coatings and specialty finishes for a large assembly space.', image: '/images/hero/hero-01.jpg', market: 'Civic / Institutional' },
};

export async function generateStaticParams() {
  return Object.keys(projects).map(id => ({ id }));
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects[params.id] || { title: 'Project', description: '' };
  return (
    <SitePage>
      <InteriorHero eyebrow={project.market || 'Projects'} title={project.title} intro={project.description} image={project.image} backgroundColor="#3a1843" overlayColor="#3a1843" overlayOpacity={0.8} />
      <div style={{ padding: '80px 0', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ color: 'var(--body)', fontSize: '17px', lineHeight: '1.7' }}>{project.description}</p>
      </div>
    </SitePage>
  );
}
