import { prisma, Status } from "../../../common/prisma/client.js";
import { ResponseHandler } from "../../../common/utils/response-handler.js";
import * as warehouseService from "../../warehouse/services/warehouse.service.js"; // consumo de warehouse

export class CreateOrderService {
  async createOrder({ customer, date, items }) {
    if (!customer || !items?.length) {
      throw ResponseHandler.error({
        message: "Customer and items are required",
        statusCode: 400,
      });
    }

      // 1. Validar stock en warehouse
      let status = Status.CONFIRMED;
      const stockCheck = await warehouseService.checkStockAvailabilityByProducts(items);
      if (!stockCheck) {
        status = Status.PENDING;
      }

      // 2. Crear el pedido
      const order = await prisma.order.create({
        data: {
          customer,
          date: new Date(date),
          items: {
            create: items.map((i) => ({
              productSku: i.productSku,
              quantity: i.quantity,
            })),
          },
          status,
        },
        include: { items: true },
      });

      // 3. Descontar stock en warehouse
      if(status === Status.CONFIRMED)
      await warehouseService.deductStocksByProducts(items);

      return {data: order};
  }
}
