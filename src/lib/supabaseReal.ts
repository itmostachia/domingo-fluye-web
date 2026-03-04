import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yjjbljykzeohxdghdllu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqamJsanlremVvaHhkZ2hkbGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5ODU1MTcsImV4cCI6MjA3NTU2MTUxN30.__h-XUl-5Ewyz5PdNM46vzHA5MzPCNPltVJVXTRVcYA';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
