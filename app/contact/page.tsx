import SitePage from '@/components/SitePage';
import InteriorHero from '@/components/interior/InteriorHero';
import { getPage } from '@/lib/sanity/queries';
import ContactForm from '@/components/interior/ContactForm';

export default async function ContactPage() {
  const page = await getPage('contact');
  const h = page?.hero || {};
  return (
    <SitePage>
      <InteriorHero eyebrow={h.eyebrow} title={h.title} intro={h.intro} image={(h as any).image} imagePosition={(h as any).imagePosition} backgroundColor={h.backgroundColor} overlayColor={h.overlayColor} overlayOpacity={h.overlayOpacity} headingColor={h.headingColor} introColor={h.introColor} accentColor={h.accentColor} />
      <ContactForm />
    </SitePage>
  );
}
