"use client";

import { motion } from "framer-motion";
import { StepButton } from "./step-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Target, MessageSquare, FileText, Plus } from "lucide-react";

interface StepContentProps {
  step: {
    id: string;
    title: string;
    description: string;
    options?: Array<{ value: string; label: string }>;
  };
  value: string;
  onSelect: (value: string) => void;
  onCustomInput: (value: string) => void;
}

export function StepContent({ step, value, onSelect, onCustomInput }: StepContentProps) {
  const getIcon = (optionValue: string) => {
    switch (optionValue) {
      case "grassroots":
      case "policymakers":
      case "businesses":
      case "general":
        return <Users className="h-5 w-5" />;
      case "mobilize":
      case "inform":
      case "persuade":
      case "inspire":
        return <Target className="h-5 w-5" />;
      case "professional":
      case "casual":
      case "urgent":
      case "inspirational":
        return <MessageSquare className="h-5 w-5" />;
      case "social":
      case "email":
      case "press":
      case "blog":
        return <FileText className="h-5 w-5" />;
      default:
        return <Plus className="h-5 w-5" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{step.title}</h2>
        <p className="text-gray-400">{step.description}</p>
      </div>

      <div className="grid gap-3">
        {step.options?.map((option) => (
          <StepButton
            key={option.value}
            icon={getIcon(option.value)}
            label={option.label}
            selected={value === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>

      <div className="space-y-2 pt-4">
        <Label className="text-gray-400">Custom Input</Label>
        <Input
          placeholder="Enter custom value..."
          value={value.startsWith("custom:") ? value.slice(7) : ""}
          onChange={(e) => onCustomInput(e.target.value)}
          className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>
    </motion.div>
  );
}