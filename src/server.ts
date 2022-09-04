// import * as path from 'path';
import express, { Application } from "express";
import router from "./router/router";

// @ts-ignore
import front from "../build";
const app: Application = express();
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

app.use(express.json());
app.use("/api/", router);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Such path does not exists",
  });
});

export default app;
