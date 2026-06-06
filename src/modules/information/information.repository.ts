import { pool } from "../../config/database";
import { Banner, Service } from "./information.types";

export class InformationRepository {
  async findAllBanner(): Promise<Banner[]> {
    const [rows] = await pool.execute(
      `
      SELECT banner_name, banner_image, description
      FROM banner
      `,
    );

    return (rows as any[]) ?? [];
  }

  async findAllService(): Promise<Service[]> {
    const [rows] = await pool.execute(
      `
      SELECT service_code, service_name, service_icon, service_tariff
      FROM service
      `,
    );

    return (rows as any[]) ?? [];
  }

  async findServiceByCode(service_code: string): Promise<Service> {
    const [rows] = await pool.execute(
      `
      SELECT *
      FROM service
      WHERE service_code = ?
      LIMIT 1
      `,
      [service_code],
    );

    return (rows as any[])[0] ?? null;
  }
}
