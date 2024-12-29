import { ServiceHeader } from "@/components/services/service-header";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCTA } from "@/components/services/service-cta";

export default function CommunicationsPage() {
  return (
    <div className="space-y-12">
      <ServiceHeader
        title="Strategic Communications"
        description="Develop effective communication strategies that resonate with your audience and drive meaningful engagement."
      />
      
      <ServiceFeatures
        features={[
          {
            title: "Message Development",
            description: "Craft compelling messages that align with your goals and connect with your audience.",
            icon: "MessageSquare"
          },
          {
            title: "Content Strategy",
            description: "Create comprehensive content strategies that deliver results across all channels.",
            icon: "LayoutGrid"
          },
          {
            title: "Campaign Planning",
            description: "Plan and execute integrated communications campaigns that drive impact.",
            icon: "Target"
          }
        ]}
      />

      <ServiceCTA
        title="Ready to Transform Your Communications?"
        description="Get started with our AI-powered content generator and take your communications to the next level."
        buttonText="Try Content Generator"
        buttonLink="/generator"
      />
    </div>
  );
}