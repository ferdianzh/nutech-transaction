import { pool } from "../config/database";

export async function up() {
  await pool.query(`
    CREATE TABLE service (
      id INT AUTO_INCREMENT PRIMARY KEY,
      service_code VARCHAR(255) NOT NULL,
      service_name VARCHAR(255) NOT NULL,
      service_icon VARCHAR(255) NOT NULL,
      service_tariff VARCHAR(255) NOT NULL
    )
  `);
}

export async function down() {
  await pool.query(`
    DROP TABLE service
  `);
}
