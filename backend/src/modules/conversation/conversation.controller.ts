import { NextFunction, Request, Response } from "express";
import { createConversationSchema } from "./conversation.validations";
import { createConversationService } from "./conversation.service";

export async function createConversationController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = createConversationSchema.parse(req.body);
    const conversation = await createConversationService(
      req.user!.id,
      validatedData,
    );
    return res.status(201).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    next(error);
  }
}
