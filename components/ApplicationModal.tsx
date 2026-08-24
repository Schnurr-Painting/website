'use client';

import { useEffect, useState } from 'react';
import styles from './ApplicationModal.module.css';

const ROLES = ['Crew Painter', 'Foreman / Crew Lead', 'Apprentice', 'Estimator', 'Project Manager', 'Not Sure Yet'];

export default function ApplicationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [positionTitle, setPositionTitle] = useState('');
  const [roleInterest, setRoleInterest] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (window as any).openApplicationModal = (title?: string, roleType?: string) => {
      setSubmitted(false);
      setError('');
      setPositionTitle(title || '');
      setRoleInterest(roleType && ROLES.includes(roleType) ? roleType : '');
      setIsOpen(true);
    };
    return () => { delete (window as any).openApplicationModal; };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    setError('');

    // Posts to our own /api/job-application route rather than directly to
    // Netlify Forms — multipart submissions (needed for the resume file)
    // fail on Netlify's Next.js Runtime. The route parses the upload
    // itself, stores the resume in Netlify Blobs, and forwards the rest
    // of the fields to Netlify Forms as plain url-encoded data.
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/job-application', { method: 'POST', body: formData });
      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setError('Something went wrong sending that. Please try again, or call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const heading = positionTitle ? `Apply: ${positionTitle}` : 'Interested in Joining the Crew?';

  return (
    <div className={styles.modal}>
      <div className={styles.backdrop} onClick={closeModal} />
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="application-modal-heading">
        <button type="button" className={styles.close} onClick={closeModal} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </button>

        {submitted ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12l5 5L20 6"/>
              </svg>
            </div>
            <h2>Application Received</h2>
            <p>Thanks for your interest &mdash; we&apos;ll review your application and reach out if it&apos;s a fit.</p>
            <button type="button" className={`btn ${styles.successClose}`} onClick={closeModal}>Close</button>
          </div>
        ) : (
          <>
            <div className={styles.heading}>
              <p className="eyebrow">General Application</p>
              <h2 id="application-modal-heading">{heading}</h2>
              <p className={styles.intro}>Send us your info and we&apos;ll follow up if it&apos;s a fit.</p>
            </div>

            <form
              name="job-application"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              encType="multipart/form-data"
              className={styles.form}
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="job-application" />
              <input type="hidden" name="appliedForPosition" value={positionTitle} />
              <input type="hidden" name="resumeUrl" value="" />
              <p style={{ display: 'none' }}>
                <label>Don&apos;t fill this out: <input name="bot-field" /></label>
              </p>

              <div className={styles.fieldRow}>
                <div className={styles.field}><label htmlFor="app-name">Name *</label><input type="text" id="app-name" name="name" required /></div>
                <div className={styles.field}><label htmlFor="app-email">Email *</label><input type="email" id="app-email" name="email" required /></div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}><label htmlFor="app-phone">Phone *</label><input type="tel" id="app-phone" name="phone" required /></div>
                <div className={styles.field}>
                  <label htmlFor="app-role">Role Interested In</label>
                  <select id="app-role" name="roleInterest" value={roleInterest} onChange={(e) => setRoleInterest(e.target.value)}>
                    <option value="">Select one</option>
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="app-experience">Experience</label>
                <input type="text" id="app-experience" name="experience" placeholder="Years in the trade, relevant certifications, past employers—whatever's relevant." />
              </div>

              <div className={styles.field}>
                <label htmlFor="app-resume">Resume</label>
                <input type="file" id="app-resume" name="resume" accept=".pdf,.doc,.docx" />
              </div>

              <div className={styles.field}>
                <label htmlFor="app-message">Anything Else</label>
                <textarea id="app-message" name="message" rows={3} />
              </div>

              <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit Application'} <span aria-hidden="true">→</span>
              </button>

              {error && <p className={styles.formStatus}>{error}</p>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
