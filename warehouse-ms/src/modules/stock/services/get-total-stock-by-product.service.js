import { prisma } from "../../../common/prisma/client.js";

// retorna { total, byWarehouse: [{warehouseId, quantity}] }
export default async function getTotalStockByProduct(productSku) {
  const rows = await prisma.stock.findMany({
    where: { productSku },
    include: { warehouse: true },
  });
  const total = rows.reduce((s, r) => s + (r.quantity || 0), 0);
  const byWarehouse = rows.map((r) => ({
    warehouseId: r.warehouseId,
    warehouseName: r.warehouse?.name,
    quantity: r.quantity,
  }));
  return { total, byWarehouse };
}
