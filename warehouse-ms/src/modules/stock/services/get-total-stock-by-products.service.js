import { prisma } from "../../../common/prisma/client.js";

export default async function getTotalStockByProducts() {
  const result = await prisma.$runCommandRaw({
    aggregate: "Stock",
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

  return { byProduct: summary, total: summary.length };
}
