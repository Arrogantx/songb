import { openai } from '../config';
import { GenerationParams } from '../types';
import { createContentPrompt } from '../prompts/generator';
import { validateGenerationParams } from '../validation';
import { GENERATION_ERRORS } from '../constants';

export class ContentService {
  static async generateContent(params: GenerationParams): Promise<string> {
    try {
      // Validate parameters
      const validationError = validateGenerationParams(params);
      if (validationError) {
        throw new Error(validationError);
      }

      // Ensure context is provided
      if (!params.context?.trim()) {
        throw new Error(GENERATION_ERRORS.MISSING_CONTEXT);
      }

      // Create the prompt
      const prompt = createContentPrompt(params);

      // Generate content
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an expert communications strategist specializing in advocacy and public affairs."
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
        throw new Error(GENERATION_ERRORS.NO_CONTENT);
      }

      // Validate generated content
      const isValid = await this.validateContent(generatedContent);
      if (!isValid) {
        throw new Error(GENERATION_ERRORS.INVALID_CONTENT);
      }

      return generatedContent;
    } catch (error: any) {
      console.error('Error generating content:', error);
      
      // Handle OpenAI API errors
      if (error.response?.status === 429) {
        throw new Error(GENERATION_ERRORS.RATE_LIMIT);
      }
      
      throw error;
    }
  }

  static async validateContent(content: string): Promise<boolean> {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a content quality assurance specialist."
          },
          {
            role: "user",
            content: `Please validate the following content for quality, relevance, and appropriateness. 
            Respond with 'true' if the content is acceptable, or 'false' if it needs revision:\n\n${content}`
          }
        ],
        model: "gpt-3.5-turbo",
        temperature: 0,
        max_tokens: 10,
      });

      const result = completion.choices[0]?.message?.content?.toLowerCase();
      return result === 'true';
    } catch (error) {
      console.error('Error validating content:', error);
      return false;
    }
  }
}