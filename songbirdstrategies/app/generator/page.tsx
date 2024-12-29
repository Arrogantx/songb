"use client";

import { useState } from "react";
import { WizardForm } from "@/components/content-generator/wizard-form";
import { ContentOutput } from "@/components/content-generator/output";
import { AnimatedGrid } from "@/components/ui/animated-grid";
import { useContentGeneration } from "@/hooks/use-content-generation";
import { useRateLimit } from "@/hooks/use-rate-limit";
import { SignupPrompt } from "@/components/marketing/signup-prompt";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export default function GeneratorPage() {
  const { generatedContent, isGenerating, handleGenerate } = useContentGeneration();
  const { rateLimit, isLoading: isLoadingRateLimit, isLimited } = useRateLimit();
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  const handleGenerateContent = async (formData: any) => {
    await handleGenerate(formData);
    // Show signup prompt for non-registered users after generation
    const hasShownPrompt = localStorage.getItem("hasShownSignupPrompt");
    if (!hasShownPrompt) {
      setShowSignupPrompt(true);
      localStorage.setItem("hasShownSignupPrompt", "true");
    }
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedGrid />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Content Generator
          </h1>
          <p className="text-muted-foreground">
            Create compelling content tailored to your advocacy goals and audience.
          </p>
        </motion.div>

        {isLoadingRateLimit ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : isLimited ? (
          <Alert className="max-w-2xl mx-auto mb-8">
            <AlertDescription>
              You've reached your generation limit. Sign up for a free account to get more generations!
            </AlertDescription>
          </Alert>
        ) : (
          <div className="max-w-4xl mx-auto">
            <WizardForm 
              onGenerate={handleGenerateContent} 
              isGenerating={isGenerating} 
            />
            
            {generatedContent && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12"
              >
                <ContentOutput content={generatedContent} />
              </motion.div>
            )}
          </div>
        )}
      </div>

      <SignupPrompt 
        showDialog={showSignupPrompt} 
        onClose={() => setShowSignupPrompt(false)} 
      />
    </div>
  );
}