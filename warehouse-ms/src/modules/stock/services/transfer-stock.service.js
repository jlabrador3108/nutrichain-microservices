import { MovementType, prisma } from "../../../common/prisma/client.js";
import { ResponseHandler } from "../../../common/utils/response-handler.js";
import logMovement from "../../movement/services/movement.service.js";
import getOrCreateStock from "./get-or-create-stock.service.js";

export default async function transferStock({
  productSku,
  fromWarehouseId,
  toWarehouseId,
  quantity,
  note,
}) {
  if (fromWarehouseId === toWarehouseId)
    ResponseHandler.error({
      message: "from/to must differ",
      statusCode: 400,
    });

  if (quantity <= 0)
    ResponseHandler.error({
      message: "quantity must be > 0",
      statusCode: 400,
    });

  return await prisma.$transaction(
    async (tx) => {
      const { data: from } = await getOrCreateStock(
        tx,
        productSku,
        fromWarehouseId
      );
      if (from.quantity < quantity)
        ResponseHandler.error({
          message: "Insufficient stock for TRANSFER",
          statusCode: 400,
        });

      // decrement
      await tx.stock.update({
        where: {
          productSku_warehouseId: { productSku, warehouseId: fromWarehouseId },
        },
        data: { quantity: { decrement: quantity } },
      });

      // increment
      await getOrCreateStock(tx, productSku, toWarehouseId);
      await tx.stock.update({
        where: {
          productSku_warehouseId: { productSku, warehouseId: toWarehouseId },
        },
        data: { quantity: { increment: quantity } },
      });

      const logData = {
        productSku,
        quantity,
        type: MovementType.TRANSFER,
        fromWarehouseId,
        toWarehouseId,
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
