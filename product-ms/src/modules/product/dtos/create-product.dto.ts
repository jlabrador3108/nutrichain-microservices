import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(3, "The name must have at least 3 characters"),
  description: z.string().min(3, "The description must have at least 3 characters"),
  sku: z.string().nonempty("sku is required"),
  weight: z.number().positive("The weight must be a positive number"),
  imageUrl: z.string().url("The imageUrl must be a valid URL"),
  unitMeasurementId: z.int().positive("unitMeasurementId is required"),
  categoryFoodId: z.int().positive("categoryFoodId is required"),
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;
