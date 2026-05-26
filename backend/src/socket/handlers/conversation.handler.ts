import { Socket } from "socket.io";
import { SOCKET_EVENTS } from "../../constants/socket.constants";

export function registerConversationHandlers(socket: Socket) {
  socket.on(SOCKET_EVENTS.CONVERSATION.JOIN, (conversationId: string) => {
    socket.join(conversationId);

    console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
  });

  socket.on(SOCKET_EVENTS.CONVERSATION.LEAVE, (conversationId: string) => {
    socket.leave(conversationId);
    console.log(`Socket ${socket.id} left conversation ${conversationId}`);
  });
}
