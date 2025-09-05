import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCT_SERVICE_URL: string;
  WAREHOUSE_SERVICE_URL: string;
  STORE_SERVICE_URL: string;
  REPORTS_SERVICE_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCT_SERVICE_URL: joi.string().required(),
    WAREHOUSE_SERVICE_URL: joi.string().required(),
    STORE_SERVICE_URL: joi.string().required(),
    REPORTS_SERVICE_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) throw new Error(`Config validation error: ${error.message}`);

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  productServiceUrl: envVars.PRODUCT_SERVICE_URL,
  warehouseServiceUrl: envVars.WAREHOUSE_SERVICE_URL,
  storeServiceUrl: envVars.STORE_SERVICE_URL,
  reportsServiceUrl: envVars.REPORTS_SERVICE_URL,
};
