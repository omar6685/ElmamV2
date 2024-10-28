import { z } from 'zod';

// Define Zod schema for CreateProductDto
export const createProductSchema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1, { message: 'Name cannot be empty' }),

    description: z
      .string({
        required_error: 'Description is required',
      })
      .min(1, { message: 'Description cannot be empty' }),
    price: z.number().positive(), // Price must be a positive number
  })
  .required();

export type CreateProductDto = z.infer<typeof createProductSchema>;
