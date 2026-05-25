import { Server as HttpServer } from "http";

import { Server } from "socket.io";

// import { registerConversationHandlers } from "./handlers/conversation.handler";

export let io: Server;

export function initializeSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // registerConversationHandlers(socket);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
