import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import { getCollection } from '@/lib/content';
import { getPage } from '@/lib/sanity/queries';
import styles from './page.module.css';
import ResourceRow from './ResourceRow';

interface ResourceData {
  title: string;
  resourceType: string;
  description?: any[];
  visibility: 'public' | 'private' | 'request_required';
  file?: string;
  externalUrl?: string;
  sortOrder: number;
}

export default async function ResourcesPage() {
  const page = await getPage('resources');
  const h = page?.hero || {};
  const resources = (await getCollection<ResourceData>('resources'))
    .filter((r) => r.data.visibility !== 'private')
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder);

  return (
    <SitePage>
      <InteriorHero eyebrow={h.eyebrow} title={h.title} intro={h.intro} backgroundColor={h.backgroundColor} overlayColor={h.overlayColor} overlayOpacity={h.overlayOpacity} headingColor={h.headingColor} introColor={h.introColor} accentColor={h.accentColor} />
      <section className={styles.resources}>
        <div className={styles.inner}>
          {resources.map((resource) => {
            const isRequest = resource.data.visibility === 'request_required';
            const href = isRequest ? '#' : (resource.data.file || resource.data.externalUrl || '#');
            return (
              <ResourceRow
                key={resource.id}
                title={resource.data.title}
                description={resource.data.description}
                resourceType={resource.data.resourceType}
                isRequest={isRequest}
                href={href}
              />
            );
          })}
        </div>
      </section>
    </SitePage>
  );
}
