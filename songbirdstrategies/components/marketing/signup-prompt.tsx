"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { saveMarketingSubscription } from '@/lib/supabase/marketing';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface SignupPromptProps {
  onClose: () => void;
  showDialog: boolean;
}

export function SignupPrompt({ onClose, showDialog }: SignupPromptProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSignup = () => {
    router.push('/auth');
    onClose();
  };

  const handleSubscribe = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      setIsSubmitting(true);
      await saveMarketingSubscription(email);
      toast.success('Thank you for subscribing!');
      onClose();
    } catch (error) {
      console.error('Error saving subscription:', error);
      toast.error('Failed to save subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unlock More Features!</DialogTitle>
          <DialogDescription>
            Sign up to get more generations per hour and access to premium features.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <Button onClick={handleSignup} className="w-full">
              Create Free Account
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or stay updated
                </span>
              </div>
            </div>
            <Input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Maybe Later
          </Button>
          <Button onClick={handleSubscribe} disabled={isSubmitting}>
            {isSubmitting ? 'Subscribing...' : 'Subscribe to Updates'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}