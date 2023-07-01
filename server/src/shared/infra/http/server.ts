import "reflect-metadata";
import "dotenv/config";
import "../../container";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./routes";
import { AppError } from "../../errors/AppError";

import upload from "../../../config/upload";
const app = express();

app.use(express.json());

app.use("/static/files", express.static(`${upload.tmpFolder}`));

app.use(cors());
app.use(router);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error = ${err.message}`,
  });
});

app.listen(process.env.PORT || 3333, () =>
  console.log("Server ir running! 🔥")
);