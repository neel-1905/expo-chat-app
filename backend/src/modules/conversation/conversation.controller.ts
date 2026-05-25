import { NextFunction, Request, Response } from "express";
import { createConversationSchema } from "./conversation.validations";
import {
  createConversationService,
  getUserConversationsService,
} from "./conversation.service";

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

export async function getUserConversationsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const conversations = await getUserConversationsService(req.user!.id);
    return res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    next(error);
  }
}
