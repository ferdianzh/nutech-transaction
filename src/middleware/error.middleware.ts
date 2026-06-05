import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AuthError } from "../common/errors/auth.error";

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
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 102,
      message: err.issues.map((el) => el.message),
      data: null,
    });
  }

  if (err.code === "ER_DUP_ENTRY") {
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
