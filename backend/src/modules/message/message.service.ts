import prisma from "../../lib/prisma";
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

  const message = await prisma.message.create({
    data: {
      content,
      conversationId,
      senderId: currentUserId,
    },

    include: {
      sender: true,
    },
  });

  return message;
}
