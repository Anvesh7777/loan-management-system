import { z } from "zod";

export const paymentSchema = z.object({
  amount: z
    .number({
      error: "Amount is required",
    })
    .positive(
      "Amount must be greater than 0"
    ),

  utrNumber: z
    .string({
      error: "UTR number is required",
    })
    .trim()
    .min(
      3,
      "UTR number must be at least 3 characters"
    )
    .max(
      100,
      "UTR number is too long"
    ),

  paymentDate: z.coerce.date({
    error: "Valid payment date is required",
  }),
});