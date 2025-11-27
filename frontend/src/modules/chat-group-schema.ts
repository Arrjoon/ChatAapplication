import { z } from "zod";

export const createGroupChatSchema = z.object({
  name: z
    .string()
    .min(1, "Group name is required")
    .max(100, "Group name is too long")
    .optional(),
  picture: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .nullable(),
  participants: z.array(z.string()),
});

export type CreateGroupChatFormData = z.infer<typeof createGroupChatSchema>;
