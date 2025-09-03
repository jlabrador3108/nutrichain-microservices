import { prisma } from "../../../common/prisma/client.js";
// import { orderQueue } from "../../../common/queue/redis-queue.js";

export class OrderService {
  async getOrders() {
    const orders = await prisma.order.findMany({ include: { items: true } });
    return { data: orders, meta: { total: orders.length } };
  }

  async getOrderById(id) {
    const data = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    return { data };
  }

}
