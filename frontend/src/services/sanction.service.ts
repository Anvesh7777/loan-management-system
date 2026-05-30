import api from "@/lib/axios";

export const getPendingLoans = () =>
  api.get("/sanction/loans");

export const approveLoan = (
  loanId: string
) =>
  api.patch(
    `/sanction/${loanId}/approve`
  );

export const rejectLoan = (
  loanId: string,
  reason: string
) =>
  api.patch(
    `/sanction/${loanId}/reject`,
    { reason }
  );