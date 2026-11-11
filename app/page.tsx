import SitePage from '@/components/SitePage';
import Hero from '@/components/home/Hero';
import StatsBand from '@/components/home/StatsBand';
import Services from '@/components/home/Services';
import Markets from '@/components/home/Markets';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Testimonials from '@/components/home/Testimonials';
import DetailCta from '@/components/DetailCta';
import { getHomePage } from '@/lib/sanity/queries';
import { getStatsForPage } from '@/lib/stats';
import { editAttr } from '@/lib/sanity/edit';

export default async function Home() {
  const [home, stats] = await Promise.all([getHomePage(), getStatsForPage('home')]);

  return (
    <SitePage>
      <Hero
        hero={home?.hero}
        slideEdits={(home?.hero?.slides || []).map((s: any) =>
          s?._key ? editAttr(home, `hero.slides[_key=="${s._key}"].image`) : undefined
        )}
      />
      <StatsBand stats={stats.map((s) => s.data)} />
      <Services section={home?.servicesSection} />
      <Testimonials section={home?.testimonialsSection} />
      <Markets section={home?.marketsSection} />
      <FeaturedProjects section={home?.projectsSection} />
      <DetailCta page="home" />
    </SitePage>
  );
}
