'use client';

import Link from 'next/link';
import page from '@/data/pages/home.json';
import styles from './FeaturedProjects.module.css';

interface Project {
  id: string;
  data: {
    title: string;
    shortDescription: string;
    featuredImage?: string;
    featured?: boolean;
    sortOrder: number;
  };
}

export default function FeaturedProjects() {
  const section = page.projectsSection;

  // Placeholder projects
  const projects: Project[] = [
    {
      id: 'performing-arts-center',
      data: {
        title: 'Performing Arts Center',
        shortDescription: 'Large-scale interior painting and specialty finishes',
        featured: true,
        sortOrder: 1,
      },
    },
  ];

  return (
    <section className={styles.featuredProjects}>
      <div className={styles.projectsInner}>
        <div className={styles.projectsHeading}>
          <p className={`eyebrow ${styles.projectsEyebrow}`}>{section.eyebrow}</p>
          <h2>{section.heading}</h2>
          <p className={styles.projectsIntro}>{section.intro}</p>
        </div>

        {projects.length > 0 && (
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className={styles.projectCard}>
                {project.data.featuredImage && (
                  <img src={project.data.featuredImage} alt={project.data.title} loading="lazy" />
                )}
                <div className={styles.projectCardContent}>
                  <h3>{project.data.title}</h3>
                  <p>{project.data.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
