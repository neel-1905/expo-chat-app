export const SOCKET_EVENTS = {
  CONVERSATION: {
    JOIN: "join_conversation",
    LEAVE: "leave_conversation",
  },

  MESSAGE: {
    RECEIVE: "receive_message",
  },

  PRESENCE: {
    ONLINE: "user_online",
    OFFLINE: "user_offline",
  },

  TYPING: {
    START: "typing_start",
    USER_TYPING: "user_typing",
    STOP: "typing_stop",
    USER_TYPING_STOP: "user_stopped_typing",
  },

  READ_RECEIPT: {
    MARK_AS_READ: "mark_as_read",
    SEEN: "message_seen",
  },
};
