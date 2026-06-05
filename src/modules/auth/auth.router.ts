import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../middleware/validation.middleware";
import { LoginSchema, RegisterSchema } from "./auth.types";

export const AuthRouter = Router();
const authController = new AuthController();

AuthRouter.post("/register", validate(RegisterSchema), authController.register);
AuthRouter.post("/login", validate(LoginSchema), authController.login);
