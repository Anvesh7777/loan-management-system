import api from "@/lib/axios";

export const getDisbursedLoans =
  () =>
    api.get(
      "/collection/loans"
    );

export const collectPayment = (
  loanId: string,
  amount: number,
  utrNumber: string
) =>
  api.post(
    `/collection/${loanId}/payment`,
    {
      amount,
      utrNumber,
      paymentDate:
        new Date().toISOString(),
    }
  );