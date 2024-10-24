import { z } from 'zod';
import validator from 'validator';

export const scheduleRecurringEmailDto = z.object({
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
  interval: z.enum(['1m', '1d', '7d', '2w', '3w'], {
    errorMap: () => ({
      message: 'Invalid interval, valid values are: 1d, 7d, 2w, 3w',
    }),
  }), // Restricts interval to specified values
});

export type ScheduleRecurringEmailDto = z.infer<
  typeof scheduleRecurringEmailDto
>;
