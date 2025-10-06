// Debug utilities
export const debugSupabase = () => {
  console.log('=== SUPABASE DEBUG ===');
  console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing');
  
  // Test if we can create a client
  try {
    const { createClient } = require('@supabase/supabase-js');
    const url = import.meta.env.VITE_SUPABASE_URL || 'https://ftnleducjzvkckkzwjmy.supabase.co';
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0bmxlZHVjanp2a2Nra3p3am15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MTYyMjAsImV4cCI6MjA3NTA5MjIyMH0.Bm3W7wUZf56vY4dUYxvDojmjvMCiakGTY9XE7_C2m6I';
    
    const client = createClient(url, key);
    console.log('Supabase client created successfully');
    return client;
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    return null;
  }
};

// Call this in the browser console to debug
(window as any).debugSupabase = debugSupabase;





