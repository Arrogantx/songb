import { openai } from '../config';
import { GenerationParams } from '../types';
import { createContentPrompt } from '../prompts/generator';

export class ContentService {
  static async generateContent(params: GenerationParams): Promise<string> {
    try {
      // Create a detailed system prompt
      const systemPrompt = `You are an expert content creator specializing in ${params.contentType} content.
Your task is to create highly specific content that:
1. Directly addresses the ${params.audience} audience
2. Achieves the goal to ${params.goal}
3. Maintains a ${params.tone} tone throughout
4. Incorporates all provided context and details`;

      // Create the user prompt with context
      const userPrompt = createContentPrompt(params);

      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        max_tokens: 1500,
        presence_penalty: 0.3,
        frequency_penalty: 0.3,
      });

      const generatedContent = completion.choices[0]?.message?.content;

      if (!generatedContent) {
        throw new Error('No content generated');
      }

      return generatedContent;
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  }
}