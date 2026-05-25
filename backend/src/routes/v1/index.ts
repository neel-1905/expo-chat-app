import { Router } from "express";
import authRoutes from "../../modules/auth/auth.routes";
import conversationRoutes from "../../modules/conversation/conversation.routes";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

router.use("/auth", authRoutes);
router.use("/conversations", authenticate, conversationRoutes);

export default router;
