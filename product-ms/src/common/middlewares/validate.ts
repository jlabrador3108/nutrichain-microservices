import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ResponseHandler } from "../utils/response-handler";

export const validate =
  (schema: ZodSchema, property: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse(req[property]);
      (req as any).validated = {
        ...(req as any).validated,
        [property]: result,
      };
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json(
          ResponseHandler.error({
            message: "Validation failed",
            statusCode: 400,
            errors: err.issues.map((e) => ({
              path: e.path.join("."),
              message: e.message,
            })),
          })
        );
      }
      const message =
        err instanceof Error ? err.message : "Internal server error";
      console.error("Validation error:", message);
      return res
        .status(500)
        .json(ResponseHandler.error({ message, statusCode: 500 }));
    }
  };
