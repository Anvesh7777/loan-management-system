import { z } from "zod";

export const borrowerProfileSchema =
  z.object({
    fullName: z.string().min(2),

    pan: z
      .string()
      .min(10)
      .max(10),

    dateOfBirth: z.string(),

    monthlySalary: z.coerce
      .number()
      .min(25000),

    employmentMode: z.enum([
      "SALARIED",
      "SELF_EMPLOYED",
      "UNEMPLOYED",
    ]),
  });

export type BorrowerProfileFormData =
  z.infer<
    typeof borrowerProfileSchema
  >;