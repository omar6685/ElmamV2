import { z } from 'zod';
import { createActivitySchema } from './create-activity.dto';

export const updateActivitySchema = createActivitySchema.partial();

export type UpdateActivityDto = z.infer<typeof updateActivitySchema>;
