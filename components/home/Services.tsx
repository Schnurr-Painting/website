import Link from 'next/link';
import { getCollection } from '@/lib/content';
import RichBody from '@/components/RichBody';
import styles from './Services.module.css';

interface ServiceData {
  title: string;
  shortDescription: any;
  heroImage?: string;
  featured?: boolean;
  sortOrder: number;
}

interface SectionCopy {
  eyebrow?: string;
  heading?: string;
  intro?: any;
  photoLabel?: string;
  photoTitle?: string;
}

export default async function Services({ section }: { section?: SectionCopy }) {
  const sec = section || {};
  const services = (await getCollection<ServiceData>('services'))
    .filter((s) => s.data.featured)
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder)
    .slice(0, 4);

  const sectionImage =
    services.find((s) => s.data.heroImage)?.data.heroImage || '/images/hero/hero-02.jpg';

  return (
    <section className={styles.services} id="services">
      <div className={styles.servicesInner}>
        <div className={styles.servicesPhoto}>
          <img src={sectionImage} alt="" loading="lazy" />
          <div className={styles.servicesPhotoShade} />
          <div className={styles.servicesPhotoLabel}>
            <span>{sec.photoLabel}</span>
            <strong>{sec.photoTitle}</strong>
          </div>
        </div>

        <div className={styles.servicesContent}>
          <div className={styles.servicesHeading}>
            <p className={`eyebrow ${styles.servicesEyebrow}`}>{sec.eyebrow}</p>
            <h2>{sec.heading}</h2>
            <RichBody value={sec.intro} className={styles.servicesIntro} />
          </div>

          <div className={styles.serviceList}>
            {services.map((service, index) => {
              const number = String(index + 1).padStart(2, '0');
              return (
                <Link key={service.id} href={`/services/${service.id}`} className={styles.serviceRow}>
                  <span className={styles.serviceNumber}>{number}</span>
                  <div className={styles.serviceMain}>
                    <h3>{service.data.title}</h3>
                    <RichBody value={service.data.shortDescription} />
                  </div>
                  <span className={styles.serviceArrow} aria-hidden="true">→</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
