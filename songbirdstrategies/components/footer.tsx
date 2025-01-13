"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { saveMarketingSubscription } from "@/lib/supabase/marketing";

export function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBuildClick = async () => {
    const savedEmail = localStorage.getItem('userEmail');
    if (!savedEmail) {
      toast.error('No email found. Please sign up first.');
      return;
    }

    try {
      setIsSubmitting(true);
      await saveMarketingSubscription(savedEmail);
      toast.success("Thanks for your interest! We'll be in touch soon.");
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/beta" className="text-muted-foreground hover:text-foreground">
                  Beta Program
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-foreground">
                  Resource Hub
                </Link>
              </li>
              <li>
                <Link href="/generator" className="text-muted-foreground hover:text-foreground">
                  Content Generator
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Let's Build Something</h3>
            <Button
              onClick={handleBuildClick}
              disabled={isSubmitting}
              className="w-full"
            >
              <Mail className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Sending...' : "Let's Build"}
            </Button>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Songbird Strategies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}