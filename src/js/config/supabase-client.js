import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Paste your actual public URL and public anon key here:
const SUPABASE_URL = 'https://rrjempoiygoyymklrnwb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyamVtcG9peWdveXlta2xybndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDEzMTAsImV4cCI6MjEwMTA3NzMxMH0.lfHI5jVQCIgQACM3p1ICQfEWrtrIb_eJl9cRkKaGJuI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);