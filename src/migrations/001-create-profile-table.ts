import { pool } from "../config/database";

export async function up() {
  await pool.query(`
    CREATE TABLE profile (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      profile_image VARCHAR(255) NULL
    )
  `);
}

export async function down() {
  await pool.query(`
    DROP TABLE profile
  `);
}
