import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '../config/supabase';

// Use environment variables if available, otherwise use config
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_CONFIG.url;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_CONFIG.anonKey;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface UserData {
  id?: string;
  name: string;
  birthdate: string;
  city: string;
  zodiac_sign: string;
  height: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

// Database functions
export const saveUserData = async (userData: Omit<UserData, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    console.log('Attempting to save user data:', userData);
    
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      
      // If table doesn't exist, provide helpful error message
      if (error.code === 'PGRST116' || error.message.includes('relation "users" does not exist')) {
        throw new Error('Tabela "users" não existe no Supabase. Execute o SQL no painel do Supabase para criar a tabela.');
      }
      
      throw new Error(`Erro do Supabase: ${error.message}`);
    }

    console.log('Data saved successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in saveUserData:', error);
    throw error;
  }
};

export const getUserData = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching user data:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserData:', error);
    throw error;
  }
};
