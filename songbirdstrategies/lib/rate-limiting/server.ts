import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { RateLimit } from './types';

export async function checkRateLimit(userId: string): Promise<boolean> {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    const { data, error } = await supabase
      .rpc('check_rate_limit', {
        p_user_id: userId,
        p_content_type: 'content_generation'
      });

    if (error) throw error;

    return data.allowed;
  } catch (error) {
    console.error('Error checking rate limit:', error);
    // Default to allowing the request in case of errors
    return true;
  }
}