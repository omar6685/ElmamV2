import { z } from 'zod';
import validator from 'validator';

// Utility function to check if "to" is either a valid email or a comma-separated list of valid emails
const emailListValidator = z.string().refine(
  (value) => {
    const emails = value.split(',');
    return emails.every((email) => validator.isEmail(email.trim()));
  },
  {
    message:
      'Invalid email format. Should be a valid email or comma-separated emails.',
  },
);

// Zod schema for send email with template request
export const sendEmailFromTemplateSchema = z.object({
  to: emailListValidator,
  templateName: z.string().min(1, 'Template name is required.'),
  variables: z.record(z.any()), // Expect a record of key-value pairs for template variables
});

export type SendEmailFromTemplateDto = z.infer<
  typeof sendEmailFromTemplateSchema
>;
