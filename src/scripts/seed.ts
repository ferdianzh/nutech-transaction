import { seedBanners } from "../seeders/bannerSeeder";
import { seedServices } from "../seeders/serviceSeeder";

async function main() {
  await seedBanners();
  await seedServices();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
