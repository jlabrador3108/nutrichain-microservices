import { prisma } from "../common/prisma/client.js";

// name: String!
//       location: LocationInput!
//       manager: String
const warehouses = [
  {
    name: "Almacen 1",
    manager: "Alberto",
    location: {
      address: "Calle Falsa 123",
      lat: 20.45678,
      lon: 20.45678,
    },
  },
  {
    name: "Almacen 2",
    manager: "Juan",
    location: {
      address: "Calle Falsa 456",
      lat: 20.45678,
      lon: 20.45678,
    },
  },
];
export const seedWarehouse = async () => {
  try {
    const existing = await prisma.warehouse.findMany();
    if (existing.length > 0) {
      console.log("Warehouses already exists");
    } else {
      await prisma.warehouse.createMany({ data: warehouses });
      console.log("Warehouses created");
    }
  } catch (err) {
    console.error("Error seeding Warehouses:", err);
    throw err;
  }
};
