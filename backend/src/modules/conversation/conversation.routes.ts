import { Router } from "express";
import {
  createConversationController,
  getUserConversationsController,
} from "./conversation.controller";
const router = Router();

router.get("/", getUserConversationsController);
router.post("/", createConversationController);

export default router;
