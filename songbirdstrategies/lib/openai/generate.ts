import { openai } from './config';
import { createContentPrompt } from './prompts';
import { GenerationParams } from './types';

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
      throw new Error(errorData.error || 'Failed to generate content');
    }

    const data = await response.json();

    if (!data?.content) {
      throw new Error('No content received from the server');
    }

    return data.content;
  } catch (error) {
    console.error('Generation error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while generating content');
  }
}

export async function generateContentServer(params: GenerationParams): Promise<string> {
  try {
    const prompt = createContentPrompt(params);
    
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
      temperature: 0.7,
      max_tokens: 1000,
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