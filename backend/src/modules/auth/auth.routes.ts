import { Router } from "express";
import {
  loginController,
  registerController,
  refreshController,
  meController,
  logoutController,
} from "./auth.controller";
import { authenticate } from "../../middleware/auth.middleware";
const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh", refreshController);
router.get("/me", authenticate, meController);
router.post("/logout", logoutController);

export default router;
