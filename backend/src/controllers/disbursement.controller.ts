import { Request, Response } from "express";

import Loan from "../models/Loan";

import { LoanStatus } from "../utils/constants";

export const getSanctionedLoans = async (
  req: Request,
  res: Response
) => {
  try {
    const loans = await Loan.find({
      status: LoanStatus.SANCTIONED,
    }).populate(
      "borrowerId",
      "fullName pan monthlySalary employmentMode"
    );

    return res.status(200).json({
      success: true,
      loans,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch loans",
    });
  }
};

export const disburseLoan = async (
  req: Request,
  res: Response
) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findById(
      loanId
    );

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }

    if (
      loan.status !==
      LoanStatus.SANCTIONED
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only sanctioned loans can be disbursed",
      });
    }

    loan.status =
      LoanStatus.DISBURSED;

    loan.disbursedAt =
      new Date();

    await loan.save();

    return res.status(200).json({
      success: true,
      message:
        "Loan disbursed successfully",
      loan,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to disburse loan",
    });
  }
};