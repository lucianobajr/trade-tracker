import "reflect-metadata";
import "dotenv/config";
import "../../container";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./routes";
import { AppError } from "../../errors/AppError";

import upload from "../../../config/upload";
//import i18n from "../../../i18n/i18n";
//import i18nMiddleware from "./middlewares/i18n.middleware";

const app = express();

app.use(express.json());

//app.use(i18nMiddleware);
//app.use(i18n.init); // Middleware de inicialização do i18n


app.use("/static/files", express.static(`${upload.tmpFolder}`));

app.use(cors());
app.use(router);

/*
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    const errorMessage = i18n.t(err.message); // Traduz a mensagem de erro usando o i18n

    return res.status(err.statusCode).json({
      status: "error",
      message: errorMessage,
    });
  }

  const internalErrorMessage = i18n.t('internalServerError'); // Traduz a mensagem de erro interno

  return res.status(500).json({
    status: "error",
    message: internalErrorMessage,
  });
});
*/

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
