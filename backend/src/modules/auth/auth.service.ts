import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { LoginInput, RegisterInput } from "./auth.validations";
import { AuthProvider } from "../../generated/prisma/enums";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";

export const registerService = async ({
  email,
  name,
  password,
}: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) throw new AppError("User already exists", 409);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.$transaction(async (tx) => {
    const createdUser = await tx.user.create({
      data: {
        email,
        name,
      },
    });

    await tx.authAccount.create({
      data: {
        userId: createdUser.id,
        provider: "EMAIL",
        providerAccountId: email,
        passwordHash: hashedPassword,
      },
    });

    return createdUser;
  });

  return user;
};

export async function loginService({ email, password }: LoginInput) {
  const authAccount = await prisma.authAccount.findFirst({
    where: {
      provider: AuthProvider.EMAIL,
      providerAccountId: email,
    },
    include: {
      user: true,
    },
  });

  if (!authAccount || !authAccount.passwordHash)
    throw new AppError("Invalid Credentials", 401);

  const isPasswordValid = await bcrypt.compare(
    password,
    authAccount.passwordHash,
  );

  if (!isPasswordValid) throw new AppError("Invalid Credentials", 401);

  const accessToken = generateAccessToken(authAccount.userId);

  const refreshToken = generateRefreshToken();

  const refreshTokenExpiry = new Date();
  refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: authAccount.userId,
      expiresAt: refreshTokenExpiry,
    },
  });

  return {
    accessToken,
    refreshToken,
    user: authAccount.user,
  };
}

export async function refreshAccessTokenService(refreshToken: string) {
  const existingRefreshToken = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },

    include: {
      user: true,
    },
  });

  if (!existingRefreshToken) throw new AppError("Invalid refresh token", 401);

  if (existingRefreshToken.revoked)
    throw new AppError("Refresh token revoked", 401);

  if (existingRefreshToken.expiresAt < new Date())
    throw new AppError("Refresh token expired", 401);

  if (!existingRefreshToken.user.isActive)
    throw new AppError("Account disabled", 403);

  const accessToken = generateAccessToken(existingRefreshToken.userId);

  return { accessToken };
}
