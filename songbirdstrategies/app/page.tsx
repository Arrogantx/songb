"use client";

import { HeroSection } from "@/components/home/hero-section";
import { FeatureSection } from "@/components/home/feature-section";
import { BackgroundImage } from "@/components/ui/background-image";

export default function Home() {
  return (
    <main className="relative min-h-screen pt-16"> {/* Added pt-16 for header height */}
      <BackgroundImage />
      <HeroSection />
      <FeatureSection />
    </main>
  );
}