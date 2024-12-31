"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { WizardStepComponent } from "./wizard/wizard-step";
import { useWizard } from "./wizard/use-wizard";
import { StepIndicator } from "./step-indicator";
import { GenerationParams } from "@/lib/openai/types";

interface WizardFormProps {
  onGenerate: (data: GenerationParams) => void;
  isGenerating: boolean;
}

export function WizardForm({ onGenerate, isGenerating }: WizardFormProps) {
  const {
    currentStep,
    formData,
    handleSelect,
    handleBack,
    isComplete,
    totalSteps,
    currentStepData,
  } = useWizard();

  const handleGenerateClick = () => {
    if (isComplete && !isGenerating) {
      onGenerate(formData as GenerationParams);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        labels={Array(totalSteps).fill("")}
      />

      <div className="bg-card border rounded-lg p-6 mb-8">
        <AnimatePresence mode="wait">
          <WizardStepComponent
            key={currentStepData.id}
            step={currentStepData}
            value={formData[currentStepData.id] || ""}
            onSelect={handleSelect}
            showGenerateButton={currentStepData.id === 'context' && !!formData.context?.trim()}
            onGenerate={handleGenerateClick}
            isGenerating={isGenerating}
          />
        </AnimatePresence>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0 || isGenerating}
          className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
    </div>
  );
}