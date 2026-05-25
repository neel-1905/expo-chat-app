import { Router } from "express";
import {
  getConversationMessagesController,
  sendMessageController,
} from "./message.controller";

const router = Router();

router.post("/", sendMessageController);
router.get("/:conversationId", getConversationMessagesController);

export default router;
