export const OPENAI_CONFIG = {
  model: "gpt-3.5-turbo",
  temperature: 0.7,
  max_tokens: 1500,
} as const;

export const GENERATION_ERRORS = {
  MISSING_API_KEY: 'OpenAI API key not configured',
  MISSING_FIELDS: 'Please fill in all required fields',
  MISSING_CONTEXT: 'Please provide context for your content',
  NO_CONTENT: 'No content was generated',
  INVALID_CONTENT: 'Generated content did not meet quality standards',
  UNEXPECTED: 'An unexpected error occurred while generating content',
  RATE_LIMIT: 'Too many requests. Please try again later',
  INVALID_REQUEST: 'Invalid request parameters',
  NETWORK_ERROR: 'Network error occurred. Please check your connection',
  API_ERROR: 'Error communicating with OpenAI API',
  PARSE_ERROR: 'Error processing the response',
} as const;