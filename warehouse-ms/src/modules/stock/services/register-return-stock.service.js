import { MovementType } from "@prisma/client";
import registerEntry from "./register-entry-stock.service.js";

export default async function registerReturn({ productSku, warehouseId, quantity, note }) {
  return registerEntry({ productSku, warehouseId, quantity, note, type: MovementType.RETURN });
}