import { EmploymentMode } from "../utils/constants";

interface BREInput {
  dateOfBirth: Date;
  monthlySalary: number;
  pan: string;
  employmentMode: EmploymentMode;
}

interface BREResult {
  success: boolean;
  message?: string;
}

const calculateAge = (
  dateOfBirth: Date
): number => {
  const today = new Date();

  let age =
    today.getFullYear() -
    dateOfBirth.getFullYear();

  const monthDifference =
    today.getMonth() -
    dateOfBirth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() <
        dateOfBirth.getDate())
  ) {
    age--;
  }

  return age;
};

export const runBRE = (
  data: BREInput
): BREResult => {
  const {
    dateOfBirth,
    monthlySalary,
    pan,
    employmentMode,
  } = data;

  const age = calculateAge(dateOfBirth);

  if (age < 23 || age > 50) {
    return {
      success: false,
      message:
        "Age must be between 23 and 50 years",
    };
  }

  if (monthlySalary < 25000) {
    return {
      success: false,
      message:
        "Monthly salary must be at least 25000",
    };
  }

  const panRegex =
    /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!panRegex.test(pan)) {
    return {
      success: false,
      message: "Invalid PAN format",
    };
  }

  if (
    employmentMode ===
    EmploymentMode.UNEMPLOYED
  ) {
    return {
      success: false,
      message:
        "Unemployed applicants are not eligible",
    };
  }

  return {
    success: true,
  };
};