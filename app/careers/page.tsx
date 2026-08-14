import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import page from '@/data/pages/careers.json';
import styles from './page.module.css';

export default function CareersPage() {
  const h = page.hero;
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
          <div className={styles.noOpenings}>
            <p>We don&apos;t have any open positions right now, but we&apos;re always interested in hearing from experienced commercial painters and project leaders.</p>
            <a href="mailto:invoices@schnurrpainting.com" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>
              Send Us Your Resume →
            </a>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
