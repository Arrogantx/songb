import { GenerationParams } from './types';

export function createContentPrompt({
  audience,
  goal,
  tone,
  contentType,
  additionalContext,
}: GenerationParams): string {
  const basePrompt = `Create ${contentType} content targeting ${audience} with a ${tone} tone. The goal is to ${goal}.`;
  
  const contextPrompt = additionalContext 
    ? `\n\nAdditional context to consider:\n${additionalContext}`
    : '';

  const formatInstructions = `\n\nPlease provide well-structured, engaging content that effectively communicates the message.`;

  return `${basePrompt}${contextPrompt}${formatInstructions}`;
}