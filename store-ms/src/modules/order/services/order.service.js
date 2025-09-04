import { prisma } from "../../../common/prisma/client.js";
import { ResponseHandler } from "../../../common/utils/response-handler.js";

export class OrderService {
  async getOrders(query) {
    const { startDate, endDate } = query;

    if ((startDate && !endDate) || (!startDate && endDate)) {
      throw ResponseHandler.error({
        message: "You must send both dates: startDate and endDate",
        statusCode: 400,
      });
    }

    let where = {};
    // Si vienen las dos fechas, validar formato y rango
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw ResponseHandler.error({
          message: "Ivalid date format. Use YYYY-MM-DDTHH:mm:ss",
          statusCode: 400,
        });
      }

      if (start > end) {
        throw ResponseHandler.error({
          message: "The startDate must be less than the endDate",
          statusCode: 400,
        });
      }

      where.date = { gte: start, lte: end };
    }
    const orders = await prisma.order.findMany({
      where,
      include: { items: true },
    });
    return { data: orders, meta: { total: orders.length } };
  }

  async getOrderById(id) {
    const data = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    return { data };
  }
}
