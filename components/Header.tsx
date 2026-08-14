'use client';

import Link from 'next/link';
import settings from '@/data/site-settings.json';
import styles from './Header.module.css';

const links = [
  ['Services', '/services'],
  ['Markets', '/markets'],
  ['Projects', '/projects'],
  ['Safety', '/safety'],
  ['About', '/about'],
  ['Resources', '/resources'],
  ['Careers', '/careers'],
  ['Contact', '/contact'],
];

export default function Header() {
  const handleBidClick = () => {
    if (typeof window !== 'undefined' && (window as any).openBidModal) {
      (window as any).openBidModal();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="Schnurr Painting home">
          <div className={styles.brandLogoPlate}>
            <img
              className={styles.brandLogo}
              src={settings.brand.logo}
              alt={settings.brand.logoAlt}
              width="235"
              height="64"
            />
          </div>
        </Link>

        <nav className={styles.nav} aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href}>{label}</Link>
          ))}
        </nav>

        <button onClick={handleBidClick} className={styles.bidButton} type="button">
          Request a Bid <span aria-hidden="true">→</span>
        </button>
      </div>
    </header>
  );
}
