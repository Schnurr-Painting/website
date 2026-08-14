import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import page from '@/data/pages/careers.json';
import { getCollection } from '@/lib/content';
import styles from './page.module.css';
import ApplyButton from './ApplyButton';

interface PositionData {
  title: string;
  roleType: string;
  employmentType: string;
  location?: string;
  requirements?: string;
  active: boolean;
  sortOrder: number;
}

export default function CareersPage() {
  const h = page.hero;
  const positions = getCollection<PositionData>('positions')
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
                const requirementLines = (position.data.requirements || '')
                  .split('\n')
                  .map((line) => line.trim())
                  .filter(Boolean);

                return (
                  <article key={position.id} className={styles.positionCard}>
                    <div className={styles.positionMeta}>
                      <span>{position.data.roleType}</span>
                      <span>{position.data.employmentType}</span>
                      {position.data.location && <span className={styles.location}>{position.data.location}</span>}
                    </div>
                    <h3>{position.data.title}</h3>
                    <div className={styles.positionDescription}>
                      {position.body.split('\n\n').map((para, i) => {
                        if (para.startsWith('**') && para.endsWith('**')) {
                          return <p key={i}><strong>{para.replace(/\*\*/g, '')}</strong></p>;
                        }
                        if (para.trim().startsWith('- ')) {
                          return (
                            <ul key={i}>
                              {para.split('\n').map((line, j) => (
                                <li key={j}>{line.replace(/^-\s*/, '')}</li>
                              ))}
                            </ul>
                          );
                        }
                        return <p key={i}>{para}</p>;
                      })}
                    </div>
                    {requirementLines.length > 0 && (
                      <div className={styles.requirementsBlock}>
                        <p className={styles.requirementsHeading}>Requirements</p>
                        <ul className={styles.requirements}>
                          {requirementLines.map((req, i) => <li key={i}>{req}</li>)}
                        </ul>
                      </div>
                    )}
                    <ApplyButton positionTitle={position.data.title} roleType={position.data.roleType} />
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
