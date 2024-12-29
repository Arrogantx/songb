"use client";

import { motion } from "framer-motion";

interface ServiceHeaderProps {
  title: string;
  description: string;
}

export function ServiceHeader({ title, description }: ServiceHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto"
    >
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-xl text-muted-foreground">{description}</p>
    </motion.div>
  );
}