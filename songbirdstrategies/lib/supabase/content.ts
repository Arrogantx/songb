import { supabase, isSupabaseConfigured } from './client';
import { GenerationParams } from '@/lib/openai/types';

export async function saveContentGeneration(
  params: GenerationParams,
  generatedContent: string,
  userId?: string
) {
  try {
    if (!isSupabaseConfigured()) {
      console.warn('Supabase is not configured, skipping content save');
      return false;
    }

    const { error } = await supabase
      .from('content_generations')
      .insert({
        user_id: userId,
        audience: params.audience,
        goal: params.goal,
        tone: params.tone,
        content_type: params.contentType,
        additional_context: params.additionalContext,
        generated_content: generatedContent,
      });

    if (error) {
      console.error('Error saving content generation:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving content generation:', error);
    return false;
  }
}