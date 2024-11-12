import { z } from 'zod';

export const createNationalityReportSchema = z
  .object({
    entityId: z.number().positive(),
    userId: z.number().positive(),
  })
  .required();

export type CreateNationalityReportDto = z.infer<
  typeof createNationalityReportSchema
>;
