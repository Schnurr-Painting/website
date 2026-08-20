import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import { PortableText } from '@portabletext/react';
import { richBodyComponents } from '@/components/RichBody';
import { getPage } from '@/lib/sanity/queries';
import { getCollection } from '@/lib/content';
import styles from './page.module.css';
import ApplyButton from './ApplyButton';

interface PositionData {
  title: string;
  roleType: string;
  employmentType: string;
  location?: string;
  requirements?: any[];
  active: boolean;
  sortOrder: number;
}

export default async function CareersPage() {
  const page = await getPage('careers');
  const h = page?.hero || {};
  const positions = (await getCollection<PositionData>('positions'))
    .filter((p) => p.data.active)
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder);

  return (
    <SitePage>
      <InteriorHero
        eyebrow={h.eyebrow}
        title={h.title}
        intro={h.intro}
        image={(h as any).image}
        backgroundColor={h.backgroundColor}
        overlayColor={h.overlayColor}
        overlayOpacity={h.overlayOpacity}
        headingColor={h.headingColor}
        introColor={h.introColor}
        accentColor={h.accentColor}
      />
      <section className={styles.positions}>
        <div className={styles.inner}>
          <div className={styles.heading}>
            <p className="eyebrow" style={{ color: 'var(--gold)', margin: '0 0 12px' }}>Open Positions</p>
            <h2>Current Openings</h2>
          </div>

          {positions.length > 0 ? (
            <div className={styles.positionsList}>
              {positions.map((position) => {
                const hasRequirements = (position.data.requirements?.length || 0) > 0;

                return (
                  <article key={position.id} className={styles.positionCard}>
                    <div className={styles.positionGrid}>
                      <div className={styles.positionMain}>
                        <h3>{position.data.title}</h3>
                        {(position.body?.length ?? 0) > 0 && (
                          <div className={styles.positionDescription}>
                            <PortableText value={position.body} components={richBodyComponents} />
                          </div>
                        )}
                        {hasRequirements && (
                          <div className={styles.requirementsBlock}>
                            <p className={styles.requirementsHeading}>Requirements</p>
                            <PortableText value={position.data.requirements} components={richBodyComponents} />
                          </div>
                        )}
                        <ApplyButton positionTitle={position.data.title} roleType={position.data.roleType} />
                      </div>
                      <aside className={styles.positionSidebar}>
                        <h4>Position Details</h4>
                        <div className={styles.specRow}>
                          <p className={styles.specLabel}>Role Type</p>
                          <p className={styles.specValue}>{position.data.roleType}</p>
                        </div>
                        <div className={styles.specRow}>
                          <p className={styles.specLabel}>Employment Type</p>
                          <p className={styles.specValue}>{position.data.employmentType}</p>
                        </div>
                        {position.data.location && (
                          <div className={styles.specRow}>
                            <p className={styles.specLabel}>Location</p>
                            <p className={styles.specValue}>{position.data.location}</p>
                          </div>
                        )}
                      </aside>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className={styles.noOpenings}>
              <p>We don&apos;t have any open positions right now, but we&apos;re always interested in hearing from experienced commercial painters and project leaders.</p>
              <ApplyButton positionTitle="" roleType="" />
            </div>
          )}
        </div>
      </section>
    </SitePage>
  );
}
