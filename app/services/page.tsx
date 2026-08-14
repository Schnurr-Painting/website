import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import CollectionGrid from '@/components/interior/CollectionGrid';
import page from '@/data/pages/services.json';

const items = [
  { id: 'interior-painting', title: 'Interior Painting', description: 'Interior commercial painting and coatings for large-scale projects.', image: '/images/hero/hero-02.jpg', href: '/services/interior-painting', accent: 'var(--orange)' },
  { id: 'exterior-painting', title: 'Exterior Painting', description: 'Exterior commercial painting systems built for durability, exposure, and long-term appearance.', href: '/services/exterior-painting', accent: 'var(--orange)' },
  { id: 'specialty-coatings', title: 'Specialty Coatings', description: 'High-performance coating systems for demanding commercial surfaces and environments.', href: '/services/specialty-coatings', accent: 'var(--orange)' },
  { id: 'wallcovering-finishes', title: 'Wallcovering & Finishes', description: 'Commercial wallcovering and specialty finish installation for detailed interior environments.', href: '/services/wallcovering-finishes', accent: 'var(--orange)' },
];

export default function ServicesPage() {
  const h = page.hero;
  return (
    <SitePage>
      <InteriorHero eyebrow={h.eyebrow} title={h.title} intro={h.intro} image={h.image} backgroundColor={h.backgroundColor} overlayColor={h.overlayColor} overlayOpacity={h.overlayOpacity} headingColor={h.headingColor} introColor={h.introColor} accentColor={h.accentColor} />
      <CollectionGrid items={items} />
    </SitePage>
  );
}
