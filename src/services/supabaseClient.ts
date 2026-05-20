import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nmdsfmjleqdujghgbpuc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tZHNmbWpsZXFkdWpnaGdicHVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1ODI0ODQsImV4cCI6MjA4NzE1ODQ4NH0.aSeFLEnZ79MIONC0qnIjzNGGbocV7UBRQc45ZpOp27I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
