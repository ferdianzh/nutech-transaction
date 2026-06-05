import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { BaseController } from "../../common/base/base.controller";

export class AuthController extends BaseController {
  constructor(private authService = new AuthService()) {
    super();
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const result = await this.authService.login(payload);
      return this.success(res, result);
    } catch (err) {
      next(err);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const result = await this.authService.register(payload);
      return this.success(res, result);
    } catch (err) {
      next(err);
    }
  }
}
