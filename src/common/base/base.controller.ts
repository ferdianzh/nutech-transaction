// src/common/base.controller.ts

import { Response } from "express";

export abstract class BaseController {
  protected success<T>(res: Response, data: T, message = "Sukses") {
    return res.json({
      status: 0,
      message,
      data,
    });
  }
}
