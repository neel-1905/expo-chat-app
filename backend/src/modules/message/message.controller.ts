import { NextFunction, Request, Response } from "express";
import { sendMessageSchema } from "./message.validations";
import { getConversationMessages, sendMessageService } from "./message.service";

export async function sendMessageController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = sendMessageSchema.parse(req.body);

    const message = await sendMessageService(req.user!.id, validatedData);

    return res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
}

export async function getConversationMessagesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { conversationId } = req.params;
    const { cursor } = req.query;
    const messages = await getConversationMessages(
      req.user!.id,
      conversationId as string,
      cursor as string | undefined,
    );

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
}
