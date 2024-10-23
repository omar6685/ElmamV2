import { z } from 'zod';
import validator from 'validator';

export const scheduleEmailDto = z.object({
  to: z.string().refine(
    (value) => {
      const emails = value.split(',');
      return emails.every((email) => validator.isEmail(email.trim()));
    },
    {
      message:
        'Invalid email format. Should be a valid email or comma-separated emails.',
    },
  ),
  subject: z.string().min(1, { message: 'Subject cannot be empty' }),
  content: z.string().min(1, { message: 'Content cannot be empty' }),
  sendDate: z.string().refine(
    (dateStr) => {
      const sendDate = new Date(dateStr);
      const now = new Date();
      return sendDate > now;
    },
    { message: 'Send date must be in the future' },
  ),
});

export type ScheduleEmailDto = z.infer<typeof scheduleEmailDto>;
