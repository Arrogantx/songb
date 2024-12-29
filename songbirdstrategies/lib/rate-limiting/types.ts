export interface RateLimit {
  remaining: number;
  reset: Date;
  total: number;
}

export interface RateLimitConfig {
  free: {
    limit: number;
    interval: number; // in minutes
  };
  premium: {
    limit: number;
    interval: number;
  };
  enterprise: {
    limit: number;
    interval: number;
  };
}

export const RATE_LIMIT_CONFIG: RateLimitConfig = {
  free: {
    limit: 3,
    interval: 60, // 1 hour
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