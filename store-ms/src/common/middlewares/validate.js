import { ZodError } from "zod";
import { ResponseHandler } from "../utils/response-handler.js";

//property: "body" | "query" | "params"
export const validate =
  (schema, property = "body") =>
  (req, res, next) => {
    try {
      const result = schema.parse(req[property]);
      req.validated = {
        ...req.validated,
        [property]: result,
      };
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(ResponseHandler.error({
          message: "Validation failed",
          statusCode: 400,
          errors: err.issues.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        }))
      }
      const message =
        err instanceof Error ? err.message : "Internal server error";
      console.error("Validation error:", message);
      return next(ResponseHandler.error({ message, statusCode: 500 }));
    }
  };
