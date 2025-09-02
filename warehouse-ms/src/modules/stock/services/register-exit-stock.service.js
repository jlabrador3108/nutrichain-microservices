import getOrCreateStock from "./get-or-create-stock.service.js";
import { MovementType, prisma } from "../../../common/prisma/client.js";
import logMovement from "../../movement/services/movement.service.js";
import { ResponseHandler } from "../../../common/utils/response-handler.js";

export default async function registerExit({
  productSku,
  warehouseId,
  quantity,
  note,
}) {
  if (quantity <= 0)
    ResponseHandler.error({
      message: "quantity must be > 0",
      statusCode: 400,
    });

  return await prisma.$transaction(
    async (tx) => {
      const { data: current } = await getOrCreateStock(
        tx,
        productSku,
        warehouseId
      );
      if (current.quantity < quantity) {
        ResponseHandler.error({
          message: "Insufficient stock for OUT operation",
          statusCode: 400,
        });
      }

      const updated = await tx.stock.update({
        where: { productSku_warehouseId: { productSku, warehouseId } },
        data: { quantity: { decrement: quantity } },
      });

      const logData = {
        productSku,
        quantity,
        type: MovementType.OUT,
        fromWarehouseId: warehouseId,
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
