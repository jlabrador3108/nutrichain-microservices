import { readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function loadRoutes(app) {
  const modulesPath = join(__dirname, "../../modules");

  for (const moduleName of readdirSync(modulesPath)) {
    const routesPath = join(modulesPath, moduleName, "routes");
    try {
      for (const file of readdirSync(routesPath)) {
        if (file.endsWith(".routes.js")) {
          const route = await import(`file://${join(routesPath, file)}`);
          app.use(`/api/${moduleName}`, route.default);
        }
      }
    } catch (e) {
      // Si no hay rutas, ignoramos
    }
  }
}
