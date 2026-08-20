import RichBody from '@/components/RichBody';
import styles from './InteriorHero.module.css';

interface Props {
  eyebrow?: string;
  title: string;
  intro?: any;
  image?: string;
  imagePosition?: string;
  backgroundColor?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  headingColor?: string;
  introColor?: string;
  accentColor?: string;
}

function hexToRgba(hex: string, alpha: number) {
  if (!hex || !hex.startsWith('#')) return hex;
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function InteriorHero({
  eyebrow,
  title,
  intro,
  image,
  imagePosition = 'center',
  backgroundColor = 'var(--navy)',
  overlayColor = '#3a1843',
  overlayOpacity = 0.9,
  headingColor = '#ffffff',
  introColor = '#ffffff',
  accentColor = 'var(--gold)',
}: Props) {
  const op = Number(overlayOpacity) || 0.9;
  const overlayStrong = hexToRgba(overlayColor, Math.min(1, op));
  const overlayMid = hexToRgba(overlayColor, Math.max(0, op - 0.14));
  const overlayLight = hexToRgba(overlayColor, Math.max(0, op - 0.32));

  const cssVars = {
    '--hero-bg': backgroundColor,
    '--hero-heading': headingColor,
    '--hero-intro': introColor,
    '--hero-accent': accentColor,
    '--overlay-strong': overlayStrong,
    '--overlay-mid': overlayMid,
    '--overlay-light': overlayLight,
  } as React.CSSProperties;

  return (
    <section
      className={`${styles.interiorHero} ${image ? styles.interiorHeroPhoto : styles.interiorHeroSolid}`}
      style={cssVars}
    >
      {image && (
        <div className={styles.heroBackground} aria-hidden="true">
          <img src={image} alt="" style={{ objectPosition: imagePosition }} />
        </div>
      )}
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className={styles.interiorHeroInner}>
        <div className={styles.interiorHeroCopy}>
          {eyebrow && (
            <div className={styles.interiorKicker}>
              <span aria-hidden="true" />
              <p>{eyebrow}</p>
            </div>
          )}
          <h1>{title}</h1>
          <RichBody value={intro} className={styles.interiorIntro} />
        </div>
      </div>
    </section>
  );
}
