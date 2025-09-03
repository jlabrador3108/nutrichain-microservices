import { prisma } from "../common/prisma/client.js";

export const seedStock = async () => {
  try {
    const stocks = await prisma.stock.findMany();
    if (stocks.length > 0) {
      console.log("Stocks already exists");
    } else {
      const warehouses = await prisma.warehouse.findMany({
        take: 2,
      });
      if (warehouses.length === 0) {
        console.log("Warehouses not exists");
        throw new Error("Warehouses not exists");
      } else {
        await prisma.stock.createMany({
          data: [
            {
              productSku: "pollo-001",
              warehouseId: warehouses[0].id,
              quantity: 100,
            },
            {
              productSku: "manzana-001",
              warehouseId: warehouses[1].id,
              quantity: 100,
            },
          ],
        });
        console.log("Stocks created");
      }
    }
  } catch (err) {
    console.error("Error seeding Stocks:", err);
    throw err;
  }
};
