import { z } from 'zod';
import validator from 'validator';

// Define Zod schema for SignInDto
export const signInSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    fcmToken: z.string().optional(), // Optional field for FCM token
  })
  .required();

export type SignInDto = z.infer<typeof signInSchema>;

// Define Zod schema for SignUpDto
export const signUpSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string().min(10).refine(validator.isMobilePhone),
    email: z.string().email(),
    password: z.string().min(6),
    fcmToken: z.string().optional(), // Optional field for FCM token
  })
  .required();

export type SignUpDto = z.infer<typeof signUpSchema>;
