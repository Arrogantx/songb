"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StepButtonProps {
  icon: React.ReactNode;
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function StepButton({ icon, label, selected, onClick, className }: StepButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-lg border transition-colors text-left flex items-center gap-4",
        selected
          ? "border-blue-500 bg-blue-500/10 text-white"
          : "border-gray-700 hover:border-gray-600 text-gray-300",
        className
      )}
    >
      <div className="p-2 rounded-md bg-gray-800/50">
        {icon}
      </div>
      <span className="font-medium">{label}</span>
    </motion.button>
  );
}