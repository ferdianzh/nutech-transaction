import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { ZodError } from "zod";
import { AuthError } from "../common/errors/auth.error";
import { NotFoundError } from "../common/errors/not-found.error";
import { BadRequestError } from "../common/errors/bad-request.error";

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AuthError) {
    return res.status(401).json({
      status: 108,
      message: err.message ?? "Token tidak tidak valid atau kadaluwarsa",
      data: null,
    });
  } else if (err instanceof ZodError) {
    return res.status(400).json({
      status: 102,
      message: err.issues.map((el) => el.message),
      data: null,
    });
  } else if (err instanceof NotFoundError || err instanceof BadRequestError) {
    return res.status(400).json({
      status: 102,
      message: err.message,
      data: null,
    });
  } else if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "Ukuran file melebihi batas maksimal"
        : err.message;
    return res.status(400).json({ status: 102, message, data: null });
  } else if (err.code === "ER_DUP_ENTRY") {
    const keyMatch = err.sqlMessage.match(/key '([^']+)'/);
    const keyName = keyMatch?.[1];
    return res.status(400).json({
      status: 102,
      message: `Nilai parameter ${keyName} sudah terdaftar`,
      data: null,
    });
  }

  console.error(err);
  return res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    data: null,
  });
}
