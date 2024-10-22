import { z } from 'zod';

export const getTemplateByNameSchema = z.object({
  name: z.string().min(1, 'Template name is required.'),
});

export type GetTemplateByNameDto = z.infer<typeof getTemplateByNameSchema>;
