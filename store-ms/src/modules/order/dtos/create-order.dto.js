import { z } from "zod";

// schema de un item
const orderItemSchema = z.object({
  productSku: z.string().min(1, "productSku is required"),
  quantity: z.number().int().positive("quantity must be a positive integer"),
});

// schema de un pedido
export const orderSchema = z.object({
  customer: z.string().min(1, "customer is required"),
  items: z.array(orderItemSchema).min(1, "at least one item is required"),
});