"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, Target, Users, BarChart } from "lucide-react";

const services = [
  {
    title: "Strategic Communications",
    description: "Develop effective messaging and content strategies that resonate with your audience.",
    icon: Megaphone,
  },
  {
    title: "Advocacy Campaigns",
    description: "Plan and execute campaigns that drive policy change and social impact.",
    icon: Target,
  },
  {
    title: "Stakeholder Engagement",
    description: "Build and maintain relationships with key stakeholders and decision-makers.",
    icon: Users,
  },
  {
    title: "Impact Measurement",
    description: "Track and measure the effectiveness of your communications and advocacy efforts.",
    icon: BarChart,
  },
];

export function AboutServices() {
  return (
    <section className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Services</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive solutions to help you achieve your communications and advocacy goals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <service.icon className="h-5 w-5 text-primary" />
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}