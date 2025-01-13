"use client";

import { motion } from "framer-motion";

export function LogoAnimation() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-12"
    >
      {/* Primary glow effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.6, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
        style={{
          background: `
            radial-gradient(
              circle at center,
              hsl(var(--primary) / 0.6) 0%,
              hsl(var(--primary) / 0.4) 40%,
              transparent 70%
            )
          `,
          filter: "blur(15px)",
          width: "100%",
          height: "100%",
        }}
      />

      {/* Soft inner glow */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.03, 1],
          opacity: [0.4, 0.5, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
        style={{
          background: `
            radial-gradient(
              circle at center,
              hsl(var(--primary) / 1.5) 0%,
              hsl(var(--primary) / 0.3) 50%,
              transparent 80%
            )
          `,
          filter: "blur(10px)",
          width: "100%",
          height: "100%",
        }}
      />

      {/* Logo */}
      <motion.img
        src="/logo.svg"
        alt="Songbird Logo"
        className="absolute inset-0 w-full h-full object-contain z-10"
        animate={{
          scale: [1, 1.01, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
      />
    </motion.div>
  );
}