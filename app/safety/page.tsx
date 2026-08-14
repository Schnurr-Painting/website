import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import page from '@/data/pages/safety.json';

export default function Page() {
  const h = page.hero;
  return (
    <SitePage>
      <InteriorHero
        eyebrow={h.eyebrow}
        title={h.title}
        intro={h.intro}
        image={h.image}
        backgroundColor={h.backgroundColor}
        overlayColor={h.overlayColor}
        overlayOpacity={h.overlayOpacity}
        headingColor={h.headingColor}
        introColor={h.introColor}
        accentColor={h.accentColor}
      />
      <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--body)' }}>
        <p>Content coming soon.</p>
      </div>
    </SitePage>
  );
}
