import { pool } from "../config/database";

export async function up() {
  await pool.query(`
    CREATE TABLE service_snapshot (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      transaction_id BIGINT NOT NULL,
      service_id BIGINT NULL,
      service_code VARCHAR(255) NOT NULL,
      service_name VARCHAR(255) NOT NULL,
      service_icon VARCHAR(255) NOT NULL,
      service_tariff VARCHAR(255) NOT NULL,

      CONSTRAINT fk_service_snapshot_transaction
        FOREIGN KEY (transaction_id)
        REFERENCES transaction(id),
      
      CONSTRAINT fk_service_snapshot_service
        FOREIGN KEY (service_id)
        REFERENCES service(id)
        ON DELETE SET NULL
    )
  `);
}

export async function down() {
  await pool.query(`
    DROP TABLE service_snapshot
  `);
}
