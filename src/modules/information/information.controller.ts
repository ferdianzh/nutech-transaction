import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../common/base/base.controller";
import { InformationService } from "./information.service";

export class InformationController extends BaseController {
  constructor(private informationService = new InformationService()) {
    super();
    this.findAllBanner = this.findAllBanner.bind(this);
    this.findAllService = this.findAllService.bind(this);
  }

  async findAllBanner(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const result = await this.informationService.findAllBanner();
      return this.success(res, result);
    } catch (err) {
      next(err);
    }
  }

  async findAllService(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const result = await this.informationService.findAllService();
      return this.success(res, result);
    } catch (err) {
      next(err);
    }
  }
}
