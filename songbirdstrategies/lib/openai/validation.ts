import { GenerationParams } from './types';
import { z } from 'zod';

export const generationParamsSchema = z.object({
  audience: z.string().min(1, 'Audience is required'),
  goal: z.string().min(1, 'Goal is required'),
  tone: z.string().min(1, 'Tone is required'),
  contentType: z.string().min(1, 'Content type is required'),
  additionalContext: z.string().optional(),
});

export function validateGenerationParams(params: GenerationParams): string | null {
  try {
    generationParamsSchema.parse(params);
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0].message;
    }
    return 'Invalid parameters';
  }
}