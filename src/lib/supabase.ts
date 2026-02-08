import { createClient } from '@supabase/supabase-js';

// Obtenemos las variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inicializamos el cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
