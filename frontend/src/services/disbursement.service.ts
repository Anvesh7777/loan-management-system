import api from "@/lib/axios";

export const getSanctionedLoans =
  () =>
    api.get(
      "/disbursement/loans"
    );

export const disburseLoan = (
  loanId: string
) =>
  api.patch(
    `/disbursement/${loanId}/disburse`
  );