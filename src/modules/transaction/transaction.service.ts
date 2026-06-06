import { BadRequestError } from "../../common/errors/bad-request.error";
import { NotFoundError } from "../../common/errors/not-found.error";
import { formatDate } from "../../utils/formatter";
import { InformationRepository } from "../information/information.repository";
import { TransactionRepository } from "./transaction.repository";
import {
  CreateTransactionDto,
  TopupTransactionDto,
  Transaction,
} from "./transaction.types";

export class TransactionService {
  constructor(
    private transactionRepository = new TransactionRepository(),
    private informationRepository = new InformationRepository(),
  ) {}

  async balance(profile_id: number) {
    const latest = await this.transactionRepository.findLatest(profile_id);
    return { balance: latest?.balance ? Number(latest.balance) : 0 };
  }

  async topup(profile_id: number, topupDto: TopupTransactionDto) {
    const { top_up_amount } = topupDto;
    const { balance } = await this.balance(profile_id);
    const newBalance = balance + top_up_amount;
    const invoice_number = await this.generateInvoiceNumber();

    const payload: Partial<Transaction> = {
      invoice_number,
      transaction_type: "TOPUP",
      description: "Top Up balance",
      total_amount: top_up_amount,
      balance: newBalance,
      profile_id,
    };

    await this.transactionRepository.create(payload);
    return { balance: newBalance };
  }

  async create(profile_id: number, createDto: CreateTransactionDto) {
    const { service_code, description } = createDto;
    const [service, { balance }] = await Promise.all([
      this.informationRepository.findServiceByCode(service_code),
      this.balance(profile_id),
    ]);

    if (!service) {
      throw new NotFoundError("Service atau Layanan tidak ditemukan");
    }
    const newBalance = balance - Number(service.service_tariff);
    if (newBalance < 0) {
      throw new BadRequestError("Saldo tidak mencukupi");
    }

    const invoice_number = await this.generateInvoiceNumber();

    const transactionId = await this.transactionRepository.create({
      invoice_number,
      transaction_type: "PAYMENT",
      description: description ?? `Payment ${service.service_name}`,
      total_amount: service.service_tariff,
      balance: newBalance,
      profile_id,
    });

    const newTransaction =
      await this.transactionRepository.findOne(transactionId);

    const snapshot = await this.transactionRepository.snapshot({
      transaction_id: transactionId,
      service_id: service.id,
      service_code: service.service_code,
      service_name: service.service_name,
      service_icon: service.service_icon,
      service_tariff: service.service_tariff,
    });

    return {
      invoice_number: newTransaction.invoice_number,
      service_code: service.service_code,
      service_name: service.service_name,
      transaction_type: newTransaction.transaction_type,
      total_amount: Number(newTransaction.total_amount),
      created_on: newTransaction.created_on,
    };
  }

  async history(profile_id: number, { offset = undefined, limit = undefined }) {
    return await this.transactionRepository.findAll({
      profile_id,
      offset,
      limit,
    });
  }

  private async generateInvoiceNumber() {
    const count = await this.transactionRepository.countTodayTransaction();
    return `${formatDate(new Date())}-${String(count + 1).padStart(3, "0")}`;
  }
}
