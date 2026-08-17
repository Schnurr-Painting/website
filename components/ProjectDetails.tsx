import RichBody from './RichBody';
import styles from './ProjectDetails.module.css';

interface Props {
  body?: any[];
  featuredImage?: string;
  location?: string;
  gc?: string;
  owner?: string;
  projectSize?: string;
  completionDate?: string;
  services?: string[];
  gallery?: string[];
}

export default function ProjectDetails({ body, featuredImage, location, gc, owner, projectSize, completionDate, services, gallery }: Props) {
  const specs = [
    { label: 'Location', value: location },
    { label: 'General Contractor', value: gc },
    { label: 'Owner', value: owner },
    { label: 'Size', value: projectSize },
    { label: 'Completed', value: completionDate },
  ].filter((s) => s.value);

  const hasServices = !!services && services.length > 0;
  const hasSidebar = specs.length > 0 || hasServices;

  // Lead with the first gallery photo (so it doesn't also show up in the grid
  // below); fall back to the featured image if there's no gallery yet.
  const [leadImage, ...restGallery] = gallery && gallery.length > 0 ? gallery : [featuredImage];
  const hasGallery = restGallery.length > 0;

  const hasBody = !!body && body.length > 0;

  if (!hasBody && !hasSidebar && !hasGallery && !leadImage) return null;

  return (
    <div className={styles.wrap}>
      {(hasBody || leadImage || hasSidebar) && (
        <div className={`${styles.inner} ${hasSidebar ? styles.withSidebar : ''}`}>
          {(hasBody || leadImage) && (
            <div className={styles.body}>
              {leadImage && <img className={styles.leadImage} src={leadImage} alt="" />}
              <RichBody value={body} />
            </div>
          )}
          {hasSidebar && (
            <aside className={styles.sidebar}>
              <h3>Project Details</h3>
              {specs.map((s) => (
                <div key={s.label} className={styles.specRow}>
                  <p className={styles.specLabel}>{s.label}</p>
                  <p className={styles.specValue}>{s.value}</p>
                </div>
              ))}
              {hasServices && (
                <div className={styles.serviceTags}>
                  {services!.map((s) => (
                    <span key={s} className={styles.serviceTag}>{s}</span>
                  ))}
                </div>
              )}
            </aside>
          )}
        </div>
      )}
      {hasGallery && (
        <div className={styles.galleryOuter}>
          <div className={`${styles.galleryGrid} ${restGallery.length === 1 ? styles.single : ''}`}>
            {restGallery.map((src, i) => (
              <img key={i} className={styles.galleryImg} src={src} alt="" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
