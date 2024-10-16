import { z } from 'zod';

// Define Zod schema for UpdateMessageDto
export const updateMessageSchema = z
  .object({
    user_id: z
      .number({
        required_error: 'User ID is required',
      })
      .int()
      .positive(),

    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1, { message: 'Title cannot be empty' }),

    seen: z.boolean().optional().default(false), // Optional, defaults to false
  })
  .required();

export type UpdateMessageDto = z.infer<typeof updateMessageSchema>;
