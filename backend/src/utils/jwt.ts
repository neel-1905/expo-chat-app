import jwt from "jsonwebtoken";
import envConfig from "../config/env.config";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, envConfig.JWT_SECRET, {
    expiresIn: "15m",
  });
};

export function generateRefreshToken() {
  return crypto.randomUUID();
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, envConfig.JWT_SECRET) as { userId: string };
}
