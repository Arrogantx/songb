"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          Empowering Voices, Amplifying Impact
        </h1>
        <p className="text-xl text-muted-foreground">
          Songbird Strategies is a strategic communications and advocacy consultancy
          dedicated to helping organizations create meaningful change through
          effective communication and targeted advocacy campaigns.
        </p>
      </motion.div>
    </section>
  );
}