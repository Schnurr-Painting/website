import SitePage from '@/components/SitePage';
import Hero from '@/components/home/Hero';
import StatsBand from '@/components/home/StatsBand';
import Services from '@/components/home/Services';
import Markets from '@/components/home/Markets';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Testimonials from '@/components/home/Testimonials';
import DetailCta from '@/components/DetailCta';
import { getHomePage } from '@/lib/sanity/queries';

export default async function Home() {
  const home = await getHomePage();

  return (
    <SitePage>
      <Hero hero={home?.hero} />
      <StatsBand stats={home?.stats || []} />
      <Services section={home?.servicesSection} />
      <Testimonials section={home?.testimonialsSection} />
      <Markets section={home?.marketsSection} />
      <FeaturedProjects section={home?.projectsSection} />
      <DetailCta page="home" />
    </SitePage>
  );
}
