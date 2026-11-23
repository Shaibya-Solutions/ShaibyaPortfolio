import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { portfolioSchema, supabaseUrl } from "./client";

let client: SupabaseClient<any, typeof portfolioSchema> | undefined;

export function getPortfolioAdmin() {
  if (client) return client;

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) throw new Error("Portfolio database credentials are missing.");

  client = createClient(supabaseUrl, serviceKey, {
    db: { schema: portfolioSchema },
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
  });
  return client;
}
