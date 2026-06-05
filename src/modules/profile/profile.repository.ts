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

  async findOne(email: string) {
    const [rows] = await pool.execute(
      `
      SELECT email, first_name, last_name, profile_image
      FROM profile
      WHERE email = ?
      LIMIT 1
      `,
      [email],
    );

    return (rows as any[])[0] ?? null;
  }

  async findOneAuth(email: string) {
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

  async update(email: string, data: UpdateProfileDto) {
    const { first_name, last_name, profile_image } = data;
    const [rows] = await pool.execute<ResultSetHeader>(
      `
      UPDATE profile
      SET first_name = ?, last_name = ?, profile_image = ?
      WHERE email = ?
      `,
      [first_name ?? null, last_name ?? null, profile_image ?? null, email],
    );

    return rows;
  }
}
