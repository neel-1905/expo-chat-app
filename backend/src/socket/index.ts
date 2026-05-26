import { Server as HttpServer } from "http";

import { Server } from "socket.io";

import { registerConversationHandlers } from "./handlers/conversation.handler";
import { socketAuthMiddleware } from "../middleware/socket-auth.middleware";
import { AuthenticatedSocket } from "../types/socket";

export let io: Server;

export function initializeSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use(socketAuthMiddleware);

  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log(`User connected: ${socket.user?.userId}`);

    registerConversationHandlers(socket);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user?.userId}`);
    });
  });
}
