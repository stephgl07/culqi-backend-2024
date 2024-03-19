import {  } from "class-transformer";
export class ApiResponse<T> {
  statusCode: number;
  data: T;
}

export class ApiResError {
  statusCode: number;
  error: string;
  details: string;
}

export class ApiResValidationError {
  statusCode: number;
  error: string;
  details: string;
  errors?: ApiResValidationErrorField[];
}

export class ApiResValidationErrorField {
  property: string;
  constraints: ApiResValidationErrorConstraint[]
}

export class ApiResValidationErrorConstraint {
  name: string;
  description: string;
}