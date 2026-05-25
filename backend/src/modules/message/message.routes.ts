import { Router } from "express";
import { sendMessageController } from "./message.controller";

const router = Router();

router.post("/", sendMessageController);

export default router;
