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

    const loanBorrowerIds =
      await Loan.distinct(
        "borrowerId"
      );

    const loanBorrowerIdSet =
      new Set(
        loanBorrowerIds.map((id) =>
          id.toString()
        )
      );

    const leads = profiles.filter(
      (profile) =>
        !loanBorrowerIdSet.has(
          profile._id.toString()
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