import { SOCKET_EVENTS } from "../../constants/socket.constants";
import prisma from "../../lib/prisma";
import { io } from "../../socket";
import { AppError } from "../../utils/AppError";
import { SendMessageInput } from "./message.validations";

export async function sendMessageService(
  currentUserId: string,
  data: SendMessageInput,
) {
  const { conversationId, content } = data;

  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },

    include: {
      participants: true,
    },
  });

  if (!conversation) throw new AppError("Conversation not found", 404);

  // Check user belongs to conversation
  const isParticipant = conversation.participants.some(
    (participant) => participant.userId === currentUserId,
  );

  if (!isParticipant)
    throw new AppError("You are not a participant of this conversation", 403);

  const message = await prisma.$transaction(async (tx) => {
    const createdMessage = await prisma.message.create({
      data: {
        content,
        conversationId,
        senderId: currentUserId,
      },

      include: {
        sender: true,
      },
    });

    await tx.conversation.update({
      where: {
        id: conversationId,
      },

      data: {
        updatedAt: new Date(),
      },
    });

    return createdMessage;
  });

  io.to(conversationId).emit(SOCKET_EVENTS.MESSAGE.RECEIVE, message);

  return message;
}

export async function getConversationMessages(
  currentUserId: string,
  conversationId: string,
  cursor?: string,
) {
  const participant = await prisma.conversationParticipant.findFirst({
    where: {
      conversationId,
      userId: currentUserId,
    },
  });

  if (!participant) {
    throw new AppError("Unauthorized", 403);
  }

  // Fetch messages
  const messages = await prisma.message.findMany({
    where: {
      conversationId,
    },

    include: {
      sender: {
        select: {
          id: true,
          name: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 20,

    ...(cursor && {
      cursor: {
        id: cursor,
      },

      skip: 1,
    }),
  });

  return messages.reverse();
}
