'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import page from '@/data/pages/home.json';
import styles from './Hero.module.css';

const MOTIONS = ['zoom-in', 'pan-left', 'zoom-out', 'pan-up'];

export default function Hero() {
  const h = page.hero;
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = (h.slides || []).map((slide, index) => ({
    src: slide.image,
    position: slide.imagePosition || 'center',
    motion: MOTIONS[index % MOTIONS.length],
  }));

  const line3Words = (h.headingLine3 || '').split(' ');
  const line3Last = line3Words.pop();
  const line3Rest = line3Words.join(' ');

  useEffect(() => {
    setMounted(true);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
    }, 8000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [slides.length]);

  const handleButton = (index: number) => {
    setCurrent(index);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
    }, 8000);
  };

  const motionClass = (motion: string) => {
    const map: Record<string, string> = {
      'zoom-in': styles.zoomIn,
      'pan-left': styles.panLeft,
      'zoom-out': styles.zoomOut,
      'pan-up': styles.panUp,
    };
    return map[motion] || '';
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroCopyPanel}>
        <div className={styles.heroCopyWrap}>
          <p className="eyebrow">{h.eyebrow}</p>
          <h1>
            {h.headingLine1}<br />
            {h.headingLine2}<br />
            {line3Rest && `${line3Rest} `}<em>{line3Last}</em>
          </h1>
          <p className={styles.intro}>{h.intro}</p>
          <div className={styles.actions}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).openBidModal) {
                  (window as any).openBidModal();
                }
              }}
            >
              Request a Bid <span aria-hidden="true">→</span>
            </button>
            <Link href="/resources" className="btn btn-outline-light">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                <path d="M12 4v10" /><path d="m8 11 4 4 4-4" /><path d="M5 20h14" />
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
              className={[
                styles.heroPhoto,
                motionClass(slide.motion),
                mounted && index === current ? styles.active : '',
                !mounted && index === 0 ? styles.active : '',
              ].filter(Boolean).join(' ')}
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
                className={index === current ? styles.active : ''}
                type="button"
                aria-label={`Show image ${index + 1}`}
                onClick={() => handleButton(index)}
              />
            ))}
          </div>
          <span className={styles.counter}>
            {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  );
}
