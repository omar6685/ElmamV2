import { z } from 'zod';
import { createCrnEntitySchema } from './create-crn-entity.dto';

export const updateCrnEntitySchema = createCrnEntitySchema.partial();

export type UpdateCrnEntityDto = z.infer<typeof updateCrnEntitySchema>;
