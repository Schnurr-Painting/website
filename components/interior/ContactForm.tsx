'use client';

import styles from './ContactForm.module.css';

export default function ContactForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const status = document.getElementById('c-status');
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    submitBtn.disabled = true;

    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => body.append(key, String(value)));

    try {
      // Posts to /__forms.html, not "/" — see public/__forms.html for why.
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (response.ok) {
        form.style.display = 'none';
        if (status) { status.textContent = "Thanks — we've received your message and will be in touch shortly."; status.className = styles.success; }
      } else { throw new Error(); }
    } catch {
      if (status) { status.textContent = 'Something went wrong. Please try again or call us directly.'; status.className = styles.error; }
      submitBtn.disabled = false;
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" className={styles.form} onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="contact" />
          <p style={{ display: 'none' }}><label>Don&apos;t fill this out: <input name="bot-field" /></label></p>

          <div className={styles.fieldRow}>
            <div className={styles.field}><label htmlFor="c-name">Name *</label><input type="text" id="c-name" name="name" required /></div>
            <div className={styles.field}><label htmlFor="c-email">Email *</label><input type="email" id="c-email" name="email" required /></div>
          </div>
          <div className={styles.field}><label htmlFor="c-phone">Phone</label><input type="tel" id="c-phone" name="phone" /></div>
          <div className={styles.field}><label htmlFor="c-message">Message *</label><textarea id="c-message" name="message" rows={5} required /></div>

          <button type="submit" className={`btn btn-primary ${styles.submit}`}>Send Message <span aria-hidden="true">→</span></button>
          <p className={styles.status} id="c-status" role="status" aria-live="polite" />
        </form>

        <div className={styles.contactInfo}>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Phone</p>
            <a href="tel:+15122887905">(512) 288-7905</a>
          </div>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Email</p>
            <a href="mailto:invoices@schnurrpainting.com">invoices@schnurrpainting.com</a>
          </div>
          <div className={styles.infoBlock}>
            <p className={styles.infoLabel}>Address</p>
            <p>109 Hunters Pass Bldg, #37<br />Spicewood, Texas 78669</p>
          </div>
        </div>
      </div>
    </section>
  );
}
