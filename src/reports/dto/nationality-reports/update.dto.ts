import { z } from 'zod';

export const updateNationalityReportSchema = z.object({
  nationalities: z.array(
    z.object({
      name: z.string().min(1, 'Nationality name is required.'),
      count: z
        .number()
        .positive('Nationality count must be a positive number.')
        .min(0, 'Nationality count is required.'),
    }),
  ),
});

export type UpdateNationalityReportDto = z.infer<
  typeof updateNationalityReportSchema
>;
