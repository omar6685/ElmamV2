import { z } from 'zod';
import validator from 'validator';

// Utility function to check if "to" is either a valid email or a comma-separated list of valid emails
const emailListValidator = z.string().refine((value) => {
  const emails = value.split(',');
  return emails.every(email => validator.isEmail(email.trim()));
}, {
  message: "Invalid email format. Should be a valid email or comma-separated emails.",
});

// Zod schema for send email request
export const sendEmailSchema = z.object({
  to: emailListValidator,
  subject: z.string().min(1, 'Subject is required.'),
  content: z.string().min(1, 'Content is required.'),
});

// Types for the DTOs
export type SendEmailDto = z.infer<typeof sendEmailSchema>;
