import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import CollectionGrid from '@/components/interior/CollectionGrid';
import page from '@/data/pages/projects.json';

const items = [
  { id: 'performing-arts-center', title: 'Performing Arts Center', description: 'Full interior coatings and specialty finishes for a large assembly space.', image: '/images/hero/hero-04.jpg', href: '/projects/performing-arts-center', accent: 'var(--orange)', meta: 'Civic / Institutional' },
];

export default function ProjectsPage() {
  const h = page.hero;
  return (
    <SitePage>
      <InteriorHero eyebrow={h.eyebrow} title={h.title} intro={h.intro} image={h.image} backgroundColor={h.backgroundColor} overlayColor={h.overlayColor} overlayOpacity={h.overlayOpacity} headingColor={h.headingColor} introColor={h.introColor} accentColor={h.accentColor} />
      <CollectionGrid items={items} />
    </SitePage>
  );
}
