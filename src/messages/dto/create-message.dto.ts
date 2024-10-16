import { z } from 'zod';

// Define Zod schema for CreateMessageDto
export const createMessageSchema = z
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

export type CreateMessageDto = z.infer<typeof createMessageSchema>;
