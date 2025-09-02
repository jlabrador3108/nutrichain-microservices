import { prisma } from "../../../common/prisma/client.js";

export default async function getStock(
  productSku,
  warehouseId
) {
  return await prisma.stock.findUnique({
    where: { productSku_warehouseId: { productSku, warehouseId } },
  });
}
