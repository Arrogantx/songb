export interface RateLimit {
  allowed: boolean;
  remaining: number;
  reset: Date;
  total: number;
}

export interface RateLimitConfig {
  free: {
    limit: number;
    interval: number;
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