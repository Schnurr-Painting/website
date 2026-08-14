'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import page from '@/data/pages/home.json';
import styles from './Services.module.css';

interface Service {
  id: string;
  data: {
    title: string;
    shortDescription: string;
    heroImage?: string;
    featured?: boolean;
    sortOrder: number;
  };
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const section = page.servicesSection;

  useEffect(() => {
    // Load services from Astro project's content
    // For now, using placeholder data - in production would fetch from CMS/API
    const placeholderServices: Service[] = [
      {
        id: 'interior-painting',
        data: {
          title: 'Interior Painting',
          shortDescription: 'Professional interior painting for commercial spaces',
          heroImage: '/images/hero/hero-01.jpg',
          featured: true,
          sortOrder: 1,
        },
      },
      {
        id: 'exterior-painting',
        data: {
          title: 'Exterior Painting',
          shortDescription: 'Weather-resistant exterior coatings and finishing',
          heroImage: '/images/hero/hero-02.jpg',
          featured: true,
          sortOrder: 2,
        },
      },
      {
        id: 'specialty-coatings',
        data: {
          title: 'Specialty Coatings',
          shortDescription: 'Industrial and specialty finishes for unique projects',
          heroImage: '/images/hero/hero-03.jpg',
          featured: true,
          sortOrder: 3,
        },
      },
      {
        id: 'wallcovering-finishes',
        data: {
          title: 'Wallcovering & Finishes',
          shortDescription: 'Complete wallcovering and decorative finish solutions',
          heroImage: '/images/hero/hero-04.jpg',
          featured: true,
          sortOrder: 4,
        },
      },
    ];

    setServices(placeholderServices);
  }, []);

  const sectionImage =
    services.find((s) => s.data.heroImage)?.data.heroImage || '/images/hero/hero-02.jpg';

  return (
    <section className={styles.services} id="services">
      <div className={styles.servicesInner}>
        <div className={styles.servicesPhoto}>
          <img src={sectionImage} alt="" loading="lazy" />
          <div className={styles.servicesPhotoShade} />
          <div className={styles.servicesPhotoLabel}>
            <span>{section.photoLabel}</span>
            <strong>{section.photoTitle}</strong>
          </div>
        </div>

        <div className={styles.servicesContent}>
          <div className={styles.servicesHeading}>
            <p className={`eyebrow ${styles.servicesEyebrow}`}>{section.eyebrow}</p>
            <h2>{section.heading}</h2>
            <p className={styles.servicesIntro}>{section.intro}</p>
          </div>

          <div className={styles.serviceList}>
            {services.map((service, index) => {
              const number = String(index + 1).padStart(2, '0');
              return (
                <Link key={service.id} href={`/services/${service.id}`} className={styles.serviceRow}>
                  <span className={styles.serviceNumber}>{number}</span>
                  <div className={styles.serviceMain}>
                    <h3>{service.data.title}</h3>
                    <p>{service.data.shortDescription}</p>
                  </div>
                  <span className={styles.serviceArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
