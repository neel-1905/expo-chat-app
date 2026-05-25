import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import bcrypt from "bcrypt";

import { RegisterInput } from "./auth.validations";

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
