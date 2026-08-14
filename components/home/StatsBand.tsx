import page from '@/data/pages/home.json';
import styles from './StatsBand.module.css';

const iconsByIndex = [
  // Years in Business
  <>
    <path d="M14 4h4l-2 7h-4z" />
    <path d="M10 11h5l-5 9H6z" />
  </>,
  // EMR Safety
  <>
    <path d="M12 3 20 6v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
    <path d="m8.5 12 2.1 2.1 5-5" />
  </>,
  // Bonding Capacity
  <>
    <path d="M12 3 3 8h18z" />
    <path d="M5 9v9M9 9v9M15 9v9M19 9v9" />
    <path d="M3 18h18M2 21h20" />
  </>,
  // Active Crews
  <>
    <circle cx="8" cy="8" r="3" />
    <circle cx="16" cy="8" r="3" />
    <path d="M2 20v-2c0-3 2-5 6-5s6 2 6 5v2" />
    <path d="M14 13c5 0 8 2 8 5v2" />
  </>,
  // Certified
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 2.5 2.5L16.5 9" />
  </>,
];

const colorClasses = ['orange', 'green', 'blue', 'gold', 'teal'];

export default function StatsBand() {
  const stats = page.stats;

  return (
    <section className={styles.credentials}>
      <img
        className={`${styles.statsBrush} ${styles.statsBrushOrange}`}
        src="/assets/graphics/stats-brush-orange.png"
        alt=""
        aria-hidden="true"
      />
      <div className={styles.credentialsPanelWrap}>
        <div className={styles.credentialsGrid}>
          {stats.map((stat, index) => (
            <article key={index} className={styles.credential}>
              <div className={`${styles.icon} ${styles[colorClasses[index]]}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  {iconsByIndex[index]}
                </svg>
              </div>
              {index === 4 ? (
                <strong className={styles.qualification}>{stat.value}</strong>
              ) : (
                <strong className={styles.value}>{stat.value}</strong>
              )}
              {stat.label && <span className={styles.label}>{stat.label}</span>}
              <p>{stat.description}</p>
            </article>
          ))}
        </div>
      </div>
      <img
        className={`${styles.statsBrush} ${styles.statsBrushTeal}`}
        src="/assets/graphics/stats-brush-teal.png"
        alt=""
        aria-hidden="true"
      />
    </section>
  );
}
