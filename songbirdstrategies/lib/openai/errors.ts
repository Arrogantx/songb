export class OpenAIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OpenAIError';
  }
}

export class ContentGenerationError extends OpenAIError {
  constructor(message: string) {
    super(message);
    this.name = 'ContentGenerationError';
  }
}