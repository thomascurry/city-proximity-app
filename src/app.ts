import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (_req: Request, res: Response) => {
  return res.status(200).send("Hello");
});

export default app;
