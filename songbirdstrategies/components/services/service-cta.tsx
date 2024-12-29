"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ServiceCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function ServiceCTA({ title, description, buttonText, buttonLink }: ServiceCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-center bg-card border rounded-lg p-8 max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button asChild>
        <Link href={buttonLink}>{buttonText}</Link>
      </Button>
    </motion.div>
  );
}