import { Request, Response } from "express";

import Loan from "../models/Loan";

import { LoanStatus } from "../utils/constants";

export const getPendingLoans = async (
  req: Request,
  res: Response
) => {
  try {
    const loans = await Loan.find({
      status: LoanStatus.PENDING,
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

export const approveLoan = async (
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
      loan.status !== LoanStatus.PENDING
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only pending loans can be approved",
      });
    }

    loan.status =
      LoanStatus.SANCTIONED;

    loan.sanctionedAt =
      new Date();

    await loan.save();

    return res.status(200).json({
      success: true,
      message:
        "Loan sanctioned successfully",
      loan,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to sanction loan",
    });
  }
};

export const rejectLoan = async (
  req: Request,
  res: Response
) => {
  try {
    const { loanId } = req.params;

    const { reason } = req.body;

    if (!reason?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "Rejection reason is required",
      });
    }

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
      loan.status !== LoanStatus.PENDING
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Only pending loans can be rejected",
      });
    }

    loan.status =
      LoanStatus.REJECTED;

    loan.rejectionReason =
      reason.trim();

    await loan.save();

    return res.status(200).json({
      success: true,
      message:
        "Loan rejected successfully",
      loan,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to reject loan",
    });
  }
};