import SitePage from '@/components/SitePage';
import Hero from '@/components/home/Hero';
import StatsBand from '@/components/home/StatsBand';
import Services from '@/components/home/Services';
import Markets from '@/components/home/Markets';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <SitePage>
      <Hero />
      <StatsBand />
      <Services />
      <Markets />
      <FeaturedProjects />
      <Testimonials />
    </SitePage>
  );
}
