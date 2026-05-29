import { Router, Response } from "express";
import authenticate, {
  AuthRequest,
} from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/profile",
  authenticate,
  (req: AuthRequest, res: Response) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

export default router;