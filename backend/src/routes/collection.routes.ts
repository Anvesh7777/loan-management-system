import { Router } from "express";

import authenticate from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";

import { Role } from "../utils/constants";

import {
  getDisbursedLoans,
  collectPayment,
} from "../controllers/collection.controller";

const router = Router();

router.use(
  authenticate,
  authorize(Role.COLLECTION, Role.ADMIN)
);

router.get(
  "/loans",
  getDisbursedLoans
);

router.post(
  "/:loanId/payment",
  collectPayment
);

export default router;