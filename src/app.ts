import express from "express";
import config from "./config/config";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`);
});
