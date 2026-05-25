import { NextFunction, Request, Response } from "express";
import { sendMessageSchema } from "./message.validations";
import { sendMessageService } from "./message.service";

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
