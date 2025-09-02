import { MovementType, prisma } from "../../../common/prisma/client.js";
import { ResponseHandler } from "../../../common/utils/response-handler.js";
import logMovement from "../../movement/services/movement.service.js";
import getOrCreateStock from "./get-or-create-stock.service.js";

export default async function registerEntry({
  productSku,
  warehouseId,
  quantity,
  note,
  type,
}) {
  if (quantity <= 0)
    ResponseHandler.error({
      message: "quantity must be > 0",
      statusCode: 400,
    });

  return await prisma.$transaction(
    async (tx) => {
      await getOrCreateStock(tx, productSku, warehouseId);
      const updated = await tx.stock.update({
        where: { productSku_warehouseId: { productSku, warehouseId } },
        data: { quantity: { increment: quantity } },
      });

      const logData = {
        productSku,
        quantity,
        type: type || MovementType.IN,
        toWarehouseId: warehouseId,
        note,
      };
      const movement = await logMovement(logData, tx);

      return movement;
    },
    {
      timeout: 200000, // 200 segundos de duración máxima
      maxWait: 200000, // 200 segundos para que se inicie la transacción
    }
  );
}
