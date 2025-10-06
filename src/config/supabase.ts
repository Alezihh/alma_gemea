// Supabase Configuration
export const SUPABASE_CONFIG = {
  url: 'https://ftnleducjzvkckkzwjmy.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0bmxlZHVjanp2a2Nra3p3am15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MTYyMjAsImV4cCI6MjA3NTA5MjIyMH0.Bm3W7wUZf56vY4dUYxvDojmjvMCiakGTY9XE7_C2m6I',
};

// SQL para criar a tabela no Supabase:
/*
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  birthdate DATE NOT NULL,
  city VARCHAR(255) NOT NULL,
  zodiac_sign VARCHAR(50) NOT NULL,
  height VARCHAR(20) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert data
CREATE POLICY "Allow public insert" ON users FOR INSERT WITH CHECK (true);

-- Create policy to allow anyone to read data
CREATE POLICY "Allow public read" ON users FOR SELECT USING (true);
*/
