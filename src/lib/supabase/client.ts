import { createClient } from "@supabase/supabase-js";

export const portfolioSchema = "shaibya_portfolio";
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hbhumkwhlwmbwoxnyvms.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Client targeting the dedicated shaibya_portfolio schema
export const supabase = createClient(supabaseUrl, supabaseAnonKey || "dummy-key-for-build", {
  db: {
    schema: portfolioSchema,
  },
  auth: {
    persistSession: false,
  },
});
