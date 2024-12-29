import OpenAI from 'openai';
import { GENERATION_ERRORS } from './constants';

export function createOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error(GENERATION_ERRORS.MISSING_API_KEY);
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: false,
  });
}