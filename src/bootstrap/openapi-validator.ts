import { Application } from "express";
import * as OpenApiValidator from "express-openapi-validator";
import path from "path";

export default (app: Application) => {
  app.use(
    OpenApiValidator.middleware({
      apiSpec: path.join(__dirname, "..", "..", "docs", "swagger.yaml"),
      validateRequests: true,
      validateResponses: true,
      operationHandlers: path.join(__dirname, "..", "controllers"),
    })
  );
};
