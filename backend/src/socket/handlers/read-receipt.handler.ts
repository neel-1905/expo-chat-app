import { AuthenticatedSocket } from "../../types/socket";
import { io } from "..";
import { SOCKET_EVENTS } from "../../constants/socket.constants";
import { markConversationAsRead } from "../../modules/conversation/conversation.service";

export function registerReadReceiptHandlers(socket: AuthenticatedSocket) {
  socket.on(
    SOCKET_EVENTS.READ_RECEIPT.MARK_AS_READ,
    async (conversationId: string) => {
      try {
        const userId = socket.user!.userId;

        await markConversationAsRead(userId, conversationId);

        io.to(conversationId).emit(SOCKET_EVENTS.READ_RECEIPT.SEEN, {
          userId,
          conversationId,
          seenAt: new Date(),
        });
      } catch (error) {
        console.error("Error marking conversation as read:", error);
      }
    },
  );
}
