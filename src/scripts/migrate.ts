import { pool } from "../config/database";
import { umzug } from "../config/umzug";

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      name VARCHAR(255) PRIMARY KEY,
      executed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await umzug.up();
}

main().catch(console.error);
