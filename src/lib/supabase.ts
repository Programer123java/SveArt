import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Painting = {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  technique: string;
  dimensions: string;
  status: 'available' | 'sold';
  created_at: string;
};
