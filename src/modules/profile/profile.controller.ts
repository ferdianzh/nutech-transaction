import { BaseController } from "../../common/base/base.controller";
import { ProfileService } from "./profile.service";
import { NextFunction, Request, Response } from "express";

export class ProfileController extends BaseController {
  constructor(private profileService = new ProfileService()) {
    super();
    this.findOne = this.findOne.bind(this);
    this.update = this.update.bind(this);
    this.image = this.image.bind(this);
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const result = await this.profileService.findOne(user.email);
      return this.success(res, result);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const body = req.body;
      const result = await this.profileService.update(user.email, body);
      return this.success(res, result, "Update Pofile berhasil");
    } catch (err) {
      next(err);
    }
  }

  async image(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const file = req.file;
      const result = await this.profileService.updateImage(user.email, file);
      return this.success(res, result, "Update Profile Image berhasil");
    } catch (err) {
      next(err);
    }
  }
}
