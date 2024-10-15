import { z } from 'zod';

// Define Zod schema for UpdateNotificationDto
export const updateNotificationSchema = z
  .object({
    user_id: z
      .number({
        required_error: 'User ID is required',
      })
      .int()
      .positive(),

    message_id: z
      .number({
        required_error: 'Message ID is required',
      })
      .int()
      .positive(),

    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(1, { message: 'Title cannot be empty' }),

    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(1, { message: 'Content cannot be empty' }),

    seen: z.boolean().optional().default(false), // Optional and defaults to false

    archive_record_id: z.number().nullable().optional(), // Nullable and optional field
  })
  .required();

export type UpdateNotificationDto = z.infer<typeof updateNotificationSchema>;