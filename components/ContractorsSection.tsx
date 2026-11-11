import { getContractors } from '@/lib/sanity/queries';
import { editAttr } from '@/lib/sanity/edit';
import styles from './ContractorsSection.module.css';

interface Contractor {
  _key: string;
  name?: string;
  logo?: string;
}

/**
 * "General contractors we've worked with" — replaces the testimonials
 * sections. Edited in the Studio under Site Settings → General Contractors.
 */
export default async function ContractorsSection() {
  const data = await getContractors();
  const contractors: Contractor[] = (data?.contractors || []).filter((c: Contractor) => c?.name);
  if (contractors.length === 0) return null;

  return (
    <section className={styles.section} data-sanity={editAttr(data, 'contractors')}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          {data?.eyebrow && <p className={`eyebrow ${styles.eyebrow}`}>{data.eyebrow}</p>}
          {data?.heading && <h2>{data.heading}</h2>}
        </div>
        <ul className={styles.grid}>
          {contractors.map((c) => (
            <li
              key={c._key}
              className={styles.item}
              data-sanity={editAttr(data, `contractors[_key=="${c._key}"]`)}
            >
              {c.logo ? <img src={c.logo} alt={c.name} /> : <span>{c.name}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
