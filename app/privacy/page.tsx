import type { Metadata } from 'next';
import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import { getSiteFooter } from '@/lib/sanity/queries';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | Schnurr Painting',
  description: 'How Schnurr Painting collects, uses, and protects information submitted through this website.',
};

export const revalidate = 60;

export default async function PrivacyPage() {
  const footer = await getSiteFooter();
  const email = footer?.contact?.email || 'invoices@schnurrpainting.com';
  const phone = footer?.contact?.phone || '(512) 288-7905';
  const address = [footer?.contact?.addressLine1, footer?.contact?.addressLine2].filter(Boolean).join(', ');

  return (
    <SitePage>
      <InteriorHero eyebrow="Legal" title="Privacy Policy" />
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.updated}>Last updated: August 2026</p>
          <div className={styles.body}>
            <p>
              Schnurr Painting, LLC (&quot;Schnurr Painting,&quot; &quot;we,&quot; &quot;us&quot;) respects your
              privacy. This policy explains what information we collect through this website, how we use it, and
              your choices.
            </p>

            <h2>Information We Collect</h2>
            <p>When you use a form on this site — Request a Bid, Contact, or Careers/Job Application — we collect:</p>
            <ul>
              <li>Your name, email address, and phone number</li>
              <li>Any project, company, or message details you provide</li>
              <li>For job applications: your resume/CV file and application details you submit</li>
            </ul>
            <p>
              We do not use tracking cookies for advertising, and we do not sell or rent your information to third
              parties.
            </p>

            <h2>How We Use Information</h2>
            <p>We use the information you submit to:</p>
            <ul>
              <li>Respond to bid requests, project inquiries, and general questions</li>
              <li>Review job applications for open positions</li>
              <li>Maintain records of business communications</li>
            </ul>

            <h2>How Information Is Handled</h2>
            <p>
              Form submissions on this site are processed through Netlify, our website hosting provider, and
              delivered to Schnurr Painting&apos;s team. We retain submissions only as long as reasonably needed for
              the purpose they were submitted for.
            </p>

            <h2>Your Choices</h2>
            <p>
              To request that we delete information you&apos;ve submitted, or if you have any question about this
              policy, contact us at{' '}
              <a href={`mailto:${email}`}>{email}</a> or {phone}
              {address && <> ({address})</>}.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. The &quot;Last updated&quot; date above reflects the most
              recent revision.
            </p>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
