import { getDetailCta, getSiteFooter } from '@/lib/sanity/queries';
import BidCtaButton from './BidCtaButton';
import styles from './DetailCta.module.css';

type DetailCtaPageKey = 'home' | 'services' | 'markets' | 'projects';

export default async function DetailCta({ page }: { page: DetailCtaPageKey }) {
  const [cta, footer] = await Promise.all([
    getDetailCta(page),
    getSiteFooter(),
  ]);

  if (!cta?.heading) return null;

  const phone = footer?.contact?.phone;

  const cssVars = {
    '--cta-bg': cta.backgroundColor || '#1B1815',
    '--cta-eyebrow': cta.eyebrowColor || 'var(--gold)',
    '--cta-heading': cta.headingColor || '#fffdf8',
    '--cta-btn-bg': cta.buttonColor || 'var(--gold)',
    '--cta-btn-text': cta.buttonTextColor || '#1B1815',
    '--cta-phone': cta.phoneColor || cta.eyebrowColor || 'var(--gold)',
  } as React.CSSProperties;

  return (
    <section className={styles.cta} style={cssVars}>
      <div className={styles.inner}>
        {cta.eyebrow && <p className={`eyebrow ${styles.eyebrow}`}>{cta.eyebrow}</p>}
        <h2 className={styles.heading}>{cta.heading}</h2>
        <div className={styles.actions}>
          <BidCtaButton className={styles.button}>Request a Bid</BidCtaButton>
          {phone && (
            <a className={styles.phone} href={`tel:${phone.replace(/\D/g, '')}`}>
              or call {phone}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
