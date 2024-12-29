"use client";

import { useState, useEffect } from 'react';
import { RateLimit } from '@/lib/rate-limiting/types';
import { checkRateLimit } from '@/lib/rate-limiting/client';
import { useSupabase } from '@/lib/supabase/provider';

export function useRateLimit() {
  const [rateLimit, setRateLimit] = useState<RateLimit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { session } = useSupabase();

  useEffect(() => {
    async function loadRateLimit() {
      try {
        if (session?.user) {
          const limit = await checkRateLimit();
          setRateLimit(limit);
        }
      } catch (error) {
        console.error('Error loading rate limit:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadRateLimit();
  }, [session]);

  return {
    rateLimit,
    isLoading,
    isLimited: rateLimit ? rateLimit.remaining <= 0 : false
  };
}