import Link from 'next/link';
import page from '@/data/pages/home.json';
import styles from './FeaturedProjects.module.css';

const projects = [
  {
    id: 'performing-arts-center',
    data: {
      title: 'Performing Arts Center',
      market: 'Civic / Institutional',
      shortDescription: 'Full interior coatings and specialty finishes for a large assembly space.',
      featuredImage: '/images/hero/hero-01.jpg',
      featured: true,
      sortOrder: 1,
    },
  },
];

export default function FeaturedProjects() {
  const section = page.projectsSection;
  const isSingle = projects.length === 1;

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.projectsInner}>
        <div className={styles.projectsHeading}>
          <div>
            <p className={`eyebrow ${styles.projectsEyebrow}`}>{section.eyebrow}</p>
            <h2 className={styles.heading}>{section.heading}</h2>
          </div>
          <p className={styles.projectsIntro}>{section.intro}</p>
        </div>

        <div className={`${styles.projectGrid} ${isSingle ? styles.projectGridSingle : ''}`}>
          {projects.map((project, index) => {
            const number = String(index + 1).padStart(2, '0');
            return (
              <article key={project.id} className={styles.projectCard}>
                <div className={styles.projectMedia}>
                  {project.data.featuredImage ? (
                    <img
                      className={styles.projectImage}
                      src={project.data.featuredImage}
                      alt={project.data.title}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.projectFallback} aria-hidden="true">
                      <span className={styles.projectFallbackNumber}>{number}</span>
                      <span className={styles.projectFallbackLine}></span>
                    </div>
                  )}
                  <div className={styles.projectMediaShade} />
                  {project.data.market && (
                    <div className={styles.projectMarket}>
                      <span>{project.data.market}</span>
                    </div>
                  )}
                </div>

                <div className={styles.projectContent}>
                  <div className={styles.projectMeta}>
                    <span>{number}</span>
                  </div>
                  <h3 className={styles.projectTitle}>{project.data.title}</h3>
                  <p className={styles.projectDesc}>{project.data.shortDescription}</p>
                  <Link href={`/projects/${project.id}`} className={styles.projectLink}>
                    View Project <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
