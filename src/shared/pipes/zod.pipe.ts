import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      // Parse the incoming value with the provided schema
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        // Extract and format the validation errors
        const formattedErrors = error.errors.map((err) => ({
          path: err.path.join(' > '), // The path to the invalid field
          message: err.message, // The error message
        }));

        // Throw a more detailed BadRequestException with the formatted errors
        throw new BadRequestException({
          message: 'Validation failed',
          errors: formattedErrors,
        });
      }

      // If the error is not a ZodError, throw a generic BadRequestException
      throw new BadRequestException('Validation failed');
    }
  }
}
