'use client';

import Link from 'next/link';
import page from '@/data/pages/home.json';
import styles from './Markets.module.css';

interface Market {
  id: string;
  data: {
    title: string;
    shortDescription: string;
    cardImage?: string;
    accentColor?: string;
    featured?: boolean;
    sortOrder: number;
  };
}

export default function Markets() {
  const section = page.marketsSection;

  // Placeholder markets data
  const markets: Market[] = [
    {
      id: 'office-corporate',
      data: {
        title: 'Office & Corporate',
        shortDescription: 'Professional office environments requiring precision and reliability',
        accentColor: '#6f6677',
        featured: true,
        sortOrder: 1,
      },
    },
    {
      id: 'healthcare',
      data: {
        title: 'Healthcare Facilities',
        shortDescription: 'Sterile, compliant environments for medical and research spaces',
        accentColor: '#5a7080',
        featured: true,
        sortOrder: 2,
      },
    },
    {
      id: 'education',
      data: {
        title: 'Educational Institutions',
        shortDescription: 'Schools, universities, and learning centers',
        accentColor: '#7d856f',
        featured: true,
        sortOrder: 3,
      },
    },
    {
      id: 'retail-hospitality',
      data: {
        title: 'Retail & Hospitality',
        shortDescription: 'Customer-facing spaces that make lasting impressions',
        accentColor: '#761b82',
        featured: true,
        sortOrder: 4,
      },
    },
  ];

  return (
    <section className={styles.markets}>
      <div className={styles.marketsInner}>
        <div className={styles.marketsHeading}>
          <p className={`eyebrow ${styles.marketsEyebrow}`}>{section.eyebrow}</p>
          <h2>{section.heading}</h2>
          <p className={styles.marketsIntro}>{section.intro}</p>
        </div>

        <div className={styles.marketGrid}>
          {markets.map((market) => (
            <Link key={market.id} href={`/markets/${market.id}`} className={styles.marketCard}>
              {market.data.cardImage && (
                <img src={market.data.cardImage} alt={market.data.title} loading="lazy" />
              )}
              <div className={styles.marketCardContent}>
                <h3 style={{ color: market.data.accentColor }}>{market.data.title}</h3>
                <p>{market.data.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
