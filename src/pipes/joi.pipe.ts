import { BadRequestException, PipeTransform } from '@nestjs/common';
import { AnySchema } from 'joi';

export class JoiPipe implements PipeTransform {
  constructor(
    private readonly schema: AnySchema
  ) { }

  transform(input: unknown) {
    const { value, error } = this.schema.validate(input, {
      abortEarly: true,
      stripUnknown: true,
      presence: 'required',
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return value;
  }
}

export const Validator = (schema: AnySchema) => new JoiPipe(schema);

