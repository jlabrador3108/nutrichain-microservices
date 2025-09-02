import { Request, Response, NextFunction } from "express";
import { QueryFailedError } from "typeorm";

// Middleware de manejo de errores
export function allExceptionsHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status =
    err.status || (err instanceof QueryFailedError ? 400 : 500);

  // Normalizamos el mensaje para que siempre sea objeto
  const message =
    typeof err.message === "string" ? { message: err.message } : err.message;

  // Log en consola en rojo (como tu ejemplo de NestJS)
  const red = "\x1b[31m";
  const reset = "\x1b[0m";
  console.error(red + "Error: Unhandled exception:" + reset, {
    status,
    message: err.message,
    errors: err.errors || null,
  });

  res.status(status).json({
    success: false,
    statusCode: status,
    ...message,
    errors: err.errors || null,
  });
}
