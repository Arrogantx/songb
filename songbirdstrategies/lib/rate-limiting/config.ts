export const RATE_LIMIT_CONFIG = {
  free: {
    limit: 3,
    interval: 60, // 1 hour in minutes
  },
  premium: {
    limit: 10,
    interval: 60,
  },
  enterprise: {
    limit: 50,
    interval: 60,
  },
} as const;