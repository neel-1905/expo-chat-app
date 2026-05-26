import { io } from "..";
import { SOCKET_EVENTS } from "../../constants/socket.constants";
import { AuthenticatedSocket } from "../../types/socket";

export function registerTypingHandlers(socket: AuthenticatedSocket) {
  socket.on(SOCKET_EVENTS.TYPING.START, ({ conversationId }) => {
    io.to(conversationId).emit(SOCKET_EVENTS.TYPING.USER_TYPING, {
      conversationId,
      userId: socket.user!.userId,
    });
  });

  socket.on(SOCKET_EVENTS.TYPING.STOP, ({ conversationId }) => {
    io.to(conversationId).emit(SOCKET_EVENTS.TYPING.USER_TYPING_STOP, {
      conversationId,
      userId: socket.user!.userId,
    });
  });
}
