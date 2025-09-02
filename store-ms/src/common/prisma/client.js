import { PrismaClient, MovementType} from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

export { MovementType };