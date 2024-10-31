import { z } from 'zod';
import { createEntitySchema } from './create-entity.dto';

export const updateEntitySchema = createEntitySchema.partial();

export type UpdateEntityDto = z.infer<typeof updateEntitySchema>;
