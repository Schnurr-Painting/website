import { draftMode } from 'next/headers';
import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import { getCollection } from '@/lib/content';
import { getPage } from '@/lib/sanity/queries';
import { editAttr } from '@/lib/sanity/edit';
import styles from './page.module.css';
import ResourceRow from './ResourceRow';

interface ResourceData {
  title: string;
  resourceType: string;
  description?: any[];
  visibility: 'public' | 'private' | 'request_required';
  file?: string;
  externalUrl?: string;
  sortOrder: number;
}

interface Vendor {
  _key: string;
  name?: string;
  url?: string;
  logo?: string;
}

interface Tool {
  _key: string;
  name?: string;
  description?: string;
}

function inPreview() {
  try {
    return draftMode().isEnabled;
  } catch {
    return false;
  }
}

// Vendors page (formerly "Resources"). The vendor and tool lists are edited
// in the Studio under Vendors → Page Settings → "Vendors & Tools". The
// company documents (capability statement etc.) are listed underneath.
export default async function VendorsPage() {
  const page = await getPage('vendors');
  const h = page?.hero || {};
  const preview = inPreview();
  const vendors: Vendor[] = (page?.vendors || []).filter((v: Vendor) => v?.name);
  const tools: Tool[] = (page?.tools || []).filter((t: Tool) => t?.name);
  const resources = (await getCollection<ResourceData>('resources'))
    .filter((r) => r.data.visibility !== 'private')
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder);

  return (
    <SitePage>
      <InteriorHero
        eyebrow={h.eyebrow}
        title={h.title}
        intro={h.intro}
        image={h.image}
        imageEdit={editAttr(page, 'hero.image')}
        imagePosition={h.imagePosition}
        backgroundColor={h.backgroundColor}
        overlayColor={h.overlayColor}
        overlayOpacity={h.overlayOpacity}
        headingColor={h.headingColor}
        introColor={h.introColor}
        accentColor={h.accentColor}
      />

      <section className={styles.vendors}>
        <div className={styles.inner}>
          {page?.intro && <p className={styles.intro}>{page.intro}</p>}

          <div className={styles.lists}>
            {(vendors.length > 0 || preview) && (
              <div className={styles.listBlock} data-sanity={editAttr(page, 'vendors')}>
                <h2>Vendors</h2>
                {vendors.length > 0 ? (
                  <ul className={styles.itemList}>
                    {vendors.map((v) => (
                      <li key={v._key} data-sanity={editAttr(page, `vendors[_key=="${v._key}"]`)}>
                        {v.logo && <img className={styles.vendorLogo} src={v.logo} alt="" />}
                        <div className={styles.itemText}>
                          <strong>{v.name}</strong>
                          {v.url && (
                            <a href={v.url} target="_blank" rel="noopener noreferrer">
                              Website <span aria-hidden="true">↗</span>
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.empty}>No vendors yet. Click here to add them.</p>
                )}
              </div>
            )}

            {(tools.length > 0 || preview) && (
              <div className={styles.listBlock} data-sanity={editAttr(page, 'tools')}>
                <h2>Tools We Use</h2>
                {tools.length > 0 ? (
                  <ul className={styles.itemList}>
                    {tools.map((t) => (
                      <li key={t._key} data-sanity={editAttr(page, `tools[_key=="${t._key}"]`)}>
                        <div className={styles.itemText}>
                          <strong>{t.name}</strong>
                          {t.description && <span>{t.description}</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.empty}>No tools yet. Click here to add them.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {resources.length > 0 && (
        <section className={styles.resources} id="documents">
          <div className={styles.inner}>
            <h2 className={styles.documentsHeading}>Company Documents</h2>
            <div className={styles.rows}>
              {resources.map((resource) => {
                const isRequest = resource.data.visibility === 'request_required';
                const href = isRequest ? '#' : (resource.data.file || resource.data.externalUrl || null);
                return (
                  <ResourceRow
                    key={resource.id}
                    title={resource.data.title}
                    description={resource.data.description}
                    resourceType={resource.data.resourceType}
                    isRequest={isRequest}
                    href={href}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </SitePage>
  );
}
