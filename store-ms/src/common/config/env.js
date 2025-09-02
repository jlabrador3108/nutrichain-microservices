require('dotenv').config();

const config = {
  port: process.env.PORT || 6000,
  mongoUri: process.env.MONGODB_URI,
  warehouseUrl: process.env.WAREHOUSE_MS_URL,
};

if (!config.mongoUri) {
  console.error('Missing MONGODB_URI in .env');
  process.exit(1);
}

if (!config.warehouseUrl) {
  console.error('Missing WAREHOUSE_MS_URL in .env');
  process.exit(1);
}

export default config;
