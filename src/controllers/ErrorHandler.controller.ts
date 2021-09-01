import { NextFunction, Response } from "express";
import { OpenApiRequest } from "express-openapi-validator/dist/framework/types";

const errorHandler = (
  err: any,
  _req: OpenApiRequest,
  res: Response,
  _next: NextFunction
) => {
  const status = err.status || 500;

  res.status(status).json({
    status,
    response: err.message || "An unknown error occurred",
  });
};

export default errorHandler;
