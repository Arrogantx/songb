import { AboutHero } from "@/components/about/hero";
import { AboutMission } from "@/components/about/mission";
import { AboutServices } from "@/components/about/services";
import { AboutTeam } from "@/components/about/team";
import { AboutCTA } from "@/components/about/cta";

export default function AboutPage() {
  return (
    <div className="min-h-screen space-y-20 py-10">
      <AboutHero />
      <AboutMission />
      <AboutServices />
      <AboutTeam />
      <AboutCTA />
    </div>
  );
}