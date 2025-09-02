require('dotenv').config();

const config = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI,
};

if (!config.mongoUri) {
  console.error('Missing MONGODB_URI in .env');
  process.exit(1);
}

export default config;
