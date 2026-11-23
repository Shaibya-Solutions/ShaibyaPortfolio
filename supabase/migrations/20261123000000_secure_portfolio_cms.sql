BEGIN;

DROP POLICY IF EXISTS "Admin Write Projects" ON shaibya_portfolio.projects;
DROP POLICY IF EXISTS "Admin Write Testimonials" ON shaibya_portfolio.testimonials;
DROP POLICY IF EXISTS "Admin Write Team" ON shaibya_portfolio.team_members;
DROP POLICY IF EXISTS "Admin Write Careers" ON shaibya_portfolio.careers_roles;
DROP POLICY IF EXISTS "Admin Write FAQs" ON shaibya_portfolio.faqs;
DROP POLICY IF EXISTS "Admin Write Site Content" ON shaibya_portfolio.site_content;

REVOKE ALL ON ALL TABLES IN SCHEMA shaibya_portfolio FROM PUBLIC, anon, authenticated;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA shaibya_portfolio FROM PUBLIC, anon, authenticated;
GRANT SELECT ON shaibya_portfolio.projects, shaibya_portfolio.testimonials,
  shaibya_portfolio.team_members, shaibya_portfolio.careers_roles,
  shaibya_portfolio.faqs, shaibya_portfolio.site_content TO anon, authenticated;

CREATE TABLE IF NOT EXISTS shaibya_portfolio.admin_login_attempts (
  client_key text PRIMARY KEY,
  window_started_at timestamptz NOT NULL,
  attempts integer NOT NULL
);
ALTER TABLE shaibya_portfolio.admin_login_attempts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON shaibya_portfolio.admin_login_attempts FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON shaibya_portfolio.admin_login_attempts TO service_role;

CREATE OR REPLACE FUNCTION shaibya_portfolio.allow_admin_login(client_key_hash text)
RETURNS boolean
LANGUAGE plpgsql
SET search_path = ''
AS $$
DECLARE
  attempt_count integer;
BEGIN
  DELETE FROM shaibya_portfolio.admin_login_attempts
  WHERE window_started_at < now() - interval '1 day';

  INSERT INTO shaibya_portfolio.admin_login_attempts AS existing
    (client_key, window_started_at, attempts)
  VALUES (client_key_hash, now(), 1)
  ON CONFLICT (client_key) DO UPDATE
  SET attempts = CASE
        WHEN existing.window_started_at < now() - interval '15 minutes' THEN 1
        ELSE least(existing.attempts + 1, 11)
      END,
      window_started_at = CASE
        WHEN existing.window_started_at < now() - interval '15 minutes' THEN now()
        ELSE existing.window_started_at
      END
  RETURNING attempts INTO attempt_count;

  RETURN attempt_count <= 10;
END;
$$;

REVOKE ALL ON FUNCTION shaibya_portfolio.allow_admin_login(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION shaibya_portfolio.allow_admin_login(text) TO service_role;

COMMIT;
