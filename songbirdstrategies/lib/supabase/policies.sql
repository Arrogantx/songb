-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_generations ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Enable insert for authenticated users only"
ON users FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable read access for own user data"
ON users FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- User preferences policies
CREATE POLICY "Enable insert/update for own preferences"
ON user_preferences
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Content generations policies
CREATE POLICY "Enable insert for authenticated users"
ON content_generations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable read access for own content"
ON content_generations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Anonymous content generation policy
CREATE POLICY "Enable anonymous content generation"
ON content_generations
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);