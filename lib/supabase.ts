
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pnocgyeutmbpergikxdg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBub2NneWV1dG1icGVyZ2lreGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0MDY5ODgsImV4cCI6MjA4Mjk4Mjk4OH0.2P06vUZMTkN1yzo0b4FOtKvaIQz47OH6019LknWO_Rs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
