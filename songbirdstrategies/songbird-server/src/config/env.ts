import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3001'),
  OPENAI_API_KEY: z.string({
    required_error: 'OPENAI_API_KEY is required',
  }),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
});

const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(e => e.path.join('.')).join(', ');
      throw new Error(`Missing environment variables: ${missingVars}`);
    }
    throw error;
  }
};

export const env = parseEnv();