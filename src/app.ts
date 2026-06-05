import express, { NextFunction, Request, Response } from "express";
import config from "./config/config";
import { AuthRouter } from "./modules/auth/auth.router";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(express.json());

app.use("/", AuthRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorMiddleware);

app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});
