import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import page from '@/data/pages/about.json';
import shared from '@/data/site-shared.json';
import { getCollection } from '@/lib/content';
import styles from './page.module.css';

interface TeamData {
  name: string;
  role: string;
  headshot?: string;
  bio?: string;
  email?: string;
  phone?: string;
  publicProfile?: boolean;
  displayOrder: number;
}

export default function AboutPage() {
  const h = page.hero;
  const team = getCollection<TeamData>('team')
    .filter((m) => m.data.publicProfile)
    .sort((a, b) => a.data.displayOrder - b.data.displayOrder);

  return (
    <SitePage>
      <InteriorHero eyebrow={h.eyebrow} title={h.title} intro={h.intro} image={h.image} imagePosition={h.imagePosition} backgroundColor={h.backgroundColor} overlayColor={h.overlayColor} overlayOpacity={h.overlayOpacity} headingColor={h.headingColor} introColor={h.introColor} accentColor={h.accentColor} />
      {page.sections && page.sections.length > 0 && (
        <section className={styles.body}>
          <div className={styles.inner}>
            {(page.sections as any[]).map((section, i) => (
              <article key={i} className={styles.section}>
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section.title}</h2>
                  <p>{section.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      {team.length > 0 && (
        <section className={styles.teamBand}>
          <div className={styles.teamInner}>
            <p className={`eyebrow ${styles.teamEyebrow}`}>{shared.teamBandEyebrow}</p>
            <h2 className={styles.teamHeading}>{shared.teamBandHeading}</h2>
            <div className={styles.teamGrid}>
              {team.map((member) => (
                <article key={member.id} className={styles.teamCard}>
                  {member.data.headshot && <img src={member.data.headshot} alt={member.data.name} />}
                  <div className={styles.teamCopy}>
                    <h3>{member.data.name}</h3>
                    <p className={styles.role}>{member.data.role}</p>
                    {member.data.bio && <p className={styles.bio}>{member.data.bio}</p>}
                    {member.data.email && <a href={`mailto:${member.data.email}`}>{member.data.email}</a>}
                    {member.data.phone && <a href={`tel:${member.data.phone.replace(/\D/g, '')}`}>{member.data.phone}</a>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </SitePage>
  );
}
