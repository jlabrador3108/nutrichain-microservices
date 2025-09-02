import { z } from "zod";

export const FindElsProductSchema = z.object({
  name: z.string().optional(),
  categoryFoodId: z.coerce.number().int().positive().optional()
}).refine(
  (data) => Object.keys(data).length > 0,  // 👈 debe haber al menos una propiedad
  {
    message: "You must submit at least one field to find",
    path: [], // se aplica al objeto completo, no a un campo en particular
  }
);

export type FindElsProductQuery = z.infer<typeof FindElsProductSchema>;
