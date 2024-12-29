import { supabase, isSupabaseConfigured } from './client';

export async function saveMarketingPreference(email: string, optIn: boolean) {
  try {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured, skipping preference save');
      return true; // Return true to not block the UI flow
    }

    // First, create or get user
    const { data: userData, error: userError } = await supabase
      .from('users')
      .upsert({ 
        email,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'email'
      })
      .select('id')
      .single();

    if (userError) {
      console.error('Error saving user:', userError);
      return false;
    }

    if (!userData?.id) {
      console.error('No user ID returned after upsert');
      return false;
    }

    // Then, save preference
    const { error: prefError } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: userData.id,
        marketing_opt_in: optIn,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (prefError) {
      console.error('Error saving preference:', prefError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving marketing preference:', error);
    return false;
  }
}