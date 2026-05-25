import { NextFunction, Request, Response } from "express";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "./auth.validations";
import {
  loginService,
  refreshAccessTokenService,
  registerService,
} from "./auth.service";

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

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = loginSchema.parse(req.body);

    const data = await loginService(validatedData);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function refreshController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validatedData = refreshTokenSchema.parse(req.body);

    const data = await refreshAccessTokenService(validatedData.refreshToken);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}
