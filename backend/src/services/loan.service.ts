export const calculateLoanDetails = (
  loanAmount: number,
  tenureDays: number,
  interestRate = 12
) => {
  const simpleInterest =
    (loanAmount *
      interestRate *
      tenureDays) /
    (365 * 100);

  const totalRepayment =
    loanAmount + simpleInterest;

  return {
    simpleInterest: Number(
      simpleInterest.toFixed(2)
    ),
    totalRepayment: Number(
      totalRepayment.toFixed(2)
    ),
  };
};