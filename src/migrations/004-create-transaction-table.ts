import { pool } from "../config/database";

export async function up() {
  await pool.query(`
    CREATE TABLE transaction (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      profile_id BIGINT NULL,
      invoice_number VARCHAR(255) NOT NULL,
      transaction_type ENUM('TOPUP', 'PAYMENT') NOT NULL,
      description VARCHAR(255) NOT NULL,
      total_amount DECIMAL(15,2) NOT NULL,
      balance DECIMAL(15,2) NOT NULL,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

      CONSTRAINT fk_transaction_profile
        FOREIGN KEY (profile_id)
        REFERENCES profile(id)
    );
  `);
}

export async function down() {
  await pool.query(`
    DROP TABLE transaction
  `);
}
