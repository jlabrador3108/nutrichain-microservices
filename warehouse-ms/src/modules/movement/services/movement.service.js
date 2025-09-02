import { MovementType } from "@prisma/client";
import { ResponseHandler } from "../../../common/utils/response-handler.js";

export default async function logMovement(data, tx) {
  // tx: transacción prisma
  if (!tx)
    ResponseHandler.error({
      message: "Transaction (tx) is required",
      statusCode: 400,
    });

  if (!data || !data.productSku || isNaN(data.quantity) || !data.type)
    ResponseHandler.error({
      message: "productSku, quantity and type are required in data",
      statusCode: 400,
    });
  // if (!Number.isInteger(data.quantity) || data.quantity <= 0)
  // ResponseHandler.error({
  //     message: "quantity must be a positive integer",
  //     statusCode: 400,
  //   });

  if (!data.toWarehouseId && !data.fromWarehouseId)
    ResponseHandler.error({
      message: "toWarehouseId or fromWarehouseId is required",
      statusCode: 400,
    });

  if (data.type === MovementType.IN && !data.toWarehouseId)
    ResponseHandler.error({
      message: "toWarehouseId is required for IN movements",
      statusCode: 400,
    });

  if (data.type === MovementType.OUT && !data.fromWarehouseId)
    ResponseHandler.error({
      message: "fromWarehouseId is required for OUT movements",
      statusCode: 400,
    });

  if (
    data.type === MovementType.TRANSFER &&
    !data.fromWarehouseId &&
    !data.toWarehouseId
  )
    ResponseHandler.error({
      message:
        "fromWarehouseId and toWarehouseId are required for TRANSFER movements",
      statusCode: 400,
    });

  if (![MovementType[data.type]])
    ResponseHandler.error({
      message: "Invalid movement type",
      statusCode: 400,
    });

  const initData = {
    note: data.note ? data.note : `${data.type} movement`,
  };

  return await tx.movement.create({ data: { ...data, ...initData } });
}
