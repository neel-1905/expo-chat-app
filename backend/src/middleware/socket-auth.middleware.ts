import jwt from "jsonwebtoken";
import { AuthenticatedSocket } from "../types/socket";
import { ExtendedError } from "socket.io";

export function socketAuthMiddleware(
  socket: AuthenticatedSocket,
  next: (err?: ExtendedError) => void,
) {
  try {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error("Unauthorized"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    socket.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    next(new Error("Unauthorized"));
  }
}
