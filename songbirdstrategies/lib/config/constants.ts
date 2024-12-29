export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  endpoints: {
    generate: '/generate',
    health: '/health',
  },
} as const;

export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as const;

export const APP_CONFIG = {
  name: 'Songbird Strategies',
  description: 'Strategic Communications & Advocacy',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;