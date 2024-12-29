import { ServiceHeader } from "@/components/services/service-header";
import { ServiceFeatures } from "@/components/services/service-features";
import { ServiceCTA } from "@/components/services/service-cta";

export default function AdvocacyPage() {
  return (
    <div className="space-y-12">
      <ServiceHeader
        title="Advocacy Consulting"
        description="Expert guidance and tools to amplify your advocacy efforts and create lasting change."
      />
      
      <ServiceFeatures
        features={[
          {
            title: "Campaign Strategy",
            description: "Develop winning advocacy campaigns that mobilize supporters and achieve policy goals.",
            icon: "Flag"
          },
          {
            title: "Stakeholder Engagement",
            description: "Build and maintain relationships with key stakeholders and decision-makers.",
            icon: "Users"
          },
          {
            title: "Impact Measurement",
            description: "Track and measure the effectiveness of your advocacy initiatives.",
            icon: "BarChart"
          }
        ]}
      />

      <ServiceCTA
        title="Ready to Amplify Your Impact?"
        description="Start creating powerful advocacy content with our AI-powered tools."
        buttonText="Start Creating"
        buttonLink="/generator"
      />
    </div>
  );
}