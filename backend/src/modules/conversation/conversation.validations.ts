import { z } from "zod";

export const createConversationSchema = z.object({
  isGroup: z.boolean("isGroup must be a boolean").optional(),

  name: z.string("name must be a string").optional(),

  participantIds: z
    .array(z.string("participantIds must be an array of strings"))
    .min(1, "participantIds must contain at least one ID"),
});

export type CreateConversationInput = z.infer<typeof createConversationSchema>;
