import { HttpStatus } from "@nestjs/common";
import { ApiResError } from "../../handlers/http/response-global.dto";

export class BusinessError extends Error {
    private responseObj: ApiResError;
    private httpStatusCode: number;
  
    constructor(msg: string, httpStatus?: number) {
      super(msg);
      Object.setPrototypeOf(this, BusinessError.prototype);
      this.httpStatusCode = httpStatus ?? HttpStatus.BAD_REQUEST;
      this.responseObj = {
        statusCode: this.httpStatusCode,
        error: 'Business Error',
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