import { z } from "zod";
import { EmploymentMode } from "../utils/constants";

export const borrowerProfileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters"),

  pan: z
    .string()
    .transform((val) => val.toUpperCase()),

  dateOfBirth: z.string(),

  monthlySalary: z
    .number()
    .min(0),

  employmentMode: z.enum([
    EmploymentMode.SALARIED,
    EmploymentMode.SELF_EMPLOYED,
    EmploymentMode.UNEMPLOYED,
  ]),
});