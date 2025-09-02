import { readdirSync } from "fs";
import { join } from "path";

export function loadRoutes(app) {
  const modulesPath = join(__dirname, "../../modules");

  readdirSync(modulesPath).forEach(moduleName => {
    const routesPath = join(modulesPath, moduleName, "routes");
    readdirSync(routesPath).forEach(file => {
      if (file.endsWith(".routes.ts")) {
        const route = require(join(routesPath, file)).default;
        app.use(`/api/${moduleName}`, route);
      }
    });
  });
}
