import Link from 'next/link';
import styles from './CollectionGrid.module.css';

interface CollectionItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  href: string;
  accent?: string;
  meta?: string;
}

export default function CollectionGrid({ items }: { items: CollectionItem[] }) {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {items.length > 0 ? (
          <div className={styles.grid}>
            {items.map((item, index) => (
              <article
                key={item.id}
                className={styles.card}
                style={{ '--card-accent': item.accent || 'var(--orange)' } as React.CSSProperties}
              >
                {item.image ? (
                  <div className={styles.imageWrap}>
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>
                ) : (
                  <div className={styles.fallback} aria-hidden="true">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                )}
                <div className={styles.content}>
                  {item.meta && <p className={styles.meta}>{item.meta}</p>}
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <Link href={item.href}>View Details <span aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>No items are currently published.</p>
        )}
      </div>
    </section>
  );
}
