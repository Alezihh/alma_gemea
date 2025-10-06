-- Script para criar a tabela de usuários no Supabase
-- Execute este script no SQL Editor do painel do Supabase

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

-- Create policy to allow anyone to update data
CREATE POLICY "Allow public update" ON users FOR UPDATE USING (true);

-- Create index for better performance on email lookups
CREATE INDEX idx_users_email ON users(email);

-- Create index for better performance on created_at
CREATE INDEX idx_users_created_at ON users(created_at);
