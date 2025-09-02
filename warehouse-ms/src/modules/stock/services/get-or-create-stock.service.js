import { MovementType } from "@prisma/client";
import logMovement from "../../movement/services/movement.service.js";
import { ResponseHandler } from "../../../common/utils/response-handler.js";

export default async function getOrCreateStock(tx, productSku, warehouseId) {
  if (!tx)
    ResponseHandler.error({
      message: "Transaction client (tx) is required",
      statusCode: 400,
    });

  if (!productSku || !warehouseId)
    ResponseHandler.error({
      message: "productSku and warehouseId required",
      statusCode: 400,
    });

  const existing = await tx.stock.findUnique({
    where: { productSku_warehouseId: { productSku, warehouseId } },
  });
  if (existing) return { data: existing, created: false };

  const stock = await tx.stock.create({
    data: { productSku, warehouseId, quantity: 0 },
  });
  const logData = {
    productSku: productSku,
    quantity: 0,
    type: MovementType.IN,
    toWarehouseId: warehouseId,
    note: "Initial stock creation",
  };

  await logMovement(logData, tx);
  return {
    data: stock,
    created: true,
  };
}
