'use client';

import Link from 'next/link';
import Image from 'next/image';
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
  return (
    <>
      <header className={styles.header}>
        <div className="container" style={{ display: 'contents' }}>
          <div className={styles.headerInner}>
            <Link href="/" className={styles.brand} aria-label="Schnurr Painting home">
              <div className={styles.brandLogoPlate}>
                <img
                  className={styles.brandLogo}
                  src={settings.brand.logo}
                  alt={settings.brand.logoAlt}
                />
              </div>
            </Link>

            <nav className={styles.nav} aria-label="Primary navigation">
              {links.map(([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ))}
            </nav>

            <Link href="/#request-bid" className={styles.bidButton}>
              Request a Bid
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </header>
      <RequestBidModal />
    </>
  );
}

function RequestBidModal() {
  return (
    <div
      id="request-bid"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        pointerEvents: 'none',
      }}
    >
      {/* Modal content will go here */}
    </div>
  );
}
