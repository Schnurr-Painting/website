import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import TestimonialsSection from '@/components/TestimonialsSection';
import CredentialsStrip from '@/components/CredentialsStrip';
import { getPage, getSharedLabels } from '@/lib/sanity/queries';
import { getCollection } from '@/lib/content';
import { getTestimonialsForPage } from '@/lib/testimonials';
import { getStatsForPage } from '@/lib/stats';
import { urlFor } from '@/lib/sanity/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { richBodyComponents } from '@/components/RichBody';
import styles from './page.module.css';

const storyComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <img
        className={styles.storyInlineImage}
        src={urlFor(value).width(1200).url()}
        alt={value?.alt || ''}
      />
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href || '';
      const external = /^https?:\/\//.test(href);
      return (
        <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
          {children}
        </a>
      );
    },
  },
};

interface TeamData {
  name: string;
  role: string;
  headshot?: string;
  bio?: any[];
  email?: string;
  phone?: string;
  publicProfile?: boolean;
  displayOrder: number;
}

export default async function AboutPage() {
  const [page, shared, stats, teamRaw, testimonials] = await Promise.all([
    getPage('about'),
    getSharedLabels(),
    getStatsForPage('about'),
    getCollection<TeamData>('team'),
    getTestimonialsForPage('about'),
  ]);

  const h = page?.hero || {};
  const hasSections = !!page?.sections && page.sections.length > 0;
  const hasTestimonials = testimonials.length > 0;
  const team = teamRaw
    .filter((m) => m.data.publicProfile)
    .sort((a, b) => a.data.displayOrder - b.data.displayOrder);

  return (
    <SitePage>
      <InteriorHero eyebrow={h.eyebrow} title={h.title} intro={h.intro} image={h.image} imagePosition={h.imagePosition} backgroundColor={h.backgroundColor} overlayColor={h.overlayColor} overlayOpacity={h.overlayOpacity} headingColor={h.headingColor} introColor={h.introColor} accentColor={h.accentColor} />

      {page?.story && (
        <section className={`${styles.story} ${hasSections ? styles.hasSections : ''}`}>
          <div className={styles.storyInner}>
            <p className={`eyebrow ${styles.storyEyebrow}`}>About Schnurr</p>
            <div className={`${styles.storyGrid} ${page.storyImage?.url ? styles.withImage : ''}`}>
              <div className={styles.storyText}>
                <PortableText value={page.story} components={storyComponents} />
              </div>
              {page.storyImage?.url && (
                <figure className={styles.storyImageWrap}>
                  <img src={page.storyImage.url} alt={page.storyImage.name || ''} />
                  {(page.storyImage.name || page.storyImage.title) && (
                    <figcaption className={styles.storyImageCaption}>
                      {page.storyImage.name && <span className={styles.storyImageName}>{page.storyImage.name}</span>}
                      {page.storyImage.title && <span className={styles.storyImageTitle}>{page.storyImage.title}</span>}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          </div>
        </section>
      )}

      {page?.sections && page.sections.length > 0 && (
        <section className={styles.body}>
          <div className={styles.inner}>
            {(page.sections as any[]).map((section, i) => (
              <article key={i} className={styles.section}>
                <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section.title}</h2>
                  <PortableText value={section.copy} components={richBodyComponents} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <CredentialsStrip stats={stats.map((s) => s.data)} />
      <TestimonialsSection page="about" />

      {team.length > 0 && (
        <section className={`${styles.teamBand} ${!hasTestimonials ? styles.noTestimonials : ''}`}>
          <div className={styles.teamInner}>
            <p className={`eyebrow ${styles.teamEyebrow}`}>{shared?.teamBandEyebrow}</p>
            <h2 className={styles.teamHeading}>{shared?.teamBandHeading}</h2>
            <div className={styles.teamGrid}>
              {team.map((member) => (
                <article key={member.id} className={styles.teamCard}>
                  {member.data.headshot && <img src={member.data.headshot} alt={member.data.name} />}
                  <div className={styles.teamCopy}>
                    <h3>{member.data.name}</h3>
                    <p className={styles.role}>{member.data.role}</p>
                    {(member.data.bio?.length ?? 0) > 0 && (
                      <div className={styles.bio}>
                        <PortableText value={member.data.bio} components={richBodyComponents} />
                      </div>
                    )}
                    {member.data.email && <a href={`mailto:${member.data.email}`}>{member.data.email}</a>}
                    {member.data.phone && <a href={`tel:${member.data.phone.replace(/\D/g, '')}`}>{member.data.phone}</a>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </SitePage>
  );
}
