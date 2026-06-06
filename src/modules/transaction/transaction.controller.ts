import { NextFunction, Request, Response } from "express";
import { BaseController } from "../../common/base/base.controller";
import { TransactionService } from "./transaction.service";

export class TransactionController extends BaseController {
  constructor(private transactionService = new TransactionService()) {
    super();
    this.balance = this.balance.bind(this);
    this.topup = this.topup.bind(this);
    this.create = this.create.bind(this);
    this.history = this.history.bind(this);
  }

  async balance(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const result = await this.transactionService.balance(user.profile_id);
      return this.success(res, result);
    } catch (err) {
      next(err);
    }
  }

  async topup(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const body = req.body;
      const result = await this.transactionService.topup(user.profile_id, body);
      return this.success(res, result, "Top Up Balance berhasil");
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const body = req.body;
      const result = await this.transactionService.create(
        user.profile_id,
        body,
      );
      return this.success(res, result, "Transaksi berhasil");
    } catch (err) {
      next(err);
    }
  }

  async history(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user!;
      const query = req.query;
      const result = await this.transactionService.history(
        user.profile_id,
        query,
      );
      return this.success(res, result, "Get History Berhasil");
    } catch (err) {
      next(err);
    }
  }
}
