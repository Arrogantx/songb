import { openai } from '../config/openai';
import { ContentGenerationParams } from '../types/content';

export class ContentService {
  static createPrompt(params: ContentGenerationParams): string {
    const { audience, goal, tone, contentType, context } = params;
    
    return `Create a ${contentType} that specifically addresses this issue: "${context}"

Key Focus:
- Primary Issue: ${context}
- Target Audience: ${audience}
- Goal: ${goal}
- Tone: ${tone}

Requirements:
1. Make the issue of "${context}" the central focus of the content
2. Speak directly to ${audience} in their language
3. Drive towards the goal of ${goal}
4. Maintain a ${tone} tone throughout
5. Provide specific, actionable solutions or responses to the issue
6. Create a sense of urgency and importance
7. Include a clear call to action

Format the response appropriately for a ${contentType}.`;
  }

  static async generateContent(params: ContentGenerationParams): Promise<string> {
    try {
      const prompt = this.createPrompt(params);

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an expert content creator specializing in advocacy and public affairs communications. Your task is to create highly specific, focused content that directly addresses the provided issue while maintaining the specified tone and format."
          },
          {
            role: "user",
            content: prompt
          }
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