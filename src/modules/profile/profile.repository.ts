import { ResultSetHeader } from "mysql2";
import { pool } from "../../config/database";
import { CreateProfileDto, UpdateProfileDto } from "./profile.types";

export class ProfileRepository {
  async create(data: CreateProfileDto) {
    const { email, password, first_name, last_name } = data;
    const [rows] = await pool.execute<ResultSetHeader>(
      `
      INSERT INTO profile (
        email,
        password,
        first_name,
        last_name
      )
      VALUES (?, ?, ?, ?)
      `,
      [email, password, first_name ?? null, last_name ?? null],
    );

    return rows.insertId;
  }

  async update(id: string, data: UpdateProfileDto) {
    const { first_name, last_name, profile_image } = data;
    const [rows] = await pool.execute(
      `
      UPDATE profile
      SET first_name = ?, last_name = ?, profile_image = ?
      WHERE id = ?
      `,
      [first_name ?? null, last_name ?? null, profile_image ?? null, id],
    );

    return rows;
  }

  async findOne(id: string) {
    const [rows] = await pool.execute(
      `
      SELECT email, first_name, last_name, profile_image
      WHERE id = ?
      `,
      [id],
    );

    return rows;
  }

  async findByEmail(email: string) {
    const [rows] = await pool.execute(
      `
      SELECT id, email, password
      FROM profile
      WHERE email = ?
      LIMIT 1
      `,
      [email],
    );

    return (rows as any[])[0] ?? null;
  }
}
