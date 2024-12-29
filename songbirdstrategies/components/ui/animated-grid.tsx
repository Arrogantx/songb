import { motion } from "framer-motion";

export function AnimatedGrid() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
      >
        {/* Tracer lights */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-px bg-primary rounded-full"
            animate={{
              x: ["0%", "100%"],
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}