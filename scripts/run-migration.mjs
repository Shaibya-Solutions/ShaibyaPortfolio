import { readFileSync } from "node:fs";
import pg from "pg";

async function run() {
  const password = process.env.SUPABASE_DB_PASSWORD || process.argv[2];
  const caFile = process.env.SUPABASE_DB_CA_FILE;
  if (!password || !caFile) {
    console.error("Set SUPABASE_DB_PASSWORD and SUPABASE_DB_CA_FILE, then run node scripts/run-migration.mjs.");
    process.exitCode = 1;
    return;
  }

  const host = "aws-1-ap-south-1.pooler.supabase.com";
  const client = new pg.Client({
    host,
    user: "postgres.hbhumkwhlwmbwoxnyvms",
    database: "postgres",
    password,
    ssl: { ca: readFileSync(caFile), servername: host, rejectUnauthorized: true },
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    const { rows: [schema] } = await client.query(
      "SELECT to_regnamespace('shaibya_portfolio') IS NOT NULL AS exists",
    );
    if (!schema.exists) {
      const initial = new URL("../supabase/migrations/20261109_shaibya_portfolio.sql", import.meta.url);
      await client.query(readFileSync(initial, "utf8"));
    }
    const security = new URL("../supabase/migrations/20261123000000_secure_portfolio_cms.sql", import.meta.url);
    await client.query(readFileSync(security, "utf8"));
    console.log("Portfolio migrations applied to shaibya_portfolio.");
  } finally {
    await client.end();
  }
}

run().catch((error) => {
  console.error("Portfolio migration failed:", error.code || error.name);
  process.exitCode = 1;
});
