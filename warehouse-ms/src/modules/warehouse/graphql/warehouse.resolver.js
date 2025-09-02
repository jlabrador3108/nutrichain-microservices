import WarehouseController from '../controllers/warehouse.controller.js';

const controller = new WarehouseController();

export const Query = {
    warehouses: async () => controller.list(),
    warehouse: async (_, { id }) => controller.get(id),
};
export const Mutation = {
    createWarehouse: async (_, args) => controller.create(args),
    updateWarehouse: async (_, { id, ...rest }) => controller.update(id, rest),
    deleteWarehouse: async (_, { id }) => controller.delete(id),
};
