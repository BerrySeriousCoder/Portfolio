import { useEffect } from 'react';

import Hero from "@/components/Hero";
import ExperienceHighlights from "@/components/ExperienceHighlights";
import Portfolio from "@/components/Portfolio";
import LifeThroughMyLens from "@/components/LifeThroughMyLens";
import Contact from "@/components/Contact";
import TestimonialSection from "@/components/testimonials";

const Index = () => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'H' || event.key === 'h') {
        window.open('https://calendly.com/harsh100xdev-work', '_blank');
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      {/* <ExperienceHighlights /> */}
      <Portfolio />
      <LifeThroughMyLens />
      <TestimonialSection />
      <Contact />
    </div>
  );
};

export default Index;
