import { Router } from "express";

import authenticate from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";

import { Role } from "../utils/constants";

import {
  getAdminStats,
} from "../controllers/admin.controller";

const router = Router();

router.use(
  authenticate,
  authorize(Role.ADMIN)
);

router.get(
  "/stats",
  getAdminStats
);

export default router;