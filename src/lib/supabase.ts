import { createClient } from '@supabase/supabase-js'

// These will be undefined during initial development without env vars
// We should handle this gracefully in the UI when trying to save
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
