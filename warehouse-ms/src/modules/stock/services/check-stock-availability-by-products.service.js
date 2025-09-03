import getTotalStockByProduct from "./get-total-stock-by-product.service.js";

export default async function checkStockAvailabilityByProducts(items) {
  for (const item of items) {
    let warehouseAvailable = false;
    const { byWarehouse } = await getTotalStockByProduct(item.productSku);

    for (const wh of byWarehouse) {
      if (wh.quantity >= item.quantity) {
        warehouseAvailable = true;
        break;
      }
    }
    if (!warehouseAvailable) {
      return false;
    }
  }

  return true;
}
