-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS content_generations CASCADE;
DROP TABLE IF EXISTS user_settings CASCADE;
DROP TABLE IF EXISTS rate_limits CASCADE;
DROP TABLE IF EXISTS marketing_subscriptions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table with enhanced fields
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMPTZ,
  account_type TEXT DEFAULT 'free' CHECK (account_type IN ('free', 'premium', 'enterprise'))
);

-- User settings with theme preference
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  email_notifications BOOLEAN DEFAULT true,
  marketing_emails BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

-- Rate limiting table
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL,
  last_generation TIMESTAMPTZ,
  generation_count INTEGER DEFAULT 0,
  reset_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, content_type)
);

-- Enhanced content generations table
CREATE TABLE content_generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  audience TEXT NOT NULL,
  goal TEXT NOT NULL,
  tone TEXT NOT NULL,
  content_type TEXT NOT NULL,
  additional_context TEXT,
  generated_content TEXT NOT NULL,
  edited_content TEXT,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Marketing subscriptions for non-registered users
CREATE TABLE marketing_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  source TEXT DEFAULT 'content_generator',
  is_active BOOLEAN DEFAULT true
);

-- Create indexes
CREATE INDEX idx_content_generations_user_id ON content_generations(user_id);
CREATE INDEX idx_content_generations_created_at ON content_generations(created_at);
CREATE INDEX idx_rate_limits_user_lookup ON rate_limits(user_id, content_type);
CREATE INDEX idx_marketing_subscriptions_email ON marketing_subscriptions(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_generations_updated_at
  BEFORE UPDATE ON content_generations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_subscriptions ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Settings policies
CREATE POLICY "Users can manage own settings"
  ON user_settings FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Rate limits policies
CREATE POLICY "Users can view own rate limits"
  ON rate_limits FOR SELECT
  USING (auth.uid() = user_id);

-- Content generations policies
CREATE POLICY "Users can manage own content"
  ON content_generations FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow anonymous content generation"
  ON content_generations FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Functions for rate limiting
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_user_id UUID,
  p_content_type TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  v_limit INTEGER;
  v_current_count INTEGER;
  v_last_generation TIMESTAMPTZ;
  v_account_type TEXT;
BEGIN
  -- Get user's account type
  SELECT account_type INTO v_account_type
  FROM users
  WHERE id = p_user_id;
  
  -- Set limits based on account type
  v_limit := CASE v_account_type
    WHEN 'free' THEN 3
    WHEN 'premium' THEN 10
    WHEN 'enterprise' THEN 50
    ELSE 1 -- For anonymous users
  END;
  
  -- Check and update rate limit
  INSERT INTO rate_limits (user_id, content_type, generation_count, last_generation, reset_at)
  VALUES (p_user_id, p_content_type, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 hour')
  ON CONFLICT (user_id, content_type)
  DO UPDATE SET
    generation_count = CASE
      WHEN rate_limits.reset_at < CURRENT_TIMESTAMP THEN 1
      ELSE rate_limits.generation_count + 1
    END,
    last_generation = CURRENT_TIMESTAMP,
    reset_at = CASE
      WHEN rate_limits.reset_at < CURRENT_TIMESTAMP THEN CURRENT_TIMESTAMP + INTERVAL '1 hour'
      ELSE rate_limits.reset_at
    END
  RETURNING generation_count INTO v_current_count;
  
  RETURN v_current_count <= v_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;