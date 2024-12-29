import { GenerationParams } from './types';
import { GENERATION_ERRORS } from './constants';

export async function generateContent(params: GenerationParams): Promise<string> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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