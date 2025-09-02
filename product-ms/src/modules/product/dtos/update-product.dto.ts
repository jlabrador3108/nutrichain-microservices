import { CreateProductSchema } from "./create-product.dto";
import { z } from "zod";

export const UpdateProductSchema = CreateProductSchema.partial().refine(
  (data) => Object.keys(data).length > 0,  // 👈 debe haber al menos una propiedad
  {
    message: "You must submit at least one field to update",
    path: [], // se aplica al objeto completo, no a un campo en particular
  }
);
export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
