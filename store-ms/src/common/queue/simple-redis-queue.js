import Redis from "ioredis";
import { ResponseHandler } from "../utils/response-handler.js";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  lazyConnect: true,
  maxRetriesPerRequest: null,
});

export async function addToQueue(orderData) {
  try {
    const result = await redis.rpush("orders:queue", JSON.stringify(orderData));
    return result;
  } catch (error) {
    throw ResponseHandler.error({
      message: error.message || "Error adding to queue"
    });
  }
}

export function startQueueProcessor() {
  setInterval(async () => {
    try {
      const result = await redis.lpop("orders:queue");

      if (result) {
        const orderData = JSON.parse(result);

        await processOrder(orderData);

      }
    } catch (error) {
      console.error("Error procession orden", error);
    }
  }, 5000);
}

async function processOrder(orderData) {
  try {
    const { CreateOrderService } = await import(
      "../../modules/order/services/create-order.service.js"
    );
    const service = new CreateOrderService();
    return await service.createOrder(orderData);
  } catch (error) {
    throw ResponseHandler.error({
      message: error.message || "Error processing order"
    });
  }
}
