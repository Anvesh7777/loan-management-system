import { Response } from "express";

import BorrowerProfile from "../models/BorrowerProfile";
import { borrowerProfileSchema } from "../validators/borrower.validator";
import { runBRE } from "../services/bre.service";
import { AuthRequest } from "../middleware/auth.middleware";
import Loan from "../models/Loan";
import { LoanStatus } from "../utils/constants";

export const createBorrowerProfile = async (
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

    const userId = req.user.userId;

    const existingProfile =
      await BorrowerProfile.findOne({
        userId,
      });

    if (existingProfile) {
      return res.status(409).json({
        success: false,
        message: "Profile already exists",
      });
    }

    const validatedData =
      borrowerProfileSchema.parse(req.body);

    const breResult = runBRE({
      dateOfBirth: new Date(
        validatedData.dateOfBirth
      ),
      monthlySalary:
        validatedData.monthlySalary,
      pan: validatedData.pan,
      employmentMode:
        validatedData.employmentMode,
    });

    if (!breResult.success) {
      return res.status(400).json({
        success: false,
        message: breResult.message,
      });
    }

    const profile =
      await BorrowerProfile.create({
        userId,
        fullName: validatedData.fullName,
        pan: validatedData.pan,
        dateOfBirth: validatedData.dateOfBirth,
        monthlySalary:
          validatedData.monthlySalary,
        employmentMode:
          validatedData.employmentMode,
      });

    return res.status(201).json({
      success: true,
      message:
        "Borrower profile created successfully",
      profile,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBorrowerDashboard =
  async (
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

      const profile =
        await BorrowerProfile.findOne({
          userId: req.user.userId,
        });

      if (!profile) {
        return res.status(200).json({
          success: true,
          dashboard: {
            profileCompleted: false,
            salarySlipUploaded: false,
            totalLoans: 0,
            activeLoans: 0,
            latestLoan: null,
          },
        });
      }

      const loans = await Loan.find({
        borrowerId: profile._id,
      }).sort({
        createdAt: -1,
      });

      const activeLoans =
        loans.filter(
          (loan) =>
            loan.status !==
            LoanStatus.CLOSED
        ).length;

      return res.status(200).json({
        success: true,
        dashboard: {
          profileCompleted: true,
          salarySlipUploaded:
            !!profile.salarySlipUrl,

          totalLoans: loans.length,

          activeLoans,

          latestLoan:
            loans.length > 0
              ? loans[0]
              : null,
        },
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to fetch dashboard",
      });
    }
  };