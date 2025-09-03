import { Worker } from "bullmq";
import { orderQueue } from "../../../common/queue/redis-queue.js";
import { CreateOrderService } from "../services/create-order.service.js";

export const orderWorker = new Worker(
  "orderQueue",
  async (job) => {
    const createService = new CreateOrderService();
    const orderData = job.data;

    const createdOrder = await createService.createOrder(orderData);

    console.log(`Order processed and created: ${createdOrder.data.id}`);
    return createdOrder;
  },
  { connection: orderQueue.connection }
);

orderWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});

orderWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});
