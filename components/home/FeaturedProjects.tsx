import Link from 'next/link';
import { getCollection } from '@/lib/content';
import RichBody from '@/components/RichBody';
import styles from './FeaturedProjects.module.css';

interface ProjectData {
  title: string;
  market?: string;
  shortDescription: any;
  featuredImage?: string;
  featured?: boolean;
  sortOrder: number;
}

interface SectionCopy {
  eyebrow?: string;
  heading?: string;
  intro?: any;
}

export default async function FeaturedProjects({ section }: { section?: SectionCopy }) {
  const sec = section || {};
  const projects = (await getCollection<ProjectData>('projects'))
    .filter((p) => p.data.featured)
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder)
    .slice(0, 3);

  const isSingle = projects.length === 1;

  if (projects.length === 0) return null;

  return (
    <section className={styles.projects} id="projects">
      <div className={styles.projectsInner}>
        <div className={styles.projectsHeading}>
          <div>
            <p className={`eyebrow ${styles.projectsEyebrow}`}>{sec.eyebrow}</p>
            <h2 className={styles.heading}>{sec.heading}</h2>
          </div>
          <RichBody value={sec.intro} className={styles.projectsIntro} />
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
                  <RichBody value={project.data.shortDescription} className={styles.projectDesc} />
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
