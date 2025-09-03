import axios from "axios";
import { ResponseHandler } from "../../../common/utils/response-handler.js";

const WAREHOUSE_MS_URL = process.env.WAREHOUSE_MS_URL

// Consulta disponibilidad de stock
//checkStockAvailabilityByProducts(items: [ItemInput!]!): Boolean!
export async function checkStockAvailabilityByProducts(items) {
  try{
  const query = `
    query checkStockAvailabilityByProducts($items: [ItemInput!]!) {
      checkStockAvailabilityByProducts(items: $items)
    }
  `;

  const response = await axios.post(WAREHOUSE_MS_URL, {
    query,
    variables: { items },
  });

  if (response.data.errors) {
    throw ResponseHandler.error({message: response.data.errors.map((e) => e.message).join(", ")});
  }

  return response.data.data.checkStockAvailabilityByProducts;
   } catch (error) {
    console.error("Error check stocks:", error);
    throw ResponseHandler.error({message: "Error check stocks"});
  }
}
//deductStocksByProducts(items: [StockInput!]!): Boolean!
// Descuenta stock en almacén
export async function deductStocksByProducts(items) {
  try{
  const mutation = `
    mutation deductStocksByProducts($items: [StockInput!]!) {
      deductStocksByProducts(items: $items) 
    }
  `;

  const response = await axios.post(WAREHOUSE_MS_URL, {
    query: mutation,
    variables: { items },
  });

  if (response.data.errors) {
    ResponseHandler.error({message: response.data.errors.map((e) => e.message).join(", ")});
  }

  return response.data.deductStocksByProducts;
  } catch (error) {
    console.error("Error deducting stocks:", error);
    throw ResponseHandler.error({message: "Error deducting stocks"});
  }
}

export default { checkStockAvailabilityByProducts, deductStocksByProducts };
