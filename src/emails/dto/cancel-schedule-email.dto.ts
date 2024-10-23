import { z } from 'zod';

export const cancelScheduledEmailDto = z.object({
  jobName: z.string().min(1, { message: 'Job name cannot be empty' }),
});

export type CancelScheduledEmailDto = z.infer<typeof cancelScheduledEmailDto>;
