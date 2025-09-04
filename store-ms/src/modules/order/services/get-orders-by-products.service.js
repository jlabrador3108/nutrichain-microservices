import { prisma } from "../../../common/prisma/client.js";

export class OrdersByProductsService {
  async getOrdersByProducts() {
    const result = await prisma.$runCommandRaw({
      aggregate: "OrderItem",
      pipeline: [
        {
          $group: {
            _id: "$productSku",
            totalQuantity: { $sum: "$quantity" },
          },
        },
        {
          $project: {
            _id: 0,
            productSku: "$_id",
            totalQuantity: 1,
          },
        },
      ],
      cursor: {},
    });
    const summary = result.cursor?.firstBatch || [];

    return {
      data: summary,
      meta: { total: summary.length },
    };
  }
}
