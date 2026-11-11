import { draftMode } from 'next/headers';
import { editAttr } from '@/lib/sanity/edit';
import styles from './PhotoGallery.module.css';

interface Props {
  /** The service/market document (needs _id and _type for click-to-edit) */
  doc: { _id?: string; _type?: string };
  photos?: (string | null)[] | null;
  photoKeys?: (string | null)[] | null;
}

function inPreview() {
  try {
    return draftMode().isEnabled;
  } catch {
    return false;
  }
}

/**
 * Photo gallery on service and market pages. Photos are added, removed and
 * reordered in the Studio ("Photo Gallery" field). In the Visual Editor an
 * empty gallery shows a box that opens the field, so photos can be added
 * straight from the page.
 */
export default function PhotoGallery({ doc, photos, photoKeys }: Props) {
  // Sanity returns null (not an empty list) when a page has no photos yet.
  // Keep each photo paired with its key, dropping any empty slots.
  const keys = photoKeys || [];
  const items = (photos || [])
    .map((src, i) => ({ src, key: keys[i] || undefined }))
    .filter((p): p is { src: string; key: string | undefined } => !!p.src);

  if (items.length === 0) {
    if (!inPreview()) return null;
    return (
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.empty} data-sanity={editAttr(doc, 'gallery')}>
            Photo gallery is empty. Click here to add photos.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.grid} data-sanity={editAttr(doc, 'gallery')}>
          {items.map((p, i) => (
            <figure
              key={p.key || i}
              className={styles.photo}
              data-sanity={p.key ? editAttr(doc, `gallery[_key=="${p.key}"]`) : undefined}
            >
              <img src={p.src} alt="" loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
