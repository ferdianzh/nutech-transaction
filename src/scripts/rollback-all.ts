import { umzug } from "../config/umzug";

async function main() {
  const migrations = await umzug.down({ to: 0 });

  console.log(`Rolled back ${migrations.length} migration(s)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
