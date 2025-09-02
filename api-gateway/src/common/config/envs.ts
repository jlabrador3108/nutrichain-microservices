import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCT_SERVICE_URL: string;
  STOCK_SERVICE_URL: string;
  ORDER_SERVICE_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCT_SERVICE_URL: joi.string().required(),
    STOCK_SERVICE_URL: joi.string().required(),
    ORDER_SERVICE_URL: joi.string().required(),
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
  stockServiceUrl: envVars.STOCK_SERVICE_URL,
  orderServiceUrl: envVars.ORDER_SERVICE_URL,
};
