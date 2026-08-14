import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import page from '@/data/pages/resources.json';
import styles from './page.module.css';

const resources = [
  { id: 'capability-statement', resourceType: 'CAPABILITY_STATEMENT', title: 'Capability Statement', description: 'Company capabilities, qualifications, safety information, and project experience.', visibility: 'public', sortOrder: 1, href: '#' },
];

export default function ResourcesPage() {
  const h = page.hero;
  return (
    <SitePage>
      <InteriorHero eyebrow={h.eyebrow} title={h.title} intro={h.intro} backgroundColor={h.backgroundColor} overlayColor={h.overlayColor} overlayOpacity={h.overlayOpacity} headingColor={h.headingColor} introColor={h.introColor} accentColor={h.accentColor} />
      <section className={styles.resources}>
        <div className={styles.inner}>
          {resources.map(resource => (
            <a key={resource.id} className={styles.resourceRow} href={resource.href}>
              <div>
                <span className={styles.resourceType}>{resource.resourceType}</span>
                <h2>{resource.title}</h2>
                <p>{resource.description}</p>
              </div>
              <strong aria-hidden="true" className={styles.arrow}>→</strong>
            </a>
          ))}
        </div>
      </section>
    </SitePage>
  );
}
