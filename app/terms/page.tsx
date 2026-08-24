import type { Metadata } from 'next';
import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import { getSiteFooter } from '@/lib/sanity/queries';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Terms of Use | Schnurr Painting',
  description: 'Terms governing use of the Schnurr Painting website.',
};

export const revalidate = 60;

export default async function TermsPage() {
  const footer = await getSiteFooter();
  const email = footer?.contact?.email || 'invoices@schnurrpainting.com';

  return (
    <SitePage>
      <InteriorHero eyebrow="Legal" title="Terms of Use" />
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.updated}>Last updated: August 2026</p>
          <div className={styles.body}>
            <p>
              These Terms of Use govern your access to and use of this website, operated by Schnurr Painting, LLC
              (&quot;Schnurr Painting,&quot; &quot;we,&quot; &quot;us&quot;). By using this site, you agree to these
              terms.
            </p>

            <h2>Use of This Site</h2>
            <p>
              This website is provided for informational purposes — to describe our services, share project work,
              and let visitors request bids, ask questions, or apply for open positions. You agree to use it only
              for lawful purposes and not to submit false, misleading, or malicious information through any form on
              this site.
            </p>

            <h2>No Guarantee of Pricing or Availability</h2>
            <p>
              Content on this site — including service descriptions and project examples — is for general
              information only and does not constitute a bid, quote, or contract offer. Actual project pricing,
              scope, and timelines are determined individually after a bid request is reviewed.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The content on this site, including text, images, and project photography, is owned by Schnurr
              Painting or used with permission, and may not be copied or reused without our consent.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              This site may link to third-party websites (such as social media or industry resources). We aren&apos;t
              responsible for the content or practices of sites we don&apos;t operate.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              This site is provided &quot;as is,&quot; without warranties of any kind. Schnurr Painting is not liable
              for any damages arising from use of this website, to the fullest extent permitted by law.
            </p>

            <h2>Changes to These Terms</h2>
            <p>
              We may update these terms from time to time. The &quot;Last updated&quot; date above reflects the most
              recent revision.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to <a href={`mailto:${email}`}>{email}</a>.
            </p>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
