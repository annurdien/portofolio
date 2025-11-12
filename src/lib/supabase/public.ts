import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";

let cachedClient: SupabaseClient<Database> | null = null;

export function createPublicSupabaseClient() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("Supabase public credentials are missing");
  }

  cachedClient = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      auth: {
        persistSession: false,
      },
    },
  );

  return cachedClient;
}
