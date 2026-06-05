import { pool } from "./database";

export class MySQLStorage {
  async logMigration({ name }: { name: string }) {
    await pool.query("INSERT INTO migrations (name) VALUES (?)", [name]);
  }

  async unlogMigration({ name }: { name: string }) {
    await pool.query("DELETE FROM migrations WHERE name = ?", [name]);
  }

  async executed() {
    const [rows] = await pool.query(
      "SELECT name FROM migrations ORDER BY executed_at",
    );

    return (rows as { name: string }[]).map((row) => row.name);
  }
}
