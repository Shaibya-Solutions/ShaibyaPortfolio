# Project context

This portfolio uses a shared Supabase project. Its application data belongs in the dedicated `shaibya_portfolio` schema.

- Scope portfolio queries, migrations, seeds, grants, and RLS policies to `shaibya_portfolio`. Keep the shared `public` and `auth` schemas and other applications' schemas outside the scope of portfolio changes.
- Keep portfolio admin identity and sessions independent of the shared Supabase Auth user directory and project-wide Auth settings. Use portfolio-specific server-side authentication and check admin authorization on every CMS mutation and ImageKit upload. Replace the legacy browser passkey and localStorage login when implementing admin authentication.
- Allow the public Data API to read only portfolio content intended for publication. Restrict CMS writes to authorized server-side operations. The Supabase service-role key has project-wide privileges even when the client selects a schema. Keep it server-side and explicitly scope its queries to `shaibya_portfolio`.
- Keep the ImageKit private key server-side. Save the returned CDN URL to the corresponding portfolio project image field in `shaibya_portfolio`.
