import pkg from "@prisma/client";
const { PrismaClient, Status } = pkg;

export const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

export { Status };