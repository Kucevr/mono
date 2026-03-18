import { Hero } from '../components/sections/Hero';
import { PartnersAndWorks } from '../components/sections/PartnersAndWorks';
import { ShapeBrands } from '../components/sections/ShapeBrands';
import { BuiltDifferent } from '../components/sections/BuiltDifferent';
import { Services } from '../components/sections/Services';
import { Pricing } from '../components/sections/Pricing';
import { FAQ } from '../components/sections/FAQ';
import { Testimonials } from '../components/sections/Testimonials';
import { Stats } from '../components/sections/Stats';

export function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-20">
        <PartnersAndWorks />
        <ShapeBrands />
      </div>
      <BuiltDifferent />
      <Services />
      <Pricing />
      <FAQ />
      <Testimonials />
      <Stats />
    </>
  );
}