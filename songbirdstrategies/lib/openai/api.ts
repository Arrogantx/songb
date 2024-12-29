import { GenerationParams } from './types';
import { GENERATION_ERRORS } from './constants';
import { API_CONFIG, getApiUrl } from '@/lib/config/api';

export async function generateContent(params: GenerationParams): Promise<string> {
  // Validate all required fields are present
  if (!params.audience || !params.goal || !params.tone || !params.contentType) {
    throw new Error(GENERATION_ERRORS.MISSING_FIELDS);
  }

  try {
    const response = await fetch(getApiUrl('generate'), {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || GENERATION_ERRORS.UNEXPECTED);
    }

    const data = await response.json();

    if (!data?.content) {
      throw new Error(GENERATION_ERRORS.NO_CONTENT);
    }

    return data.content;
  } catch (error) {
    console.error('Generation error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(GENERATION_ERRORS.UNEXPECTED);
  }
}