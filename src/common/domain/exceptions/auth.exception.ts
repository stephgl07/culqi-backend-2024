import { HttpStatus } from "@nestjs/common";
import { ApiResError } from "../../handlers/http/response-global.dto";

export class AuthError extends Error {
    private responseObj: ApiResError;
    private httpStatusCode: number;
  
    constructor(msg: string, httpStatus?: number) {
      super(msg);
      Object.setPrototypeOf(this, AuthError.prototype);
      this.httpStatusCode = HttpStatus.UNAUTHORIZED;
      this.responseObj = {
        statusCode: HttpStatus.UNAUTHORIZED,
        error: 'Authorization Error',
        details: msg
      };
    }
  
    getStatus(): number {
      return this.httpStatusCode;
    }
  
    getResponse(): ApiResError {
      return this.responseObj;
    }
  }