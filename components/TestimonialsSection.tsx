import { PortableText } from '@portabletext/react';
import { richBodyComponents } from './RichBody';
import { getSharedLabels } from '@/lib/sanity/queries';
import { getTestimonialsForPage, type TestimonialsPageKey } from '@/lib/testimonials';
import styles from './home/Testimonials.module.css';

export default async function TestimonialsSection({ page }: { page: TestimonialsPageKey }) {
  const [shared, testimonials] = await Promise.all([
    getSharedLabels(),
    getTestimonialsForPage(page),
  ]);

  if (testimonials.length === 0) return null;

  return (
    <section className={styles.testimonials}>
      <div className={styles.testimonialsInner}>
        <div className={styles.testimonialsHeading}>
          <p className={`eyebrow ${styles.testimonialsEyebrow}`}>{shared?.testimonialsEyebrow}</p>
        </div>

        <div className={styles.testimonialGrid}>
          {testimonials.map((t) => (
            <blockquote key={t.id} className={styles.testimonialCard}>
              <div className={styles.cardLogoRow}>
                {t.data.companyLogo && (
                  <img className={styles.companyLogo} src={t.data.companyLogo} alt={t.data.company || ''} />
                )}
              </div>
              <div className={styles.quote}>
                <PortableText value={t.data.quote} components={richBodyComponents} />
              </div>
              {t.data.person && (
                <footer className={styles.attribution}>
                  <strong>{t.data.person}</strong>
                  {t.data.role && <span>{t.data.role}</span>}
                  {t.data.company && <span className={styles.company}>{t.data.company}</span>}
                </footer>
              )}
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
