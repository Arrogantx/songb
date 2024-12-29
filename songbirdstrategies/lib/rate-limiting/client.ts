"use client";

import { RateLimit } from './types';
import { supabase } from '../supabase/client';

export async function checkRateLimit(): Promise<RateLimit> {
  try {
    const { data, error } = await supabase
      .rpc('check_rate_limit', {
        p_content_type: 'content_generation'
      });

    if (error) throw error;

    return {
      remaining: data.remaining,
      reset: new Date(data.reset_at),
      total: data.limit
    };
  } catch (error) {
    console.error('Error checking rate limit:', error);
    throw error;
  }
}