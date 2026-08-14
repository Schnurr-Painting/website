'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import page from '@/data/pages/home.json';
import styles from './Hero.module.css';

const MOTIONS = ['zoom-in', 'pan-left', 'zoom-out', 'pan-up'];

export default function Hero() {
  const h = page.hero;
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const photosRef = useRef<(HTMLImageElement | null)[]>([]);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  const slides = (h.slides || []).map((slide, index) => ({
    src: slide.image,
    position: slide.imagePosition || 'center',
    motion: MOTIONS[index % MOTIONS.length],
  }));

  // Parse heading line 3 to italicize last word
  const line3Words = (h.headingLine3 || '').split(' ');
  const line3Last = line3Words.pop();
  const line3Rest = line3Words.join(' ');

  const showSlide = (next: number) => {
    if (photosRef.current[current]) {
      photosRef.current[current]?.classList.remove('active');
      buttonsRef.current[current]?.classList.remove('active');
    }

    const newCurrent = next % slides.length;
    setCurrent(newCurrent);

    // Restart animation
    if (photosRef.current[newCurrent]) {
      const el = photosRef.current[newCurrent];
      el!.style.animation = 'none';
      void el!.offsetWidth; // Trigger reflow
      el!.style.animation = '';
      el!.classList.add('active');
      buttonsRef.current[newCurrent]?.classList.add('active');
    }

    if (counterRef.current) {
      counterRef.current.textContent = String(newCurrent + 1).padStart(2, '0');
    }
  };

  const advance = () => showSlide(current + 1);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 8000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current]);

  const handleButtonClick = (index: number) => {
    showSlide(index);
    startTimer();
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroCopyPanel}>
        <div className={styles.heroCopyWrap}>
          <p className="eyebrow">{h.eyebrow}</p>

          <h1>
            {h.headingLine1}
            <br />
            {h.headingLine2}
            <br />
            {line3Rest && `${line3Rest} `}
            <em>{line3Last}</em>
          </h1>

          <p className={styles.intro}>{h.intro}</p>

          <div className={styles.actions}>
            <Link href="/#request-bid" className="btn btn-primary">
              Request a Bid <span aria-hidden="true">→</span>
            </Link>

            <Link href="/resources" className="btn btn-outline-light">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 4v10" />
                <path d="m8 11 4 4 4-4" />
                <path d="M5 20h14" />
              </svg>
              View Capability Statement
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.heroMedia}>
        <div className={styles.slides} aria-hidden="true">
          {slides.map((slide, index) => (
            <img
              key={index}
              ref={(el) => {
                photosRef.current[index] = el;
              }}
              className={`${styles.heroPhoto} ${styles[slide.motion]} ${index === 0 ? styles.active : ''}`}
              src={slide.src}
              alt=""
              style={{ objectPosition: slide.position }}
            />
          ))}
        </div>

        <div className={styles.paintTransition} aria-hidden="true" />

        <div className={styles.sliderUi}>
          <div className={styles.sliderLines}>
            {slides.map((_, index) => (
              <button
                key={index}
                ref={(el) => {
                  buttonsRef.current[index] = el;
                }}
                className={index === 0 ? styles.active : ''}
                type="button"
                aria-label={`Show image ${index + 1}`}
                onClick={() => handleButtonClick(index)}
              />
            ))}
          </div>

          <span className={styles.counter}>
            <span ref={counterRef}>01</span> / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
