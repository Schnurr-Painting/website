import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import page from '@/data/pages/about.json';
import shared from '@/data/site-shared.json';
import styles from './page.module.css';

export default function AboutPage() {
  const h = page.hero;
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
      <section className={styles.teamBand}>
        <div className={styles.teamInner}>
          <p className={`eyebrow ${styles.teamEyebrow}`}>{shared.teamBandEyebrow}</p>
          <h2 className={styles.teamHeading}>{shared.teamBandHeading}</h2>
          <div className={styles.teamGrid}>
            <article className={styles.teamCard}>
              <img src="/images/uploads/jason-schnurr-image.jpg" alt="Jason Schnurr" />
              <div className={styles.teamCopy}>
                <h3>Jason Schnurr</h3>
                <p className={styles.role}>Owner &amp; Principal</p>
                <a href="tel:5125551212">(512) 555-1212</a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
