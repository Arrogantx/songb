"use client";

import { motion } from "framer-motion";
import { Target, MessageSquare, Users } from "lucide-react";

export function AboutMission() {
  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Our Mission</h3>
          <p className="text-muted-foreground">
            To empower organizations with the tools and strategies they need to
            create lasting social impact.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Our Approach</h3>
          <p className="text-muted-foreground">
            Combining strategic thinking with cutting-edge technology to deliver
            impactful communications solutions.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Our Values</h3>
          <p className="text-muted-foreground">
            Committed to authenticity, innovation, and measurable impact in
            everything we do.
          </p>
        </div>
      </motion.div>
    </section>
  );
}