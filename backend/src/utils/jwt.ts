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
