import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-errors";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500; // Se o status code for null or undefined, ele vai colocar o valor 500
  const message = error.statusCode ? error.message : "Internal Server Error";
  return res.status(statusCode).json({ message });
};
