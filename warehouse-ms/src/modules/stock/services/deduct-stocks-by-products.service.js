import { prisma } from "../../../common/prisma/client.js";
// import getTotalStockByProduct from "./get-total-stock-by-product.service.js";
import registerExit from "./register-exit-stock.service.js";

export default async function deductStocksByProducts(items) {
  return await prisma.$transaction(async (tx) => {
    for (const item of items) {
      // 1. Buscar stock disponible por warehouse
      const { byWarehouse } = await getTotalStockByProduct(item.productSku, tx);

      // 2. Elegir warehouse que tenga suficiente stock
      const wh = byWarehouse.find((wh) => wh.quantity >= item.quantity);

      if (!wh) {
        ResponseHandler.error(
          {message: `Insufficient stock for product ${item.productSku} in all warehouses`,
          statusCode: 400,}
        );
      }

      // 3. Registrar salida en el warehouse elegido
      await registerExit(
        {
          productSku: item.productSku,
          warehouseId: wh.warehouseId,
          quantity: item.quantity,
          note: "Deducted by order fulfillment",
        },
        tx
      );
    }
  });
}
