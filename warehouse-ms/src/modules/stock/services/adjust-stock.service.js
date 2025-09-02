import { MovementType, prisma } from "../../../common/prisma/client.js";
import { ResponseHandler } from "../../../common/utils/response-handler.js";
import logMovement from "../../movement/services/movement.service.js";
import getOrCreateStock from "./get-or-create-stock.service.js";

export default async function adjustStock({
  productSku,
  warehouseId,
  quantity,
  note,
}) {
  // quantity puede ser positivo (sobrante) o negativo (pérdida/daño)
  if (quantity === 0)
    ResponseHandler.error({
      message: "quantity must be a non-zero integer",
      statusCode: 400,
    });

  return await prisma.$transaction(
    async (tx) => {
      const { data: current } = await getOrCreateStock(
        tx,
        productSku,
        warehouseId
      );
      const newQty = current.quantity + quantity;
      if (newQty < 0)
        ResponseHandler.error({
          message: "Adjustment would result in negative stock",
          statusCode: 400,
        });

      await tx.stock.update({
        where: { productSku_warehouseId: { productSku, warehouseId } },
        data: { quantity: newQty },
      });

      const logData = {
        productSku,
        quantity: Math.abs(quantity),
        type:
          quantity > 0
            ? MovementType.ADJUST_POSITIVE
            : MovementType.ADJUST_NEGATIVE,
        toWarehouseId: quantity > 0 ? warehouseId : null,
        fromWarehouseId: quantity < 0 ? warehouseId : null,
        note,
      };
      await logMovement(logData, tx);

      return { productSku, warehouseId, quantity: newQty };
    },
    {
      timeout: 200000, // 200 segundos de duración máxima
      maxWait: 200000, // 200 segundos para que se inicie la transacción
    }
  );
}
