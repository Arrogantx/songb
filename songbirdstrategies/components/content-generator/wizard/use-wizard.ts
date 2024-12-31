"use client";

import { useState, useCallback } from 'react';
import { GenerationParams } from '@/lib/openai/types';

export type WizardStep = {
  id: keyof GenerationParams;
  title: string;
  description: string;
  options?: Array<{ value: string; label: string }>;
  type?: 'select' | 'textarea';
};

export const WIZARD_STEPS: WizardStep[] = [
  {
    id: "audience",
    title: "Who do you want to reach?",
    description: "Which of these best describes your target audience?",
    type: "select",
    options: [
      { value: "my-community", label: "My Community" },
      { value: "politicians", label: "Politicians" },
      { value: "businesses", label: "Businesses" },
      { value: "everyone", label: "Everyone" },
    ],
  },
  {
    id: "goal",
    title: "What's your primary goal?",
    description: "What do you want to achieve with this content?",
    type: "select",
    options: [
      { value: "motivate-action", label: "Motivate and Take Action" },
      { value: "announce-inform", label: "Announce or Inform" },
      { value: "change-minds", label: "Change Minds" },
      { value: "build-connection", label: "Build Connection" },
    ],
  },
  {
    id: "tone",
    title: "Choose Your Tone",
    description: "What tone best fits your message?",
    type: "select",
    options: [
      { value: "professional", label: "Professional" },
      { value: "casual", label: "Casual & Friendly" },
      { value: "call-to-action", label: "Call to Action" },
      { value: "emotionally-compelling", label: "Emotionally Compelling" },
    ],
  },
  {
    id: "contentType",
    title: "What type of content?",
    description: "Choose all that apply",
    type: "select",
    options: [
      { value: "social", label: "Social Media Post" },
      { value: "email", label: "Email Campaign" },
      { value: "press", label: "Press Release" },
      { value: "blog", label: "Blog Post" },
    ],
  },
  {
    id: "context",
    title: "Additional Context",
    description: "Add specific details about what you want to communicate",
    type: "textarea",
  },
];

export function useWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<GenerationParams>>({});

  const handleSelect = useCallback((value: string) => {
    const currentStepData = WIZARD_STEPS[currentStep];
    setFormData(prev => ({ ...prev, [currentStepData.id]: value }));

    if (currentStepData.type === 'select' && currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const isFormComplete = (data: Partial<GenerationParams>): boolean => {
    return WIZARD_STEPS.every(step => {
      const value = data[step.id];
      return value && value.trim().length > 0;
    });
  };

  return {
    currentStep,
    formData,
    handleSelect,
    handleBack,
    isComplete: isFormComplete(formData),
    totalSteps: WIZARD_STEPS.length,
    currentStepData: WIZARD_STEPS[currentStep],
  };
}