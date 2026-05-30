import { z } from "zod";
import { EmploymentMode } from "../utils/constants";

export const borrowerProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(
      2,
      "Full name must be at least 2 characters"
    )
    .max(
      100,
      "Full name is too long"
    ),

  pan: z
    .string()
    .trim()
    .transform((val) => val.toUpperCase())
    .refine(
      (val) =>
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(val),
      {
        message: "Invalid PAN format",
      }
    ),

  dateOfBirth: z
    .string()
    .refine(
      (value) =>
        !isNaN(
          new Date(value).getTime()
        ),
      {
        message:
          "Invalid date of birth",
      }
    ),

  monthlySalary: z
    .number()
    .positive(
      "Monthly salary must be greater than 0"
    ),

  employmentMode: z.enum([
    EmploymentMode.SALARIED,
    EmploymentMode.SELF_EMPLOYED,
    EmploymentMode.UNEMPLOYED,
  ]),
});