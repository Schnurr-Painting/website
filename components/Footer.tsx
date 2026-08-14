import Link from 'next/link';
import footer from '@/data/site-footer.json';
import settings from '@/data/site-settings.json';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container" style={{ display: 'contents' }}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <img
                className={styles.footerLogo}
                src={settings.brand.logo}
                alt={settings.brand.logoAlt}
              />
            </div>

            <div className={styles.footerMenu}>
              <ul>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/markets">Markets</Link></li>
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/about">About</Link></li>
              </ul>
              <ul>
                <li><Link href="/safety">Safety</Link></li>
                <li><Link href="/resources">Resources</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className={styles.footerContact}>
              <div className={styles.contactBlock}>
                <h3>Contact</h3>
                <a href={`tel:${footer.contact.phone}`}>{footer.contact.phone}</a>
                <a href={`mailto:${footer.contact.email}`}>{footer.contact.email}</a>
              </div>
              <div className={styles.contactBlock}>
                <h3>Address</h3>
                <p>{footer.contact.addressLine1}</p>
                {footer.contact.addressLine2 && <p>{footer.contact.addressLine2}</p>}
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Schnurr Painting. All rights reserved.
            </p>
            <div className={styles.social}>
              {footer.social.linkedin !== '#' && (
                <a href={footer.social.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
              {footer.social.instagram !== '#' && (
                <a href={footer.social.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
