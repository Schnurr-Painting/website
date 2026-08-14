'use client';

import { useEffect, useRef } from 'react';
import page from '@/data/pages/home.json';
import styles from './RequestBidModal.module.css';

export default function RequestBidModal() {
  const section = (page as any).requestBidSection || { eyebrow: 'Get Started', heading: 'Request a Bid', intro: 'Tell us about your project and we\'ll be in touch.' };
  const modalRef = useRef<HTMLDivElement>(null);

  // Global function that Header button can call
  useEffect(() => {
    (window as any).openBidModal = () => {
      if (modalRef.current) {
        modalRef.current.setAttribute('aria-hidden', 'false');
        modalRef.current.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    };

    return () => {
      delete (window as any).openBidModal;
    };
  }, []);

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.setAttribute('aria-hidden', 'true');
      modalRef.current.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => body.append(key, String(value)));

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (response.ok) {
        document.getElementById('bid-modal-success')?.removeAttribute('hidden');
        form.style.display = 'none';
      }
    } catch (err) {
      alert('There was an error submitting the form. Please email us directly at invoices@schnurrpainting.com');
    }
  };

  return (
    <div className={styles.modal} id="bid-modal" ref={modalRef} aria-hidden="true">
      <div className={styles.backdrop} onClick={handleBackdropClick} />
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="bid-modal-heading">
        <button type="button" className={styles.close} onClick={closeModal} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </button>

        <div className={styles.heading}>
          <p className="eyebrow">{section.eyebrow}</p>
          <h2 id="bid-modal-heading">{section.heading}</h2>
          <p className={styles.intro}>{section.intro}</p>
        </div>

        <form name="request-bid" method="POST" data-netlify="true" netlify-honeypot="bot-field" className={styles.form} onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="request-bid" />
          <p style={{ display: 'none' }}><label>Don't fill this out: <input name="bot-field" /></label></p>

          <div className={styles.fieldRow}>
            <div className={styles.field}><label htmlFor="rb-name">Name *</label><input type="text" id="rb-name" name="name" required /></div>
            <div className={styles.field}><label htmlFor="rb-email">Email *</label><input type="email" id="rb-email" name="email" required /></div>
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.field}><label htmlFor="rb-phone">Phone</label><input type="tel" id="rb-phone" name="phone" /></div>
            <div className={styles.field}><label htmlFor="rb-company">Company</label><input type="text" id="rb-company" name="company" /></div>
          </div>
          <div className={styles.field}><label htmlFor="rb-message">Project Description</label><textarea id="rb-message" name="message" rows={4} placeholder="Tell us about your project, location, scope, and timeline..." /></div>
          <div className={styles.field}><label htmlFor="rb-resume">Resume (optional)</label><input type="text" id="rb-resume" name="resume" placeholder="Describe your experience or attach a file..." /></div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>Send Request →</button>
        </form>

        <div id="bid-modal-success" className={styles.success} hidden>
          <div className={styles.successIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12l5 5L20 6"/>
            </svg>
          </div>
          <h2>Request Sent</h2>
          <p>Thanks — we've got your request and will be in touch shortly.</p>
          <button type="button" className={`btn ${styles.successClose}`} onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
}
