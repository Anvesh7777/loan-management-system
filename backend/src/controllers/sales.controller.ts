import { Request, Response } from "express";

import BorrowerProfile from "../models/BorrowerProfile";
import Loan from "../models/Loan";

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const profiles =
      await BorrowerProfile.find();

    const leads =
      await Promise.all(
        profiles.map(
          async (profile) => {
            const latestLoan =
              await Loan.findOne({
                borrowerId:
                  profile._id,
              }).sort({
                createdAt: -1,
              });

            return {
              ...profile.toObject(),

              loanStatus:
                latestLoan?.status ||
                "NO_APPLICATION",

              loanAmount:
                latestLoan
                  ?.loanAmount ||
                null,

              tenureDays:
                latestLoan
                  ?.tenureDays ||
                null,

              totalRepayment:
                latestLoan
                  ?.totalRepayment ||
                null,

              amountPaid:
                latestLoan
                  ?.amountPaid ||
                0,
            };
          }
        )
      );

    return res.status(200).json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch leads",
    });
  }
};