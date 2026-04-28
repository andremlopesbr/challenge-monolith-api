import { SequelizeStorage, Umzug } from "umzug"
import { join } from "path"
import { Sequelize } from "sequelize"

export const migrator = (
  sequelize: Sequelize
) => {
  return new Umzug({
    migrations: {
      glob: [
        "src/infrastructure/db/migrations/*.ts",
        {
          cwd: join(__dirname, "../../../../../"),
          ignore: ["**/*.d.ts", "**/index.ts", "**/index.js"],
          resolve: (obj) => {
            if (obj.name.endsWith('.ts')) {
              return obj;
            }
            return obj;
          },
        },
      ],
      handle: (name: string, params: { path: string }) => {
        if (!name.endsWith('.ts')) {
          return null;
        }
        return name;
      }
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: console
  })
}