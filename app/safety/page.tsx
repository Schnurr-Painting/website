import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import CredentialsStrip from '@/components/CredentialsStrip';
import { PortableText } from '@portabletext/react';
import { richBodyComponents } from '@/components/RichBody';
import { getPage } from '@/lib/sanity/queries';
import { getStatsForPage } from '@/lib/stats';
import styles from './page.module.css';

export default async function Page() {
  const [page, stats] = await Promise.all([getPage('safety'), getStatsForPage('safety')]);
  const h = page?.hero || {};
  const sections = (page?.sections as any[]) || [];
  const certifications = (page?.certifications as string[]) || [];
  const hasSitePractices = !!page?.sitePractices && page.sitePractices.length > 0;
  const hasCoordination = !!page?.coordination && page.coordination.length > 0;
  const contact = page?.safetyContact;
  const hasContact = !!contact?.name;
  const doc = page?.safetyDocument;
  const hasDocument = !!(doc?.file || doc?.externalUrl);
  const hasAnyContent =
    sections.length > 0 ||
    certifications.length > 0 ||
    hasSitePractices ||
    hasCoordination ||
    hasContact ||
    hasDocument;

  return (
    <SitePage>
      <InteriorHero
        eyebrow={h.eyebrow}
        title={h.title}
        intro={h.intro}
        image={h.image}
        backgroundColor={h.backgroundColor}
        overlayColor={h.overlayColor}
        overlayOpacity={h.overlayOpacity}
        headingColor={h.headingColor}
        introColor={h.introColor}
        accentColor={h.accentColor}
      />

      <CredentialsStrip stats={stats.map((s) => s.data)} />

      {sections.length > 0 && (
        <section className={styles.pillars}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <p className={`eyebrow ${styles.eyebrow}`}>Our Approach</p>
              <h2>Built around safe execution.</h2>
            </div>
            <div className={styles.pillarGrid}>
              {sections.map((section, i) => (
                <article key={i} className={styles.pillarCard}>
                  <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{section.title}</h3>
                  <PortableText value={section.copy} components={richBodyComponents} />
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {certifications.length > 0 && (
        <section className={styles.certifications}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <p className={`eyebrow ${styles.eyebrow}`}>Credentials</p>
              <h2>Certifications &amp; Training</h2>
            </div>
            <div className={styles.certGrid}>
              {certifications.map((c, i) => (
                <div key={i} className={styles.certBadge}>
                  <span className={styles.certCheck} aria-hidden="true">&#10003;</span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(hasSitePractices || hasCoordination) && (
        <section className={styles.practices}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <p className={`eyebrow ${styles.eyebrow}`}>On The Job</p>
              <h2>Site-Specific Practices</h2>
            </div>
            <div className={styles.practiceGrid}>
              {hasSitePractices && (
                <div className={styles.practiceBlock}>
                  <PortableText value={page.sitePractices} components={richBodyComponents} />
                </div>
              )}
              {hasCoordination && (
                <div className={styles.practiceBlock}>
                  <h3>Working Around Your Team</h3>
                  <PortableText value={page.coordination} components={richBodyComponents} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {(hasContact || hasDocument) && (
        <section className={styles.closing}>
          <div className={styles.inner}>
            <div className={styles.closingRow}>
              {hasContact && (
                <div className={styles.contactBlock}>
                  <p className={styles.contactKicker}>Questions about our safety program?</p>
                  <p className={styles.contactName}>
                    {contact.name}
                    {contact.title && <span className={styles.contactTitle}> — {contact.title}</span>}
                  </p>
                  {contact.note && <p className={styles.contactNote}>{contact.note}</p>}
                  <div className={styles.contactLinks}>
                    {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
                    {contact.phone && <a href={`tel:${contact.phone.replace(/\D/g, '')}`}>{contact.phone}</a>}
                  </div>
                </div>
              )}
              {hasDocument && (
                <a
                  className={styles.documentBlock}
                  href={doc.file || doc.externalUrl}
                  target={doc.externalUrl ? '_blank' : undefined}
                  rel={doc.externalUrl ? 'noopener noreferrer' : undefined}
                >
                  <span>{doc.label || 'Download Safety Program'}</span>
                  <span className={styles.documentArrow} aria-hidden="true">&rarr;</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {!hasAnyContent && (
        <div className={styles.comingSoon}>
          <p>Content coming soon.</p>
        </div>
      )}
    </SitePage>
  );
}
