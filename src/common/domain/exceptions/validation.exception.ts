import { ValidationError } from 'class-validator';
import { HttpStatus } from '@nestjs/common';
import { ApiResValidationError, ApiResValidationErrorConstraint, ApiResValidationErrorField } from 'src/common/handlers/http/response-global.dto';

export class RequestValidationError extends Error {
  private responseObj: ApiResValidationError;
  private httpStatusCode: number;

  constructor(msg: string, validErrors: ValidationError[], httpStatus?: number) {
    super(msg);
    Object.setPrototypeOf(this, RequestValidationError.prototype);
    this.httpStatusCode = httpStatus ?? HttpStatus.BAD_REQUEST;

    const errors: ApiResValidationErrorField[] = validErrors.map((error) => {
      const constraints: ApiResValidationErrorConstraint[] = Object.entries(error.constraints).map(([name, description]) => {
        return { name, description };
      });
      return {
        property: error.property,
        constraints,
      };
    });
    
    this.responseObj = {
      statusCode: this.httpStatusCode,
      error: 'ValidationErrors',
      details: msg,
      errors
    };
  }

  getStatus(): number {
    return this.httpStatusCode;
  }

  getResponse(): ApiResValidationError {
    return this.responseObj;
  }
}
