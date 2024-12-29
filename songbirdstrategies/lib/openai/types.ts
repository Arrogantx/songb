export interface GenerationParams {
  audience: string;
  goal: string;
  tone: string;
  contentType: string;
  additionalContext?: string;
}

export interface GenerationResponse {
  content: string;
}

export interface GenerationError {
  error: string;
}

export type ApiResponse = GenerationResponse | GenerationError;

export function isGenerationError(response: ApiResponse): response is GenerationError {
  return 'error' in response;
}