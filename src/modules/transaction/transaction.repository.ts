import { ResultSetHeader } from "mysql2";
import { pool } from "../../config/database";
import { ServiceSnapshot, Transaction } from "./transaction.types";

export class TransactionRepository {
  async create(data: Partial<Transaction>) {
    const {
      invoice_number,
      transaction_type,
      description,
      total_amount,
      balance,
      profile_id,
    } = data;
    const [rows] = await pool.execute<ResultSetHeader>(
      `
      INSERT INTO \`transaction\` (
        invoice_number,
        transaction_type,
        description,
        total_amount,
        balance,
        profile_id
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        invoice_number!,
        transaction_type!,
        description!,
        total_amount!,
        balance!,
        profile_id!,
      ],
    );

    return rows.insertId;
  }

  async snapshot(data: Partial<ServiceSnapshot>) {
    const {
      service_code,
      service_name,
      service_icon,
      service_tariff,
      transaction_id,
      service_id,
    } = data;
    const [rows] = await pool.execute<ResultSetHeader>(
      `
      INSERT INTO \`service_snapshot\` (
        service_code,
        service_name,
        service_icon,
        service_tariff,
        transaction_id,
        service_id
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        service_code!,
        service_name!,
        service_icon!,
        service_tariff!,
        transaction_id!,
        service_id!,
      ],
    );

    return rows.insertId;
  }

  async findOne(id: number): Promise<Transaction> {
    const [rows] = await pool.execute(
      `
      SELECT
        invoice_number,
        transaction_type,
        description,
        total_amount,
        created_on
      FROM \`transaction\`
      WHERE id = ?
      LIMIT 1
      `,
      [id],
    );

    return (rows as any[])[0] ?? null;
  }

  async findLatest(profile_id: number): Promise<Transaction> {
    const [rows] = await pool.execute(
      `
      SELECT
        invoice_number,
        transaction_type,
        description,
        total_amount,
        balance,
        created_on
      FROM \`transaction\`
      WHERE profile_id = ?
      ORDER BY created_on DESC
      LIMIT 1
      `,
      [profile_id],
    );

    return (rows as any[])[0] ?? null;
  }

  async countTodayTransaction() {
    const [rows] = await pool.execute(
      `
      SELECT COUNT(*) AS total
      FROM \`transaction\`
      WHERE created_on >= CURDATE()
        AND created_on < CURDATE() + INTERVAL 1 DAY;
      `,
    );

    return (rows as any[])[0]?.total ?? 0;
  }

  async findAll({
    profile_id,
    offset = undefined,
    limit = undefined,
  }: {
    profile_id: number;
    offset?: number | undefined;
    limit?: number | undefined;
  }) {
    let sql = `
      SELECT
        invoice_number,
        transaction_type,
        description,
        total_amount,
        balance
      FROM transaction
      WHERE profile_id = ?
      ORDER BY created_on DESC
    `;

    const params: any[] = [profile_id];

    if (limit) {
      sql += ` LIMIT ?`;
      params.push(limit);

      if (offset) {
        sql += ` OFFSET ?`;
        params.push(offset);
      }
    }

    const [rows] = await pool.execute(sql, params);
    return (rows as any[]) ?? [];
  }
}
