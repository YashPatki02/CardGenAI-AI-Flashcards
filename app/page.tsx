import Image from "next/image";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import HeroColumns from "@/components/HeroColumns";

export default function Home() {
  return (
      <>
          <div className="flex flex-col items-center justify-start min-h-screen">
              <HeroColumns />
              <Pricing />
              <Testimonials />
              <FAQ />
              <CTA />
          </div>
      </>
  );
}
