import { Router } from "express";

import authenticate from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";

import { Role } from "../utils/constants";

import {
  getLeads,
} from "../controllers/sales.controller";

const router = Router();

router.get(
  "/leads",
  authenticate,
  authorize(Role.SALES),
  getLeads
);

export default router;