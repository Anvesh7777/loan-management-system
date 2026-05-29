import { Router } from "express";

import authenticate from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";
import upload from "../middleware/upload.middleware";

import { Role } from "../utils/constants";

import {
  uploadSalarySlip,
} from "../controllers/upload.controller";

const router = Router();

router.post(
  "/salary-slip",
  authenticate,
  authorize(Role.BORROWER),
  upload.single("file"),
  uploadSalarySlip
);

export default router;