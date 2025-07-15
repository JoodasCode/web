import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://azaemhtwciapgrplwtyy.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6YWVtaHR3Y2lhcGdycGx3dHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTM2MjYsImV4cCI6MjA2ODA2OTYyNn0.eVP2AcJ8WTl1y396gq68R1rbcsgj0D-33Pg50MMsVbo'

// Get the correct site URL based on environment
function getSiteUrl() {
  // In production, use the custom domain
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_SITE_URL || 'https://slopwatch.xyz'
  }
  // In development, use localhost
  return 'http://localhost:3000'
}

// Client-side Supabase client (for client components)
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// Browser client for client components
export function createSupabaseBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Simple client creation function (for auth pages)
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Helper to get site URL
export { getSiteUrl } 