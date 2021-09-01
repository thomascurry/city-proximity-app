import express, { Application } from "express";
import openapiValidator from "./bootstrap/openapi-validator";
import errorHandler from "./controllers/ErrorHandler.controller";

const app: Application = express();

openapiValidator(app);
app.use(errorHandler);

export default app;
