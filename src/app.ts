import express from "express";
import config from "./config/config";
import { AuthRouter } from "./modules/auth/auth.router";
import { errorMiddleware } from "./middleware/error.middleware";
import { ProfileRouter } from "./modules/profile/profile.router";
import { InformationRouter } from "./modules/information/information.router";

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/", AuthRouter);
app.use("/profile", ProfileRouter);
app.use("/", InformationRouter);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use(errorMiddleware);

app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});
