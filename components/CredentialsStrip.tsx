import styles from './CredentialsStrip.module.css';

interface Stat {
  value: string;
  label?: string;
  description?: string;
}

export default function CredentialsStrip({ stats }: { stats?: Stat[] }) {
  const items = (stats || []).slice(0, 4);
  if (items.length === 0) return null;

  return (
    <section className={styles.strip}>
      <div className={`container ${styles.grid}`}>
        {items.map((stat, i) => (
          <div key={i} className={styles.item}>
            <p className={styles.value}>{stat.value}</p>
            {stat.label && <p className={styles.label}>{stat.label}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
