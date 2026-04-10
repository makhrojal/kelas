import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: 'admin' | 'user';
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: 'admin' | 'user';
        };
        Update: {
          full_name?: string | null;
          role?: 'admin' | 'user';
        };
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          post_id: string;
          completed: boolean;
          score: number | null;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          post_id: string;
          completed?: boolean;
          score?: number | null;
        };
        Update: {
          completed?: boolean;
          score?: number | null;
        };
      };
    };
  };
};
