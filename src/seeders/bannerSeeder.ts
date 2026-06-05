import { pool } from "../config/database";

const banners = [
  {
    banner_name: "Banner 1",
    banner_image: "https://nutech-integrasi.app/dummy.jpg",
    description: "Lerem Ipsum Dolor sit amet",
  },
  {
    banner_name: "Banner 2",
    banner_image: "https://nutech-integrasi.app/dummy.jpg",
    description: "Lerem Ipsum Dolor sit amet",
  },
  {
    banner_name: "Banner 3",
    banner_image: "https://nutech-integrasi.app/dummy.jpg",
    description: "Lerem Ipsum Dolor sit amet",
  },
  {
    banner_name: "Banner 4",
    banner_image: "https://nutech-integrasi.app/dummy.jpg",
    description: "Lerem Ipsum Dolor sit amet",
  },
  {
    banner_name: "Banner 5",
    banner_image: "https://nutech-integrasi.app/dummy.jpg",
    description: "Lerem Ipsum Dolor sit amet",
  },
  {
    banner_name: "Banner 6",
    banner_image: "https://nutech-integrasi.app/dummy.jpg",
    description: "Lerem Ipsum Dolor sit amet",
  },
];

export async function seedBanners() {
  const connection = await pool.getConnection();

  try {
    for (const banner of banners) {
      await connection.query(
        `
        INSERT INTO banner (
          banner_name,
          banner_image,
          description
        )
        SELECT ?, ?, ?
        WHERE NOT EXISTS (
          SELECT 1
          FROM banner
          WHERE banner_name = ?
        );
        `,
        [
          banner.banner_name,
          banner.banner_image,
          banner.description,
          banner.banner_name,
        ],
      );
    }

    console.log("Banners seeded successfully");
  } finally {
    connection.release();
  }
}
