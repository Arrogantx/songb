/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `content_generations`
      - `id` (uuid, primary key) 
      - `user_id` (uuid, foreign key)
      - `audience` (text)
      - `goal` (text)
      - `tone` (text)
      - `content_type` (text)
      - `context` (text)
      - `generated_content` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Allow anonymous content generation
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Content generations table
CREATE TABLE IF NOT EXISTS content_generations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id),
  audience text NOT NULL,
  goal text NOT NULL,
  tone text NOT NULL,
  content_type text NOT NULL,
  context text,
  generated_content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_generations ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Content generations policies
CREATE POLICY "Users can manage own content"
  ON content_generations
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow anonymous content generation"
  ON content_generations
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_content_generations_updated_at
  BEFORE UPDATE ON content_generations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();