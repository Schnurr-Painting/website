import { getCollection } from '@/lib/content';
import page from '@/data/pages/home.json';
import styles from './Testimonials.module.css';

interface TestimonialData {
  quote: string;
  person?: string;
  role?: string;
  company?: string;
  approvedPublic?: boolean;
  sortOrder: number;
}

export default async function Testimonials() {
  const section = page.testimonialsSection;
  const testimonials = (await getCollection<TestimonialData>('testimonials'))
    .filter((t) => t.data.approvedPublic)
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder)
    .slice(0, 3);

  if (testimonials.length === 0) return null;

  return (
    <section className={styles.testimonials}>
      <div className={styles.testimonialsInner}>
        <div className={styles.testimonialsHeading}>
          <p className={`eyebrow ${styles.testimonialsEyebrow}`}>{section.eyebrow}</p>
          <h2>{section.heading}</h2>
        </div>

        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.id} className={styles.testimonialCard}>
              <p className={styles.quote}>&ldquo;{testimonial.data.quote}&rdquo;</p>
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
