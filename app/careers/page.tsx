'use client';

import { useEffect } from 'react';
import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import page from '@/data/pages/careers.json';
import styles from './page.module.css';

export default function CareersPage() {
  const h = page.hero;

  useEffect(() => {
    const handleResumeClick = () => {
      if (typeof window !== 'undefined' && (window as any).openBidModal) {
        (window as any).openBidModal();
      }
    };

    const resumeBtn = document.getElementById('send-resume-btn');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', handleResumeClick);
      const unsubscribe = () => resumeBtn.removeEventListener('click', handleResumeClick);
      return unsubscribe;
    }
    return undefined;
  }, []);

  return (
    <SitePage>
      <InteriorHero
        eyebrow={h.eyebrow}
        title={h.title}
        intro={h.intro}
        image={(h as any).image}
        backgroundColor={h.backgroundColor}
        overlayColor={h.overlayColor}
        overlayOpacity={h.overlayOpacity}
        headingColor={h.headingColor}
        introColor={h.introColor}
        accentColor={h.accentColor}
      />
      <section className={styles.positions}>
        <div className={styles.inner}>
          <div className={styles.heading}>
            <p className="eyebrow" style={{ color: 'var(--gold)', margin: '0 0 12px' }}>Open Positions</p>
            <h2>Current Openings</h2>
          </div>
          <div className={styles.noOpenings}>
            <p>We don&apos;t have any open positions right now, but we&apos;re always interested in hearing from experienced commercial painters and project leaders.</p>
            <button id="send-resume-btn" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex', cursor: 'pointer' }}>
              Send Us Your Resume →
            </button>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
