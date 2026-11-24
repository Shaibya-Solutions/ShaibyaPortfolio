# Shaibya **Solutions**

## Ahead of the Curve, **Always**

## Portfolio CMS

The portfolio uses the `shaibya_portfolio` schema in a shared Supabase project. Keep portfolio database changes in that schema. Preserve the existing Data API schema list when adding `shaibya_portfolio`.

Run `npm run dev` and open `/admin`. Production needs the Next.js server runtime. Configure these variables in the ignored local `.env.local` or the hosting environment.

| Variable | Use |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public portfolio reads from `shaibya_portfolio` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side CMS data access and sign-in rate limiting |
| `PORTFOLIO_ADMIN_PASSWORD`, `PORTFOLIO_ADMIN_SESSION_SECRET` | Portfolio-only login and signed sessions. Generate two separate secrets with `openssl rand -hex 32`. |
| `NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY`, `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`, `IMAGEKIT_PRIVATE_KEY` | ImageKit settings for server-side uploads and CDN URLs |

Choose the project cover and gallery from the ImageKit library, or upload images and short videos from the editor. Admin uploads can total up to 3.75 MB per save. Upload larger videos directly in ImageKit under `/shaibya-portfolio` and select them in the editor. The CMS saves full ImageKit URLs. Keep the ImageKit private key, service-role key, and both CMS secrets server-side.

Apply the portfolio migrations before exposing the portfolio schema. To run the migrations from a terminal, set `SUPABASE_DB_PASSWORD` and `SUPABASE_DB_CA_FILE` to the database password and downloaded Supabase CA path, then run `node scripts/run-migration.mjs`. The runtime connects to the Data API using the keys above.
