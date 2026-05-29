import { z } from "zod";

export const paymentSchema = z.object({
  amount: z
    .number()
    .positive(
      "Amount must be greater than 0"
    ),

  utrNumber: z
    .string()
    .trim()
    .min(3),
});