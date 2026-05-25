import prisma from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { CreateConversationInput } from "./conversation.validations";

export async function createConversationService(
  currentUserId: string,
  data: CreateConversationInput,
) {
  const { isGroup = false, name, participantIds } = data;

  // Prevent creating a conversation with oneself
  const uniqueParticipantIds = [...new Set([currentUserId, ...participantIds])];

  //   Private chats
  if (!isGroup) {
    if (uniqueParticipantIds.length !== 2)
      throw new AppError(
        "Private conversation must contain exactly 2 users",
        400,
      );
  }

  //   Group chats
  if (isGroup && uniqueParticipantIds.length < 2) {
    throw new AppError("Group must have at least 2 participants", 400);
  }

  //   check existing private conversations
  if (!isGroup) {
    const existingConversations = await prisma.conversation.findMany({
      where: {
        isGroup: false,

        participants: {
          some: {
            userId: currentUserId,
          },
        },
      },

      include: {
        participants: true,
      },
    });

    const matchedConversation = existingConversations.find((conversation) => {
      const participantIds = conversation.participants.map((p) => p.userId);

      return (
        participantIds.length === 2 &&
        uniqueParticipantIds.every((id) => participantIds.includes(id))
      );
    });

    if (matchedConversation) {
      return matchedConversation;
    }
  }

  const conversation = await prisma.conversation.create({
    data: {
      isGroup,
      name,

      participants: {
        create: uniqueParticipantIds.map((userId) => ({
          userId,
        })),
      },
    },

    include: {
      participants: {
        include: {
          user: true,
        },
      },
    },
  });

  return conversation;
}
