import { Router } from "express";

import authenticate from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";

import { Role } from "../utils/constants";

import {
  applyLoan,
  getMyLoans,
  getMyLoanById,
  getLoanPayments,
} from "../controllers/loan.controller";

const router = Router();

router.post(
  "/apply",
  authenticate,
  authorize(Role.BORROWER),
  applyLoan
);

router.get(
  "/my-loans",
  authenticate,
  authorize(Role.BORROWER),
  getMyLoans
);

router.get(
  "/my-loans/:loanId",
  authenticate,
  authorize(Role.BORROWER),
  getMyLoanById
);

router.get(
  "/my-loans/:loanId/payments",
  authenticate,
  authorize(Role.BORROWER),
  getLoanPayments
);

export default router;