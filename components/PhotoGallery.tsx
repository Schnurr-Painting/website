import { draftMode } from 'next/headers';
import { editAttr } from '@/lib/sanity/edit';
import styles from './PhotoGallery.module.css';

interface Props {
  /** The service/market document (needs _id and _type for click-to-edit) */
  doc: { _id?: string; _type?: string };
  photos?: string[];
  photoKeys?: string[];
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
export default function PhotoGallery({ doc, photos = [], photoKeys = [] }: Props) {
  const list = photos.filter(Boolean);

  if (list.length === 0) {
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
          {list.map((src, i) => (
            <figure
              key={photoKeys[i] || i}
              className={styles.photo}
              data-sanity={photoKeys[i] ? editAttr(doc, `gallery[_key=="${photoKeys[i]}"]`) : undefined}
            >
              <img src={src} alt="" loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
