import { umzug } from "../config/umzug";

async function main() {
  const migrations = await umzug.down();

  console.log(`Rolled back ${migrations ? 1 : 0} migration(s)`);
}

main().catch(console.error);
