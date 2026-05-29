import { Router } from "express";

import authenticate from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";

import { Role } from "../utils/constants";

import {
  getAdminStats,
} from "../controllers/admin.controller";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorize(Role.ADMIN),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

router.get(
  "/stats",
  authenticate,
  authorize(Role.ADMIN),
  getAdminStats
);

export default router;