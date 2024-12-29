"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { WizardStep } from "./use-wizard";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface WizardStepProps {
  step: WizardStep;
  value: string;
  onSelect: (value: string) => void;
  showGenerateButton?: boolean;
  onGenerate?: () => void;
  isGenerating?: boolean;
}

export function WizardStepComponent({ 
  step, 
  value, 
  onSelect,
  showGenerateButton,
  onGenerate,
  isGenerating 
}: WizardStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
        <p className="text-muted-foreground">{step.description}</p>
      </div>

      {step.type === 'select' && step.options && (
        <div className="grid gap-3">
          {step.options.map((option) => (
            <Button
              key={option.value}
              variant={value === option.value ? "default" : "outline"}
              className={cn(
                "w-full justify-start text-left font-normal h-auto py-3",
                value === option.value 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              onClick={() => onSelect(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      )}

      {step.type === 'textarea' && (
        <div className="space-y-4">
          <Textarea
            value={value}
            onChange={(e) => onSelect(e.target.value)}
            placeholder="Describe what you want to communicate..."
            className="min-h-[200px] resize-none bg-background text-foreground"
          />
          {showGenerateButton && onGenerate && (
            <Button 
              onClick={onGenerate}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isGenerating || !value.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Content'
              )}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}