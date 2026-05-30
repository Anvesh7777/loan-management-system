import { Request, Response } from "express";

import Loan from "../models/Loan";
import Payment from "../models/Payment";

import { LoanStatus } from "../utils/constants";

import { paymentSchema } from "../validators/payment.validator";

export const getDisbursedLoans = async (
  req: Request,
  res: Response
) => {
  try {
    const loans = await Loan.find({
      status: LoanStatus.DISBURSED,
    }).populate(
      "borrowerId",
      "fullName pan monthlySalary"
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

export const collectPayment = async (
  req: Request,
  res: Response
) => {
  try {
    const { loanId } = req.params;

    const validationResult =
      paymentSchema.safeParse(
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
      amount,
      utrNumber,
      paymentDate,
    } = validationResult.data;

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
      LoanStatus.DISBURSED
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Payments can only be collected for disbursed loans",
      });
    }

    const existingPayment =
      await Payment.findOne({
        utrNumber,
      });

    if (existingPayment) {
      return res.status(409).json({
        success: false,
        message:
          "UTR number already exists",
      });
    }

    const outstandingAmount =
      loan.totalRepayment -
      loan.amountPaid;

    if (amount > outstandingAmount) {
      return res.status(400).json({
        success: false,
        message:
          "Payment exceeds outstanding amount",
      });
    }

    const payment =
      await Payment.create({
        loanId: loan._id,
        amount,
        utrNumber,
        paymentDate,
      });

    loan.amountPaid += amount;

    const remainingAmount =
      loan.totalRepayment -
      loan.amountPaid;

    if (remainingAmount <= 0) {
      loan.status =
        LoanStatus.CLOSED;

      loan.closedAt =
        new Date();
    }

    await loan.save();

    return res.status(201).json({
      success: true,
      message:
        "Payment collected successfully",
      payment,
      remainingAmount,
      loanStatus:
        loan.status,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to collect payment",
    });
  }
};