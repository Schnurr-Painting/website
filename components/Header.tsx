'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
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

export default function Header({
  logo,
  logoAlt,
  logoEdit,
}: {
  logo?: string;
  logoAlt?: string;
  /** Visual Editor: data-sanity value for the logo (see lib/sanity/edit.ts) */
  logoEdit?: string;
}) {
  // Phone/tablet menu (the full nav row is hidden below 1100px wide)
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu after navigating to another page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close with the Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const handleBidClick = () => {
    if (typeof window !== 'undefined' && (window as any).openBidModal) {
      (window as any).openBidModal();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="Schnurr Painting home">
          <div className={styles.brandLogoPlate} data-sanity={logoEdit}>
            <img
              className={styles.brandLogo}
              src={logo}
              alt={logoAlt || 'Schnurr Painting'}
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

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={menuOpen ? `${styles.menuIcon} ${styles.menuIconOpen}` : styles.menuIcon} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav
        id="mobile-menu"
        className={menuOpen ? `${styles.mobileNav} ${styles.mobileNavOpen}` : styles.mobileNav}
        aria-label="Mobile navigation"
        hidden={!menuOpen}
      >
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={pathname === href || pathname.startsWith(`${href}/`) ? styles.mobileNavActive : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
