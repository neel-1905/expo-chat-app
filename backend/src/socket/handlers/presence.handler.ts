import { io } from "..";
import { SOCKET_EVENTS } from "../../constants/socket.constants";
import { AuthenticatedSocket } from "../../types/socket";
import { onlineUsers } from "../store/online-users";

export function registerPresenceHandlers(socket: AuthenticatedSocket) {
  const userId = socket.user!.userId;

  onlineUsers.set(userId, socket.id);
  io.emit(SOCKET_EVENTS.PRESENCE.ONLINE, { userId });
  console.log(`ONLINE: ${userId}`);

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    io.emit(SOCKET_EVENTS.PRESENCE.OFFLINE, { userId });
    console.log(`OFFLINE: ${userId}`);
  });
}
