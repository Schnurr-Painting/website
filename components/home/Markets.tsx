import Link from 'next/link';
import page from '@/data/pages/home.json';
import styles from './Markets.module.css';

const markets = [
  { id: 'office-corporate', data: { title: 'Office & Corporate', shortDescription: 'Commercial coatings for offices, campuses, and occupied workplaces.', accentColor: '#D84A16', featured: true, sortOrder: 1 } },
  { id: 'healthcare', data: { title: 'Healthcare', shortDescription: 'Commercial painting and coatings for healthcare facilities, clinics, and occupied care environments.', accentColor: '#547C4D', featured: true, sortOrder: 2 } },
  { id: 'retail', data: { title: 'Retail', shortDescription: 'Interior and exterior coatings for retail spaces, tenant improvements, and customer-facing environments.', accentColor: '#DDA216', featured: true, sortOrder: 3 } },
  { id: 'commercial-interiors', data: { title: 'Commercial Interiors', shortDescription: 'Interior painting, wallcovering, and specialty finishes for complex commercial buildouts and renovations.', accentColor: '#3268AC', featured: true, sortOrder: 4 } },
];

export default function Markets() {
  const section = page.marketsSection;

  return (
    <section className={styles.markets} id="markets">
      <div className={styles.marketsInner}>
        <div className={styles.marketsHeading}>
          <div>
            <p className={`eyebrow ${styles.marketsEyebrow}`}>{section.eyebrow}</p>
            <h2 className={styles.heading}>{section.heading}</h2>
          </div>
          <p className={styles.marketsIntro}>{section.intro}</p>
        </div>

        <div className={styles.marketGrid}>
          {markets.map((market, index) => {
            const accent = market.data.accentColor || 'var(--orange)';
            const number = String(index + 1).padStart(2, '0');
            return (
              <article
                key={market.id}
                className={styles.marketCard}
                style={{ '--market-accent': accent } as React.CSSProperties}
              >
                <div className={styles.marketVisual}>
                  <div className={styles.marketGraphic} aria-hidden="true">
                    <span className={styles.marketNumber}>{number}</span>
                    <span className={styles.marketLine}></span>
                    <span className={`${styles.marketBlock} ${styles.marketBlockOne}`}></span>
                    <span className={`${styles.marketBlock} ${styles.marketBlockTwo}`}></span>
                    <span className={styles.marketRing}></span>
                  </div>
                </div>

                <div className={styles.marketContent}>
                  <div className={styles.marketTitleRow}>
                    <span className={styles.marketIndex}>{number}</span>
                    <h3 className={styles.marketTitle}>{market.data.title}</h3>
                  </div>
                  <p className={styles.marketDesc}>{market.data.shortDescription}</p>
                  <Link href={`/markets/${market.id}`} className={styles.marketLink}>
                    Explore Market <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
