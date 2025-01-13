"use client";

import { motion } from "framer-motion";

export function BackgroundImage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-0"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')`,
          opacity: 0.2
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(var(--background), 0.7) 0%, rgba(var(--background), 0.95) 100%)',
          backdropFilter: 'blur(2px)'
        }}
      />
    </motion.div>
  );
}