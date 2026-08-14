'use client';

import { useEffect } from 'react';
import page from '@/data/pages/home.json';
import styles from './RequestBidModal.module.css';

export default function RequestBidModal() {
  const section = (page as any).requestBidSection || { eyebrow: 'Get Started', heading: 'Request a Bid', intro: 'Tell us about your project and we\'ll be in touch.' };

  useEffect(() => {
    const openModal = () => {
      const modal = document.getElementById('bid-modal');
      if (modal) { modal.setAttribute('aria-hidden', 'false'); modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
    };

    const closeModal = () => {
      const modal = document.getElementById('bid-modal');
      if (modal) { modal.setAttribute('aria-hidden', 'true'); modal.classList.remove('open'); document.body.style.overflow = ''; }
    };

    document.querySelectorAll('a[href="#request-bid"], a[href="/#request-bid"]').forEach(btn => {
      btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    });

    document.querySelectorAll('[data-close-modal]').forEach(el => {
      el.addEventListener('click', closeModal);
    });

    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className={styles.modal} id="bid-modal" aria-hidden="true">
      <div className={styles.backdrop} data-close-modal />
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="bid-modal-heading">
        <button type="button" className={styles.close} data-close-modal aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </button>

        <div className={styles.heading}>
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id="bid-modal-heading">{section.heading}</h2>
          <p className={styles.intro}>{section.intro}</p>
        </div>

        <form name="request-bid" method="POST" data-netlify="true" className={styles.form} onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(form) as any).toString() })
            .then(() => { document.getElementById('bid-modal-success')?.removeAttribute('hidden'); form.style.display = 'none'; })
            .catch(() => alert('There was an error. Please try again.'));
        }}>
          <input type="hidden" name="form-name" value="request-bid" />
          <div className={styles.fieldRow}>
            <div className={styles.field}><label htmlFor="rb-name">Name *</label><input type="text" id="rb-name" name="name" required /></div>
            <div className={styles.field}><label htmlFor="rb-email">Email *</label><input type="email" id="rb-email" name="email" required /></div>
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.field}><label htmlFor="rb-phone">Phone</label><input type="tel" id="rb-phone" name="phone" /></div>
            <div className={styles.field}><label htmlFor="rb-company">Company</label><input type="text" id="rb-company" name="company" /></div>
          </div>
          <div className={styles.field}>
            <label htmlFor="rb-message">Project Description</label>
            <textarea id="rb-message" name="message" rows={4} placeholder="Tell us about your project, location, scope, and timeline..." />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
            Send Request →
          </button>
        </form>

        <div id="bid-modal-success" className={styles.success} hidden>
          <div className={styles.successIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12l5 5L20 6"/>
            </svg>
          </div>
          <h2>Request Sent</h2>
          <p>Thanks — we&apos;ve got your request and will be in touch shortly.</p>
          <button type="button" className={`btn ${styles.successClose}`} data-close-modal>Close</button>
        </div>
      </div>
    </div>
  );
}
