import pg from "pg";
import fs from "fs";
import path from "path";

const { Client } = pg;

async function run() {
  const password = process.argv[2] || process.env.SUPABASE_DB_PASSWORD;
  if (!password) {
    console.error("Usage: node scripts/run-migration.mjs <YOUR_DB_PASSWORD>");
    process.exit(1);
  }

  const connectionString = `postgresql://postgres.hbhumkwhlwmbwoxnyvms:${encodeURIComponent(
    password
  )}@aws-1-ap-south-1.pooler.supabase.com:5432/postgres`;

  console.log("Connecting to Supabase PostgreSQL database directly...");

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("Connected successfully to PostgreSQL!");

    const sqlPath = path.resolve(process.cwd(), "supabase/migrations/20261109_shaibya_portfolio.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    console.log("Executing migration on schema 'shaibya_portfolio'...");
    await client.query(sql);

    console.log("Migration executed successfully!");
    console.log("Checking created tables in shaibya_portfolio:");
    const res = await client.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'shaibya_portfolio';`
    );
    console.log(res.rows.map((r) => r.table_name));
  } catch (err) {
    console.error("Migration error:", err.message || err);
  } finally {
    await client.end();
  }
}

run();
