import { z } from 'zod';

export const createActivitySchema = z.object({
  activitiy: z.string().nullable().optional(),
  fixedValueLowGreen: z.number().nullable().optional(),
  fixedCurveValueLowGreen: z.number().nullable().optional(),
  fixedValueMidGreen: z.number().nullable().optional(),
  fixedCurveValueMidGreen: z.number().nullable().optional(),
  fixedValueHiGreen: z.number().nullable().optional(),
  fixedCurveValueHiGreen: z.number().nullable().optional(),
  fixedValuePlatiniumGreen: z.number().nullable().optional(),
  fixedCurveValuePlatiniumGreen: z.number().nullable().optional(),
});

export type CreateActivityDto = z.infer<typeof createActivitySchema>;
