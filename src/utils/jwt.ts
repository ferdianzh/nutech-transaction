import { sign, verify } from "jsonwebtoken";
import config from "../config/config";

export interface JwtPayload {
  profile_id: number;
  email: string;
}

export function signToken(payload: JwtPayload) {
  return sign(payload, config.jwtSecret, { expiresIn: "12h" });
}

export function verifyToken(token: string) {
  return verify(token, config.jwtSecret) as JwtPayload;
}
