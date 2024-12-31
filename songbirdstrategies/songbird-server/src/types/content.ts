import { z } from 'zod';

export const contentGenerationSchema = z.object({
  audience: z.string().min(1, 'Audience is required'),
  goal: z.string().min(1, 'Goal is required'),
  tone: z.string().min(1, 'Tone is required'),
  contentType: z.string().min(1, 'Content type is required'),
  context: z.string().min(1, 'Context is required'),
});

export type ContentGenerationParams = z.infer<typeof contentGenerationSchema>;