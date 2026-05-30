import api from "@/lib/axios";

export const applyLoan = (
  data: {
    loanAmount: number;
    tenureDays: number;
  }
) => api.post("/loans/apply", data);

export const getMyLoans = () =>
  api.get("/loans/my-loans");

export const getLoanById = (
  loanId: string
) =>
  api.get(
    `/loans/my-loans/${loanId}`
  );

export const getLoanPayments = (
  loanId: string
) =>
  api.get(
    `/loans/my-loans/${loanId}/payments`
  );