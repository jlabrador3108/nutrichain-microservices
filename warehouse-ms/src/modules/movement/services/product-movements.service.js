import { GraphQLError } from "graphql";
import { prisma } from "../../../common/prisma/client.js";

export class ProductMovementsService {
  async productMovements(args) {
    const { productSku, startDate, endDate } = args;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new GraphQLError("Ivalid date format. Use YYYY-MM-DDTHH:mm:ss", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    if (start > end) {
      throw new GraphQLError("The startDate must be less than the endDate", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    const movements = await prisma.movement.findMany({
      where: {
        productSku,
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return movements;
  }
}
