import { Router } from "express";

import authenticate from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";

import { Role } from "../utils/constants";

import {
  createBorrowerProfile,
  getBorrowerDashboard,
} from "../controllers/borrower.controller";

const router = Router();

router.post(
  "/profile",
  authenticate,
  authorize(Role.BORROWER),
  createBorrowerProfile
);

router.get(
  "/dashboard",
  authenticate,
  authorize(Role.BORROWER),
  getBorrowerDashboard
);

export default router;