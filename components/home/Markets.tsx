import Link from 'next/link';
import { getCollection } from '@/lib/content';
import page from '@/data/pages/home.json';
import styles from './Markets.module.css';

interface MarketData {
  title: string;
  shortDescription: string;
  cardImage?: string;
  accentColor?: string;
  featured?: boolean;
  sortOrder: number;
}

export default function Markets() {
  const section = page.marketsSection;
  const markets = getCollection<MarketData>('markets')
    .filter((m) => m.data.featured)
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder);

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
                  {market.data.cardImage ? (
                    <img src={market.data.cardImage} alt="" loading="lazy" />
                  ) : (
                    <div className={styles.marketGraphic} aria-hidden="true">
                      <span className={styles.marketNumber}>{number}</span>
                      <span className={styles.marketLine}></span>
                      <span className={`${styles.marketBlock} ${styles.marketBlockOne}`}></span>
                      <span className={`${styles.marketBlock} ${styles.marketBlockTwo}`}></span>
                      <span className={styles.marketRing}></span>
                    </div>
                  )}
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
