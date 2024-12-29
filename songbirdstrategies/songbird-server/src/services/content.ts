import { openai } from '../config/openai';
import { ContentGenerationParams } from '../types/content';

export class ContentService {
  static createPrompt(params: ContentGenerationParams): string {
    const { audience, goal, tone, contentType, additionalContext } = params;
    
    const basePrompt = `Create ${contentType} content targeting ${audience} with a ${tone} tone. The goal is to ${goal}.`;
    const contextPrompt = additionalContext ? `\n\nAdditional context: ${additionalContext}` : '';
    
    return `${basePrompt}${contextPrompt}`;
  }

  static async generateContent(params: ContentGenerationParams): Promise<string> {
    const prompt = this.createPrompt(params);

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1000,
    });

    const generatedContent = completion.choices[0]?.message?.content;

    if (!generatedContent) {
      throw new Error('No content generated');
    }

    return generatedContent;
  }
}