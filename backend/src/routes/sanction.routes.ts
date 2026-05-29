import { Router } from "express";

import authenticate from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";

import { Role } from "../utils/constants";

import {
  getPendingLoans,
  approveLoan,
  rejectLoan,
} from "../controllers/sanction.controller";

const router = Router();

router.use(
  authenticate,
  authorize(Role.SANCTION)
);

router.get(
  "/loans",
  getPendingLoans
);

router.patch(
  "/:loanId/approve",
  approveLoan
);

router.patch(
  "/:loanId/reject",
  rejectLoan
);

export default router;