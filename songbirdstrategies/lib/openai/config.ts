import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn('OpenAI API key not found');
}

// Only create the OpenAI client on the server side
const openai = typeof window === 'undefined' ? new OpenAI({ apiKey: apiKey || '' }) : null;

export { openai };