"use client";

import { useState, useCallback } from 'react';
import { GenerationParams } from '@/lib/openai/types';

export type WizardStep = {
  id: string;
  title: string;
  description: string;
  options?: Array<{ value: string; label: string }>;
  type?: 'select' | 'textarea';
};

export const WIZARD_STEPS: WizardStep[] = [
  {
    id: "audience",
    title: "Select Your Target Audience",
    description: "Who are you trying to reach with your content?",
    type: "select",
    options: [
      { value: "grassroots", label: "Grassroots Advocates" },
      { value: "policymakers", label: "Policymakers" },
      { value: "businesses", label: "Small Businesses" },
      { value: "general", label: "General Public" },
    ],
  },
  {
    id: "goal",
    title: "Define Your Content Goal",
    description: "What do you want to achieve with this content?",
    type: "select",
    options: [
      { value: "mobilize", label: "Mobilize Action" },
      { value: "inform", label: "Inform & Educate" },
      { value: "persuade", label: "Persuade & Convince" },
      { value: "inspire", label: "Inspire & Motivate" },
    ],
  },
  {
    id: "tone",
    title: "Choose Your Content Tone",
    description: "What tone best fits your message?",
    type: "select",
    options: [
      { value: "professional", label: "Professional" },
      { value: "casual", label: "Casual & Friendly" },
      { value: "urgent", label: "Urgent & Compelling" },
      { value: "inspirational", label: "Inspirational" },
    ],
  },
  {
    id: "contentType",
    title: "Select Content Type",
    description: "What format should your content take?",
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

    // Only auto-proceed for select-type steps
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
      const value = data[step.id as keyof GenerationParams];
      return step.type === 'textarea' ? true : !!value;
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