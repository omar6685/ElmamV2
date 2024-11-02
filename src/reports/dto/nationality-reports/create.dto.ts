import { z } from 'zod';

export const createNationalityReportSchema = z
  .object({
    crnId: z.number().positive(),
    userId: z.number().positive(),
    nationalities: z.array(
      z.object({
        name: z.string().min(1, 'Nationality name is required.'),
        count: z
          .number()
          .positive('Nationality count must be a positive number.')
          .min(0, 'Nationality count is required.'),
      }),
    ),
  })
  .required();

export type CreateNationalityReportDto = z.infer<
  typeof createNationalityReportSchema
>;
