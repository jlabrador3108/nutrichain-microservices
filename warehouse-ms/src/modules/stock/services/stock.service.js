import adjustStock from "./adjust-stock.service.js";
import getStock from "./get-stock.service.js";
import getOrCreateStock from "./get-or-create-stock.service.js";
import getTotalStockByProduct from "./get-total-stock-by-product.service.js";
import registerEntry from "./register-entry-stock.service.js";
import registerExit from "./register-exit-stock.service.js";
import registerReturn from "./register-return-stock.service.js";
import transferStock from "./transfer-stock.service.js";
import checkStockAvailabilityByProducts from "./check-stock-availability-by-products.service.js";
import deductStocksByProducts from "./deduct-stocks-by-products.service.js";

export default class StockService {
  constructor() {
    this.registerEntry = registerEntry;
    this.registerExit = registerExit;
    this.registerReturn = registerReturn;
    this.transfer = transferStock;
    this.adjust = adjustStock;
    this.getOrCreateStock = getOrCreateStock;
    this.getTotalStockByProduct = getTotalStockByProduct;
    this.getStock = getStock
    this.checkStockAvailabilityByProducts = checkStockAvailabilityByProducts
    this.deductStocksByProducts = deductStocksByProducts
  }
}