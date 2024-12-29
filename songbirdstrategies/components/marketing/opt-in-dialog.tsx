"use client";

import { useState, useEffect } from 'react';
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
import { saveMarketingPreference } from '@/lib/supabase/preferences';
import { toast } from 'sonner';

interface OptInDialogProps {
  onClose: () => void;
}

export function OptInDialog({ onClose }: OptInDialogProps) {
  const [email, setEmail] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const hasShownDialog = localStorage.getItem('hasShownMarketingDialog');
    if (!hasShownDialog) {
      setShowDialog(true);
    }
  }, []);

  const handleOptIn = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      setIsSubmitting(true);
      const success = await saveMarketingPreference(email, true);
      
      if (success) {
        toast.success('Thank you for subscribing!');
      } else {
        toast.error('Failed to save preference. Please try again later.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
      handleClose();
    }
  };

  const handleOptOut = () => {
    handleClose();
  };

  const handleClose = () => {
    localStorage.setItem('hasShownMarketingDialog', 'true');
    setShowDialog(false);
    onClose();
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stay Updated!</DialogTitle>
          <DialogDescription>
            Would you like early access to new products and services designed for small business owners?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleOptOut} disabled={isSubmitting}>
            No, thanks
          </Button>
          <Button onClick={handleOptIn} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Yes, I\'m interested!'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}