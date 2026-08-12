import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Painting = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string;
  dimensions: string | null;
  technique: string | null;
  year: number | null;
  sold: boolean;
  created_at: string;
};

export type PaintingInput = Omit<Painting, 'id' | 'created_at'> & {
  id?: string;
};
