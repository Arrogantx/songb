"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface ServiceFeature {
  title: string;
  description: string;
  icon: keyof typeof Icons;
}

interface ServiceFeaturesProps {
  features: ServiceFeature[];
}

export function ServiceFeatures({ features }: ServiceFeaturesProps) {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {features.map((feature, index) => {
        const Icon = Icons[feature.icon];
        return (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card border rounded-lg p-6"
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}