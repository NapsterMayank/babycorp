import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import SportsShowcase from "@/components/sections/SportsShowcase";
import Difference from "@/components/sections/Difference";
import JourneyTimeline from "@/components/sections/JourneyTimeline";
import Pricing from "@/components/sections/Pricing";
import TrustSafety from "@/components/sections/TrustSafety";
import Partners from "@/components/sections/Partners";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";
import AmbientBackground from "@/components/effects/AmbientBackground";

export default function Home() {
  return (
    <main className="relative">
      <AmbientBackground />
      <Hero />
      <Problem />
      <Solution />
      <SportsShowcase />
      <Difference />
      <JourneyTimeline />
      <Pricing />
      <TrustSafety />
      <Partners />
      <Testimonials />
      <FAQ />
      <CTASection />
    </main>
  );
}
