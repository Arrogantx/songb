import { supabase } from './client';

export async function saveMarketingSubscription(email: string) {
  try {
    const { error } = await supabase
      .from('marketing_subscriptions')
      .upsert({
        email,
        subscribed_at: new Date().toISOString(),
        is_active: true
      }, {
        onConflict: 'email'
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving marketing subscription:', error);
    throw error;
  }
}