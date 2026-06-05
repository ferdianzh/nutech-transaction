import { pool } from "../config/database";

export async function up() {
  await pool.query(`
    CREATE TABLE banner (
      id INT AUTO_INCREMENT PRIMARY KEY,
      banner_name VARCHAR(255) NOT NULL,
      banner_image VARCHAR(255) NOT NULL,
      description VARCHAR(255) NULL
    )
  `);
}

export async function down() {
  await pool.query(`
    DROP TABLE banner
  `);
}
