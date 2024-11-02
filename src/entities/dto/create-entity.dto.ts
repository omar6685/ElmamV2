import { z } from 'zod';

export const createEntitySchema = z.object({
  adaptation: z.boolean().nullable().optional(),
  ajier: z.number().int().nullable().optional(),
  saudiPlayer: z.number().int().nullable().optional(),
  saudiJailed: z.number().int().nullable().optional(),
  saudiDisable: z.number().int().nullable().optional(),
  saudiOnline: z.number().int().nullable().optional(),
  saudiStudent: z.number().int().nullable().optional(),
  foreignerLikeSaudi: z.number().int().nullable().optional(),
  foreignerLikeForeigner: z.number().int().nullable().optional(),
  saudiLoanPlayer: z.number().int().nullable().optional(),
  gulfCitizen: z.number().int().nullable().optional(),
  tribeSaudi: z.number().int().nullable().optional(),
  specialyForeigner: z.number().int().nullable().optional(),
  owner: z.number().int().nullable().optional(),
  realForeigner: z.number().nullable().optional(),
  realSaudi: z.number().nullable().optional(),
  commercialRegistrationNumberId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  userId: z.number(),
  activityTableId: z.string(),
});

export type CreateEntityDto = z.infer<typeof createEntitySchema>;
