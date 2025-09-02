import { prisma } from "../../../common/prisma/client.js";

class WarehouseService {
  async create(data) {
    return prisma.warehouse.create({ data });
  }

  async findAll() {
    return prisma.warehouse.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findById(id) {
    return prisma.warehouse.findUnique({ where: { id } });
  }

  async update(id, data) {
    return prisma.warehouse.update({ where: { id }, data });
  }

  async delete(id) {
    return prisma.warehouse.delete({ where: { id } });
  }
}

export default WarehouseService;
