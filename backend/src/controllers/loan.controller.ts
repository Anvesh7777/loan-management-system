import { Response } from "express";

import Loan from "../models/Loan";
import BorrowerProfile from "../models/BorrowerProfile";

import { AuthRequest } from "../middleware/auth.middleware";

import { LoanStatus } from "../utils/constants";

import { loanApplicationSchema } from "../validators/loan.validator";
import { calculateLoanDetails } from "../services/loan.service";
import Payment from "../models/Payment";

export const applyLoan = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const borrowerProfile =
      await BorrowerProfile.findOne({
        userId: req.user.userId,
      });

    if (!borrowerProfile) {
      return res.status(404).json({
        success: false,
        message: "Borrower profile not found",
      });
    }

    if (!borrowerProfile.salarySlipUrl) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload salary slip before applying",
      });
    }

    const existingPendingLoan =
      await Loan.findOne({
        borrowerId: borrowerProfile._id,
        status: LoanStatus.PENDING,
      });

    if (existingPendingLoan) {
      return res.status(409).json({
        success: false,
        message:
          "You already have a pending loan application",
      });
    }

    const validationResult =
      loanApplicationSchema.safeParse(
        req.body
      );

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors:
          validationResult.error.flatten(),
      });
    }

    const {
      loanAmount,
      tenureDays,
    } = validationResult.data;

    const {
      simpleInterest,
      totalRepayment,
    } = calculateLoanDetails(
      loanAmount,
      tenureDays,
      12
    );

    const loan = await Loan.create({
      borrowerId: borrowerProfile._id,

      loanAmount,
      tenureDays,

      interestRate: 12,

      simpleInterest,
      totalRepayment,

      amountPaid: 0,

      status: LoanStatus.PENDING,
    });

    return res.status(201).json({
      success: true,
      message:
        "Loan application submitted successfully",
      loan,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to apply for loan",
    });
  }
};

export const getMyLoans = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const borrowerProfile =
      await BorrowerProfile.findOne({
        userId: req.user.userId,
      });

    if (!borrowerProfile) {
      return res.status(404).json({
        success: false,
        message: "Borrower profile not found",
      });
    }

    const loans = await Loan.find({
      borrowerId: borrowerProfile._id,
    }).sort({
      createdAt: -1,
    });

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

export const getMyLoanById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const borrowerProfile =
      await BorrowerProfile.findOne({
        userId: req.user.userId,
      });

    if (!borrowerProfile) {
      return res.status(404).json({
        success: false,
        message: "Borrower profile not found",
      });
    }

    const loan = await Loan.findOne({
      _id: req.params.loanId,
      borrowerId: borrowerProfile._id,
    });

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }

    return res.status(200).json({
      success: true,
      loan,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch loan",
    });
  }
};

export const getLoanPayments = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const borrowerProfile =
      await BorrowerProfile.findOne({
        userId: req.user.userId,
      });

    if (!borrowerProfile) {
      return res.status(404).json({
        success: false,
        message: "Borrower profile not found",
      });
    }

    const loan = await Loan.findOne({
      _id: req.params.loanId,
      borrowerId: borrowerProfile._id,
    });

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: "Loan not found",
      });
    }

    const payments =
      await Payment.find({
        loanId: loan._id,
      }).sort({
        paymentDate: -1,
      });

    return res.status(200).json({
      success: true,

      outstandingAmount:
        loan.totalRepayment -
        loan.amountPaid,

      payments,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch payments",
    });
  }
};