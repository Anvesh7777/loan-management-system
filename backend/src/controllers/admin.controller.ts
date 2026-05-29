import { Request, Response } from "express";

import Loan from "../models/Loan";
import Payment from "../models/Payment";

import { LoanStatus } from "../utils/constants";

export const getAdminStats = async (
  req: Request,
  res: Response
) => {
  try {
    const [
      totalLoans,
      pendingLoans,
      sanctionedLoans,
      disbursedLoans,
      closedLoans,
      payments,
    ] = await Promise.all([
      Loan.countDocuments(),

      Loan.countDocuments({
        status: LoanStatus.PENDING,
      }),

      Loan.countDocuments({
        status: LoanStatus.SANCTIONED,
      }),

      Loan.countDocuments({
        status: LoanStatus.DISBURSED,
      }),

      Loan.countDocuments({
        status: LoanStatus.CLOSED,
      }),

      Payment.find(),
    ]);

    const totalCollectionAmount =
      payments.reduce(
        (sum, payment) =>
          sum + payment.amount,
        0
      );

    return res.status(200).json({
      success: true,

      stats: {
        totalLoans,

        pendingLoans,

        sanctionedLoans,

        disbursedLoans,

        closedLoans,

        totalCollectionAmount,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch dashboard stats",
    });
  }
};