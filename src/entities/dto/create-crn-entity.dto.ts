import { z } from 'zod';

export const createCrnEntitySchema = z.object({
  entityId: z.number(),
  adaptation: z.boolean().nullable().default(false),
  logoUrl: z.string(),
  commercialRegistrationNumberId: z.number(),
  xlsxFileLocal: z.string().nullable().optional(),
  subscribersXlsxFile: z.string().nullable().optional(),
  residentXlsxFile: z.string().nullable().optional(),
  nationalities: z
    .array(
      z.object({
        name: z.string(),
        count: z.number(),
      }),
    )
    .nullable(),
});

export type CreateCrnEntityDto = z.infer<typeof createCrnEntitySchema>;
