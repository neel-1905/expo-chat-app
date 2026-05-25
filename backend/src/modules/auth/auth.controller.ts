import { NextFunction, Request, Response } from "express";
import { registerSchema } from "./auth.validations";
import { registerService } from "./auth.service";

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = registerSchema.parse(req.body);

    const user = await registerService(validatedData);

    return res.status(201).json({
      success: true,
      data: user,
      message: "User created",
    });
  } catch (error) {
    next(error);
  }
}
