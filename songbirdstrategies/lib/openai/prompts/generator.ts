import { GenerationParams } from '../types';
import { PROMPT_TEMPLATES } from './templates';

export function createContentPrompt(params: GenerationParams): string {
  const { audience, goal, tone, contentType, context } = params;
  
  // Get the template for the content type
  const template = PROMPT_TEMPLATES[contentType as keyof typeof PROMPT_TEMPLATES] || PROMPT_TEMPLATES.default;

  // Build the main prompt with specific instructions
  let prompt = `Create ${contentType} content addressing this specific issue: "${context}"

Target Specifications:
- Audience: ${audience}
- Goal: ${goal}
- Tone: ${tone}
- Format: ${contentType}

Key Requirements:
1. Focus primarily on the issue: "${context}"
2. Address the specific needs of ${audience}
3. Achieve the goal to ${goal}
4. Maintain a ${tone} tone throughout`;

  // Add structure guidance
  if (template.structure) {
    prompt += '\n\nFollow this structure:\n';
    template.structure.forEach((section, index) => {
      prompt += `${index + 1}. ${section}\n`;
    });
  }

  // Add quality requirements
  prompt += `\n\nEnsure the content:
- Makes the specific issue ("${context}") the central focus
- Provides concrete solutions or calls to action
- Uses clear, impactful language
- Creates urgency and engagement
- Remains relevant to the target audience`;

  return prompt;
}