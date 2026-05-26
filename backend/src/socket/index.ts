import { Server as HttpServer } from "http";

import { Server } from "socket.io";

import { registerConversationHandlers } from "./handlers/conversation.handler";
import { socketAuthMiddleware } from "../middleware/socket-auth.middleware";
import { AuthenticatedSocket } from "../types/socket";
import { onlineUsers } from "./store/online-users";
import { registerPresenceHandlers } from "./handlers/presence.handler";

export let io: Server;

export function initializeSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use(socketAuthMiddleware);

  io.on("connection", (socket: AuthenticatedSocket) => {
    const userId = socket.user!.userId;
    console.log(`User connected: ${userId}`);

    // Store online user
    onlineUsers.set(userId, socket.id);

    registerConversationHandlers(socket);

    registerPresenceHandlers(socket);
  });
}
