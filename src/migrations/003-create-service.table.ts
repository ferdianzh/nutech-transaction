import { pool } from "../config/database";

export async function up() {
  await pool.query(`
    CREATE TABLE service (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      service_code VARCHAR(255) NOT NULL,
      service_name VARCHAR(255) NOT NULL,
      service_icon VARCHAR(255) NOT NULL,
      service_tariff DECIMAL(15,2) NOT NULL
    )
  `);
}

export async function down() {
  await pool.query(`
    DROP TABLE service
  `);
}
