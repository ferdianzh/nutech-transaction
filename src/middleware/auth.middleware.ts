import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { AuthError } from "../common/errors/auth.error";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new AuthError("Token tidak valid atau tidak tersedia"));
  }

  if (!authorization.startsWith("Bearer ")) {
    return next(new AuthError("Token tidak valid atau tidak tersedia"));
  }

  try {
    const token = authorization.substring(7);

    const payload = verifyToken(token);

    req.user = payload;

    next();
  } catch {
    next(new AuthError("Token tidak valid atau kadaluarsa"));
  }
};
