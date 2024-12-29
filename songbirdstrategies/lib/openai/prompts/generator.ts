import { GenerationParams } from '../types';
import { PROMPT_TEMPLATES } from './templates';

export function createContentPrompt(params: GenerationParams): string {
  const { audience, goal, tone, contentType, additionalContext } = params;
  
  // Get the template for the content type
  const template = PROMPT_TEMPLATES[contentType as keyof typeof PROMPT_TEMPLATES];
  if (!template) {
    throw new Error(`Invalid content type: ${contentType}`);
  }

  // Create the base prompt
  let prompt = template.base
    .replace('{audience}', audience)
    .replace('{goal}', goal)
    .replace('{tone}', tone);

  // Add structure guidance
  if ('structure' in template) {
    prompt += '\n\nPlease structure the content as follows:\n';
    template.structure.forEach((section, index) => {
      prompt += `${index + 1}. ${section}\n`;
    });
  }

  // Add examples if available
  if ('examples' in template && template.examples.length > 0) {
    prompt += '\n\nReference examples:\n';
    template.examples.forEach((example, index) => {
      prompt += `Example ${index + 1}: ${example}\n`;
    });
  }

  // Add context if provided
  if (additionalContext) {
    prompt += `\n\nAdditional context to consider:\n${additionalContext}`;
  }

  // Add final instructions
  prompt += `\n\nEnsure the content is:
- Engaging and authentic
- Tailored to the ${audience} audience
- Focused on ${goal}
- Written in a ${tone} tone
- Clear and actionable
- Free of jargon unless necessary
- Optimized for the chosen format`;

  return prompt;
}