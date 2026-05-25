import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";

import authRoutes from "../../modules/auth/auth.routes";
import conversationRoutes from "../../modules/conversation/conversation.routes";
import messageRoutes from "../../modules/message/message.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

router.use("/auth", authRoutes);
router.use("/conversations", authenticate, conversationRoutes);
router.use("/messages", authenticate, messageRoutes);

export default router;
