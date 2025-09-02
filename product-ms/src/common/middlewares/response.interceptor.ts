import { ResponseHandler } from "../utils/response-handler";
import { Request, Response, NextFunction } from "express";

export function responseInterceptor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const oldJson = res.json;

  res.json = function (data: any) {
    if (data && typeof data === "object" && (data.success || data.statusCode)) {
      return oldJson.call(this, data);
    }

    return oldJson.call(
      this,
      ResponseHandler.ok({message: "Request successful", ...data})
    );
  };

  next();
}
