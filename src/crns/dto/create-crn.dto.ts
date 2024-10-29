import { z } from 'zod';

// Schema for adding a new CommercialRegistrationNumbers entity
export const createCommercialRegistrationSchema = z.object({
  crNumber: z.string().nullable().optional(),
  userId: z.string(), // Required because it's a foreign key
});

export const commercialRegistrationSchema = z.object({
  crName: z.string().nullable().optional(),
  crType: z.string().nullable().optional(),
  crExpiryDate: z.string().nullable().optional(), // Assuming dates are in string format
  crMainNumber: z.string().nullable().optional(),
  subscriptionStatus: z.string().nullable().default('incomplete'),
  currentPeriodEnd: z.date().nullable().optional(),
  userId: z.string(), // Required because it's a foreign key
  crNumber: z.string().nullable().optional(),
  crIssueDate: z.string().nullable().optional(), // Assuming date string format
  trueCrNumber: z.number().nullable().optional(),
  crEntityNumber: z.number().nullable().optional(),
  crMainEntityNumber: z.number().nullable().optional(),
  businessType: z.string().nullable().optional(),
  crStatus: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  activities: z.string().nullable().optional(),
});

// Schema for updating an existing CommercialRegistrationNumbers entity
export const updateCommercialRegistrationSchema =
  commercialRegistrationSchema.partial();

export type CreateCommercialRegistrationDto = z.infer<
  typeof createCommercialRegistrationSchema
>;
