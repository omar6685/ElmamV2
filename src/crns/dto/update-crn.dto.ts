import { updateCommercialRegistrationSchema } from './create-crn.dto';
import { z } from 'zod';

export type UpdateCommercialRegistrationDto = z.infer<
  typeof updateCommercialRegistrationSchema
>;
