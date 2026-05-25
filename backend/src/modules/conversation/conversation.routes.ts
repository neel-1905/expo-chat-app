import { Router } from "express";
import { createConversationController } from "./conversation.controller";
const router = Router();

router.post("/", createConversationController);

export default router;
