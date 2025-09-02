import StockController from "../controllers/stock.controller.js";
const controller = new StockController();

export const Query = {
  stock: async (_, { productSku, warehouseId }) =>
    controller.getStock(productSku, warehouseId),
  totalStockByProduct: async (_, { productSku }) =>
    controller.getTotalByProduct(productSku),
};

export const Mutation = {
  registerEntry: async (_, { productSku, warehouseId, quantity, note }) =>
    controller.registerEntry({ productSku, warehouseId, quantity, note }),
  registerExit: async (_, { productSku, warehouseId, quantity, note }) =>
    controller.registerExit({ productSku, warehouseId, quantity, note }),
  registerReturn: async (_, { productSku, warehouseId, quantity, note }) =>
    controller.registerReturn({ productSku, warehouseId, quantity, note }),
  transferStock: async (
    _,
    { productSku, fromWarehouseId, toWarehouseId, quantity, note }
  ) =>
    controller.transfer({
      productSku,
      fromWarehouseId,
      toWarehouseId,
      quantity,
      note,
    }),
  adjustStock: async (_, { productSku, warehouseId, quantity, note }) =>
    controller.adjust({ productSku, warehouseId, quantity, note }),
};
