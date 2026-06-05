import { Umzug } from "umzug";
import { MySQLStorage } from "./mysql-storage";

export const umzug = new Umzug({
  migrations: {
    glob: "src/migrations/*.ts",
  },

  storage: new MySQLStorage(),

  logger: console,
});
