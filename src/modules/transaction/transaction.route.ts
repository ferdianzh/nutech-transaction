import { Router } from "express";
import { TransactionController } from "./transaction.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validation.middleware";
import {
  CreateTransactionSchema,
  TopupTransactionSchema,
} from "./transaction.types";

export const TransactionRouter = Router();
const transactionController = new TransactionController();

TransactionRouter.get(
  "/balance",
  authMiddleware,
  transactionController.balance,
);
TransactionRouter.post(
  "/topup",
  authMiddleware,
  validate(TopupTransactionSchema),
  transactionController.topup,
);
TransactionRouter.post(
  "/transaction",
  authMiddleware,
  validate(CreateTransactionSchema),
  transactionController.create,
);
TransactionRouter.get(
  "/transaction/history",
  authMiddleware,
  transactionController.history,
);
