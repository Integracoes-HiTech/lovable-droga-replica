import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xppamrcaxbvdqkhkwqbf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwcGFtcmNheGJ2ZHFraGt3cWJmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjkzNTM1MSwiZXhwIjoyMDcyNTExMzUxfQ.Rv9GdHxiEd_-FZPqWaS9SBongrcBa0pv7s9rVLEJ2KA';

export const supabase = createClient(supabaseUrl, supabaseKey);
