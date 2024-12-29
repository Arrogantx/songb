export interface GenerationParams {
  audience: string;
  goal: string;
  tone: string;
  contentType: string;
  additionalContext?: string;
}

export async function generateContent(params: GenerationParams): Promise<string> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate content');
    }

    if (!data.content) {
      throw new Error('No content received from the server');
    }

    return data.content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Content generation failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while generating content');
  }
}