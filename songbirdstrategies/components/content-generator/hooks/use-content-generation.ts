"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { GenerationParams } from '@/lib/openai/types';
import { generateContent } from '@/lib/openai/generate';
import { GENERATION_ERRORS } from '@/lib/openai/constants';

interface UseContentGeneration {
  generatedContent: string;
  isGenerating: boolean;
  handleGenerate: (formData: GenerationParams) => Promise<void>;
  clearContent: () => void;
}

export function useContentGeneration(): UseContentGeneration {
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (formData: GenerationParams) => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);
      setGeneratedContent("");
      const content = await generateContent(formData);
      setGeneratedContent(content);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : GENERATION_ERRORS.UNEXPECTED;
      
      console.error('Error generating content:', errorMessage);
      toast.error(errorMessage);
      setGeneratedContent('');
    } finally {
      setIsGenerating(false);
    }
  };

  const clearContent = () => setGeneratedContent('');

  return {
    generatedContent,
    isGenerating,
    handleGenerate,
    clearContent,
  };
}