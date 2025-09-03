import StockService from "../services/stock.service.js";

class StockController {
  constructor() {
    this.service = new StockService();
  }

  async registerEntry(payload) {
    return this.service.registerEntry(payload);
  }

  async registerExit(payload) {
    return this.service.registerExit(payload);
  }

  async registerReturn(payload) {
    return this.service.registerReturn(payload);
  }

  async transfer(payload) {
    return this.service.transfer(payload);
  }

  async adjust(payload) {
    return this.service.adjust(payload);
  }

  async getOrCreate(payload) {
    return this.service.getOrCreateStock(payload);
  }

  async getTotalByProduct(productSku) {
    return this.service.getTotalStockByProduct(productSku);
  }
  
  async checkStockAvailabilityByProducts(items) {
    return this.service.checkStockAvailabilityByProducts(items);
  }

  async getStock(productSku, warehouseId) {
    return this.service.getStock(productSku, warehouseId);
  }

  async getTotalStockByProduct(productSku) {
    return this.service.getTotalStockByProduct(productSku);
  }

  async deductStocksByProducts(items) {
    return this.service.deductStocksByProducts(items);
  }
}

export default StockController;
