"use client";

import { motion } from "framer-motion";
import { Target, Users, Award } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Targeted Content",
      description: "Generate content tailored to your specific audience and goals."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Engagement Focus",
      description: "Create compelling messages that drive meaningful engagement."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Expert Results",
      description: "Professional-quality content powered by advanced AI technology."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-lg p-6 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors"
            >
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}