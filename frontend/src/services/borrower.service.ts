import api from "@/lib/axios";

export const getBorrowerDashboard =
  () => api.get("/borrower/dashboard");

export const createBorrowerProfile = (
  data: {
    fullName: string;
    pan: string;
    dateOfBirth: string;
    monthlySalary: number;
    employmentMode: string;
  }
) =>
  api.post(
    "/borrower/profile",
    data
  );

export const uploadSalarySlip = (
  formData: FormData
) =>
  api.post(
    "/upload/salary-slip",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );