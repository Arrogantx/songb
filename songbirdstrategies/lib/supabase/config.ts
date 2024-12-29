export const SUPABASE_CONFIG = {
  TABLES: {
    USERS: 'users',
    USER_PREFERENCES: 'user_preferences',
    CONTENT_GENERATIONS: 'content_generations',
  },
  ERRORS: {
    MISSING_URL: 'Missing Supabase URL',
    MISSING_KEY: 'Missing Supabase key',
    SAVE_FAILED: 'Failed to save data',
    USER_NOT_FOUND: 'User not found',
  },
} as const;