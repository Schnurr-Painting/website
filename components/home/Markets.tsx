import Link from 'next/link';
import { getCollection } from '@/lib/content';
import RichBody from '@/components/RichBody';
import styles from './Markets.module.css';

interface MarketData {
  title: string;
  shortDescription: any;
  cardImage?: string;
  accentColor?: string;
  featured?: boolean;
  sortOrder: number;
}

interface SectionCopy {
  eyebrow?: string;
  heading?: string;
  intro?: any;
}

export default async function Markets({ section }: { section?: SectionCopy }) {
  const sec = section || {};
  const markets = (await getCollection<MarketData>('markets'))
    .filter((m) => m.data.featured)
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder);

  return (
    <section className={styles.markets} id="markets">
      <div className={styles.marketsInner}>
        <div className={styles.marketsHeading}>
          <div>
            <p className={`eyebrow ${styles.marketsEyebrow}`}>{sec.eyebrow}</p>
            <h2 className={styles.heading}>{sec.heading}</h2>
          </div>
          <RichBody value={sec.intro} className={styles.marketsIntro} />
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
                  <RichBody value={market.data.shortDescription} className={styles.marketDesc} />
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
