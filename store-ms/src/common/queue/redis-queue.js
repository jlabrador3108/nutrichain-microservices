// src/common/queue/redis-queue.js
import { Queue } from "bullmq";

import IORedis from "ioredis";

import dotenv from "dotenv";
dotenv.config();

dotenv.config();
console.log("🔧 Connecting to Redis with:", {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

export const orderQueue = new Queue("orderQueue", { connection });
