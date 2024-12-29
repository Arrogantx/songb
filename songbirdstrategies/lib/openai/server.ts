import OpenAI from 'openai';
import { GenerationParams } from './types';
import { createContentPrompt } from './prompts';
import { OPENAI_CONFIG } from './constants';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateContentServer(params: GenerationParams): Promise<string> {
  try {
    const prompt = createContentPrompt(params);
    
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: OPENAI_CONFIG.model,
      temperature: OPENAI_CONFIG.temperature,
      max_tokens: OPENAI_CONFIG.max_tokens,
    });

    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error('No content generated');
    }

    return generatedContent;
  } catch (error) {
    console.error('Error generating content:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while generating content');
  }
}