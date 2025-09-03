import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 6000,
  mongoUri: process.env.MONGODB_URI,
  warehouseUrl: process.env.WAREHOUSE_MS_URL,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
};

// Validación temprana de variables críticas
const requiredVars = ["mongoUri", "warehouseUrl", "redisHost", "redisPort"];

for (const key of requiredVars) {
  if (!config[key]) {
    console.error(`Missing ${key.toUpperCase()} in .env`);
    process.exit(1); // termina el proceso
  }
}

export default config;
