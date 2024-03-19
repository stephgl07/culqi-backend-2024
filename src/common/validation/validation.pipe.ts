import { Injectable, PipeTransform, ArgumentMetadata, Logger } from '@nestjs/common';
import { validate  } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RequestValidationError } from '../domain/exceptions/validation.exception';
import { toValidate, validateRequiredFields } from './validation.util';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private readonly logger = new Logger(ValidationPipe.name);
  async transform(value: any, metadata: ArgumentMetadata) {

    this.logger.log("Validating Request");
    const metatype = metadata.metatype;
    if (!metatype || !toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object, { stopAtFirstError: true });

    const filteredErrors = validateRequiredFields(errors);

    if (filteredErrors.length > 0) {
      const typeProps = metadata.type === 'param' ? `${metadata.type}(s)` : metadata.type
      throw new RequestValidationError(`Some validation errors where found on the ${typeProps}`, filteredErrors);
    }

    return value;
  }


}
