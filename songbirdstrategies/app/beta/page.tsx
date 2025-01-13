"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { BackgroundImage } from "@/components/ui/background-image";

export default function BetaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    industry: "",
    useCase: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Implement actual form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Thanks for your interest! We'll be in touch soon.");
      setFormData({
        businessName: "",
        email: "",
        industry: "",
        useCase: ""
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen pt-16">
      <BackgroundImage />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-card/50 backdrop-blur-lg p-8 rounded-lg border border-primary/10">
            <h1 className="text-3xl font-bold mb-2">Join Our Beta Program</h1>
            <p className="text-muted-foreground mb-6">
              Help shape the future of business communications and get early access to our latest tools.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Business Name</label>
                <Input
                  value={formData.businessName}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Industry</label>
                <Input
                  value={formData.industry}
                  onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">How would you use our tools?</label>
                <Textarea
                  value={formData.useCase}
                  onChange={(e) => setFormData(prev => ({ ...prev, useCase: e.target.value }))}
                  required
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Join Beta Program"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
}