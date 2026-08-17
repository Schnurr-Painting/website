import { PortableText } from '@portabletext/react';
import { richBodyComponents } from '../RichBody';
import { getTestimonialsForPage } from '@/lib/testimonials';
import styles from './Testimonials.module.css';

interface SectionCopy {
  eyebrow?: string;
  heading?: string;
}

export default async function Testimonials({ section }: { section?: SectionCopy }) {
  const sec = section || {};
  const testimonials = await getTestimonialsForPage('home');

  if (testimonials.length === 0) return null;

  return (
    <section className={styles.testimonials}>
      <div className={styles.testimonialsInner}>
        <div className={styles.testimonialsHeading}>
          <p className={`eyebrow ${styles.testimonialsEyebrow}`}>{sec.eyebrow}</p>
          <h2>{sec.heading}</h2>
        </div>

        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.cardLogoRow}>
                {testimonial.data.companyLogo && (
                  <img className={styles.companyLogo} src={testimonial.data.companyLogo} alt={testimonial.data.company || ''} />
                )}
              </div>
              <div className={styles.quote}>
                <PortableText value={testimonial.data.quote} components={richBodyComponents} />
              </div>
              {testimonial.data.person && (
                <footer className={styles.attribution}>
                  <strong>{testimonial.data.person}</strong>
                  {testimonial.data.role && <span>{testimonial.data.role}</span>}
                  {testimonial.data.company && <span className={styles.company}>{testimonial.data.company}</span>}
                </footer>
              )}
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
