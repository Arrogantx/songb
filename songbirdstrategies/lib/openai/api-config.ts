export const OPENAI_CONFIG = {
  model: "gpt-3.5-turbo",
  temperature: 0.7,
  max_tokens: 1000,
} as const;

export const API_ERRORS = {
  MISSING_API_KEY: 'OpenAI API key not configured',
  INVALID_PARAMS: 'Invalid generation parameters',
  NO_CONTENT: 'No content was generated',
  UNEXPECTED: 'An unexpected error occurred',
} as const;