import { z } from "zod";

export const loanApplicationSchema = z.object({
  loanAmount: z
    .number()
    .int("Loan amount must be a whole number")
    .min(
      50000,
      "Minimum loan amount is 50000"
    )
    .max(
      500000,
      "Maximum loan amount is 500000"
    ),

  tenureDays: z
    .number()
    .int("Tenure must be a whole number")
    .min(
      30,
      "Minimum tenure is 30 days"
    )
    .max(
      365,
      "Maximum tenure is 365 days"
    ),
});