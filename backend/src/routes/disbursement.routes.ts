import { Router } from "express";

import authenticate from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";

import { Role } from "../utils/constants";

import {
  getSanctionedLoans,
  disburseLoan,
} from "../controllers/disbursement.controller";

const router = Router();

router.use(
  authenticate,
  authorize(Role.DISBURSEMENT, Role.ADMIN)
);

router.get(
  "/loans",
  getSanctionedLoans
);

router.patch(
  "/:loanId/disburse",
  disburseLoan
);

export default router;