'use client';

import page from '@/data/pages/home.json';
import styles from './Testimonials.module.css';

interface Testimonial {
  id: string;
  data: {
    quote: string;
    person?: string;
    role?: string;
    company?: string;
    approvedPublic?: boolean;
    sortOrder: number;
  };
}

export default function Testimonials() {
  const section = page.testimonialsSection;

  // Placeholder testimonials
  const testimonials: Testimonial[] = [
    {
      id: 'sample-1',
      data: {
        quote: 'Schnurr Painting delivered exceptional results on our complex commercial project. Their attention to detail and schedule adherence set them apart.',
        person: 'John Smith',
        role: 'Project Manager',
        company: 'Commercial Builders LLC',
        approvedPublic: true,
        sortOrder: 1,
      },
    },
    {
      id: 'sample-2',
      data: {
        quote: 'Working with Schnurr on our office renovation was seamless. They coordinated around our operational schedule perfectly.',
        person: 'Sarah Johnson',
        role: 'Facilities Manager',
        company: 'Tech Corp',
        approvedPublic: true,
        sortOrder: 2,
      },
    },
    {
      id: 'sample-3',
      data: {
        quote: 'Professional crew, excellent execution, and transparent communication. Schnurr is our go-to painting partner.',
        person: 'Mike Chen',
        role: 'General Contractor',
        company: 'Premier Construction',
        approvedPublic: true,
        sortOrder: 3,
      },
    },
  ];

  return (
    testimonials.length > 0 && (
      <section className={styles.testimonials}>
        <div className={styles.testimonialsInner}>
          <div className={styles.testimonialsHeading}>
            <p className={`eyebrow ${styles.testimonialsEyebrow}`}>{section.eyebrow}</p>
            <h2>{section.heading}</h2>
          </div>

          <div className={styles.testimonialGrid}>
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.id} className={styles.testimonialCard}>
                <p className={styles.quote}>"{testimonial.data.quote}"</p>
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
    )
  );
}
