"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { GenerationParams } from '@/lib/openai/types';
import { generateContent } from '@/lib/openai/api';
import { GENERATION_ERRORS } from '@/lib/openai/constants';

export function useContentGeneration() {
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (formData: GenerationParams) => {
    // Prevent multiple simultaneous generations
    if (isGenerating) return;

    // Validate all required fields including context
    if (!formData.audience || !formData.goal || !formData.tone || !formData.contentType || !formData.context?.trim()) {
      toast.error('Please complete all fields including additional context');
      return;
    }

    try {
      setIsGenerating(true);
      setGeneratedContent("");
      
      const content = await generateContent(formData);
      setGeneratedContent(content);
    } catch (error) {
      console.error('Generation error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : GENERATION_ERRORS.UNEXPECTED;
      
      toast.error(errorMessage);
      setGeneratedContent('');
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatedContent,
    isGenerating,
    handleGenerate,
  };
}