import z from "zod";
import { Profile } from "../profile/profile.types";
import { Service } from "../information/information.types";

export interface Transaction {
  id: number;
  invoice_number: string;
  transaction_type: "TOPUP" | "PAYMENT";
  description: string;
  total_amount: number;
  balance: number;
  created_on: Date;
  profile_id: number;
  profile: Profile;
}

export interface ServiceSnapshot extends Service {
  transaction_id: number;
  service_id: number;
  transaction: Transaction;
  service: Service;
}

const top_up_amount_message =
  "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0";
export const TopupTransactionSchema = z.object({
  top_up_amount: z.number(top_up_amount_message).min(1, top_up_amount_message),
});

export type TopupTransactionDto = z.infer<typeof TopupTransactionSchema>;

export const CreateTransactionSchema = z.object({
  service_code: z.string("Paramter service_code tidak sesuai format"),
  description: z.string().optional(),
});

export type CreateTransactionDto = z.infer<typeof CreateTransactionSchema>;
