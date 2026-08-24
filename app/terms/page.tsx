import type { Metadata } from 'next';
import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import RichBody from '@/components/RichBody';
import { getPage } from '@/lib/sanity/queries';
import styles from '../legal.module.css';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('terms');
  return {
    title: `${page?.title || 'Terms of Use'} | Schnurr Painting`,
    description: page?.seoDescription,
  };
}

export default async function TermsPage() {
  const page = await getPage('terms');
  const h = page?.hero || {};
  const updated = page?.updatedAt
    ? new Date(page.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : null;

  return (
    <SitePage>
      <InteriorHero eyebrow={h.eyebrow} title={h.title || 'Terms of Use'} intro={h.intro} image={h.image} imagePosition={h.imagePosition} backgroundColor={h.backgroundColor} overlayColor={h.overlayColor} overlayOpacity={h.overlayOpacity} headingColor={h.headingColor} introColor={h.introColor} accentColor={h.accentColor} />
      <section className={styles.section}>
        <div className={styles.inner}>
          {updated && <p className={styles.updated}>Last updated: {updated}</p>}
          <RichBody value={page?.body} />
        </div>
      </section>
    </SitePage>
  );
}
