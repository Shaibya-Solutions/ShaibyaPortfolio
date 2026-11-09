import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://hbhumkwhlwmbwoxnyvms.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

// Client targeting the dedicated shaibya_portfolio schema
export const supabase = createClient(supabaseUrl, supabaseAnonKey || "dummy-key-for-build", {
  db: {
    schema: "shaibya_portfolio",
  },
  auth: {
    persistSession: false,
  },
});

// Privileged client for Server Actions and /admin panel updates
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || "dummy-key-for-build", {
  db: {
    schema: "shaibya_portfolio",
  },
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
