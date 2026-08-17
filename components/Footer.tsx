import Link from 'next/link';
import { getCollection } from '@/lib/content';
import { getSiteFooter, getSiteSettings } from '@/lib/sanity/queries';
import styles from './Footer.module.css';

interface ServiceData {
  title: string;
  sortOrder: number;
}

export default async function Footer() {
  const [footer, settings, servicesRaw] = await Promise.all([
    getSiteFooter(),
    getSiteSettings(),
    getCollection<ServiceData>('services'),
  ]);

  const services = servicesRaw.sort((a, b) => a.data.sortOrder - b.data.sortOrder);
  const social = footer?.social || {};
  const contact = footer?.contact || {};

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <img className={styles.footerLogo} src={settings?.brand?.logo} alt={settings?.brand?.logoAlt} />
            <p className={styles.tagline}>{footer?.tagline}</p>
            <div className={styles.social}>
              {social.facebook && social.facebook !== '#' && (
                <a href={social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.9V12H8v3h2v6h3v-6h2.3l.5-3H13v-1.8c0-.7.3-1.2 1-1.2z"/>
                  </svg>
                </a>
              )}
              {social.linkedin && social.linkedin !== '#' && (
                <a href={social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                    <path d="M4.5 8.5h3v11h-3zM6 3.5a1.8 1.8 0 110 3.6A1.8 1.8 0 016 3.5zM10.5 8.5h3v1.6h.04c.42-.78 1.44-1.6 2.96-1.6 3.17 0 3.75 2 3.75 4.6v6.4h-3v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.19 1.48-2.19 3v5.8h-3z"/>
                  </svg>
                </a>
              )}
              {social.instagram && social.instagram !== '#' && (
                <a href={social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
          <div className={styles.footerCol}>
            <p className={styles.colHeading}>Services</p>
            <ul>
              {services.map(s => (
                <li key={s.id}><Link href={`/services/${s.id}`}>{s.data.title}</Link></li>
              ))}
            </ul>
          </div>
          <div className={styles.footerCol}>
            <p className={styles.colHeading}>Company</p>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/safety">Safety</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/projects">Projects</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <p className={styles.colHeading}>Resources</p>
            <ul>
              <li><Link href="/resources">Capability Statement</Link></li>
              <li><Link href="/resources">Prequalification</Link></li>
              <li><Link href="/resources">Client Portal</Link></li>
            </ul>
          </div>
          <div className={`${styles.footerCol} ${styles.footerContact}`}>
            <p className={styles.colHeading}>Contact</p>
            <ul>
              <li>{contact.addressLine1}<br />{contact.addressLine2}</li>
              <li><a href={`tel:+1${(contact.phone || '').replace(/\D/g, '')}`}>{contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerLegal}>
          <span>&copy; {new Date().getFullYear()} Schnurr Painting, LLC. All rights reserved.</span>
          <div className={styles.legalLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
