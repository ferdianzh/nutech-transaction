import { pool } from "../../config/database";

export class InformationRepository {
  async findAllBanner() {
    const [rows] = await pool.execute(
      `
      SELECT banner_name, banner_image, description
      FROM banner
      `,
    );

    return (rows as any[])[0] ?? [];
  }

  async findAllService() {
    const [rows] = await pool.execute(
      `
      SELECT service_code, service_name, service_icon, service_tariff
      FROM service
      `,
    );

    return (rows as any[])[0] ?? [];
  }
}
